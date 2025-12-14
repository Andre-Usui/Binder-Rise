import { createContext, useState, useEffect } from 'react';
import { openDB } from 'idb';
import { saveAs } from 'file-saver';

const DbContext = createContext();

let db

const initDB = async () => {

  try {
    db = await openDB('binderDB3', 3, {
      upgrade: async (db, oldVersion, newVersion, transaction) => {
        if (!db.objectStoreNames.contains('disciplines')) {
          const disciplineStore = await db.createObjectStore('disciplines', { keyPath: 'discipline_id', autoIncrement: true });
          disciplineStore.createIndex("discipline_id", "discipline_id", { unique: true });
          disciplineStore.createIndex("position", "position", { unique: false });
          await disciplineStore.done;
        }

        if (!db.objectStoreNames.contains('posts')) {
          const postStore = await db.createObjectStore('posts', { keyPath: 'post_id', autoIncrement: true });
          postStore.createIndex("post_dis_id", "discipline_id", { unique: false });
          postStore.createIndex("post_dis_page", ["discipline_id", "page"], { unique: false });
          postStore.createIndex("post_page_position", ["discipline_id", "page", "position"], { unique: false });
          postStore.createIndex("post_position", "position", { unique: false });
          postStore.createIndex("post_id", "post_id", { unique: true });
          await postStore.done;
        }


        if (!db.objectStoreNames.contains('folders')) {
          const foldersStore = db.createObjectStore('folders', { keyPath: 'folder_id', autoIncrement: true });
          foldersStore.createIndex('folder_id', 'folder_id', { unique: true });
          foldersStore.createIndex('inside_position', 'inside_position', { unique: false });
          foldersStore.createIndex('position', 'position', { unique: false });
          await foldersStore.done;
        }

        if (!db.objectStoreNames.contains('settings')) {
          const store = db.createObjectStore('settings', { keyPath: 'settings_id', autoIncrement: true });
          store.createIndex('settings_id', 'settings_id', { unique: true });
          store.createIndex('style', 'style', { unique: false });
          await store.done;
          const firstSettings = { settings_id: 1, style: 1 };
          await store.add(firstSettings);

        }

        if (db.objectStoreNames.contains('disciplines')) {
          console.log('ok');
          const storeDis = transaction.objectStore('disciplines');
          storeDis.createIndex('folder_dis_id', 'folder_id', { unique: false });
          storeDis.createIndex('page_position', 'page_position', { unique: false });

          await storeDis.done;

        }
      }
    });

    return db;
  } catch (error) {
    console.error('Failed to open database:', error);
    return null;
  }
};


const getPagePosts = async (discipline_id) => {
  if (!db) {
    db = await initDB();
    await db.done;
  }
  const transaction = db.transaction('posts', 'readonly');
  const store = transaction.objectStore('posts');
  const index = store.index('post_dis_id');
  const posts = await index.getAll(discipline_id);
  await posts.done;
  await transaction.done;
  return posts;
};

const getTabPosition = async (setting) => {

  if (!db) {

    db = await initDB();
    await db.done;
  }
  const transaction = db.transaction('settings', 'readonly');
  const store = transaction.objectStore('settings');
  const settings = await store.get(setting);
  const position = settings.positions;
  await transaction.done;

  return position;
};

const getAllDisciplines = async () => {

  if (!db) {

    db = await initDB();
    await db.done;
  }
  const transaction = db.transaction('disciplines', 'readonly');
  const store = transaction.objectStore('disciplines');
  const disciplines = await store.getAll();
  await transaction.done;

  return disciplines;
};

const getAllFolders = async () => {

  if (!db) {

    db = await initDB();
    await db.done;
  }
  const transaction = db.transaction('folders', 'readonly');
  const store = transaction.objectStore('folders');
  const folders = await store.getAll();
  await transaction.done;

  return folders;
};

const getDiscipline = async (discipline_id) => {
  if (!db) {
    db = await initDB();
    await db.done;
  }
  const transaction = db.transaction('disciplines', 'readonly');
  const store = transaction.objectStore('disciplines');
  const index = store.index("discipline_id");
  const discipline = await index.get(discipline_id);
  await transaction.done;
  return discipline;

}

const addDiscipline = async (discipline) => {
  if (!db) {

    db = await initDB();
  }
  const transaction = db.transaction('disciplines', 'readwrite');
  const store = transaction.objectStore('disciplines');
  const allDisciplines = await store.getAll();
  const lastPosition = allDisciplines.length ? Math.max(...allDisciplines.map(dis => dis.position)) : 1;
  const lastId = allDisciplines.length ? Math.max(...allDisciplines.map(dis => dis.discipline_id)) : 1;
  const finalDiscipline = { ...discipline, discipline_id: lastId + 1, position: lastPosition + 1 };
  await store.add(finalDiscipline);

  await transaction.done;

}

const editDiscipline = async (discipline) => {
  if (!db) {
    db = await initDB();
  }
  const transaction = db.transaction('disciplines', 'readwrite');
  const store = transaction.objectStore('disciplines');

  await store.put(discipline);
  await transaction.done;
}

// TODO: Upgrade to settings
const editDisciplinesPosition = async (discipline) => {
  if (!db) {
    db = await initDB();
  }
  const disciplinesArray = await discipline.map(discipline => discipline);
  const transaction = db.transaction('disciplines', 'readwrite');
  const store = transaction.objectStore('disciplines');
  for await (const dis of disciplinesArray) {
    await store.put(dis);
  }
  await transaction.done;
};

const deletePage = async (discipline, num) => {

  if (!db) {
    db = await initDB();
  }
  const post_transaction = db.transaction('posts', 'readwrite');
  const post_store = post_transaction.objectStore('posts');
  const post_index = post_store.index('post_dis_id');
  const post_list = await post_index.getAll(discipline.discipline_id);
  const post_list_deleted = post_list.filter(p => p.page === num);

  for await (const post of post_list_deleted) {
    await post_store.delete(post.post_id);
  }

  for await (const post of post_list) {
    if (post.page <= num) continue;
    const final_post = { ...post, page: post.page - 1 };
    await post_store.put(final_post);
  }

  const dis_transaction = db.transaction('disciplines', 'readwrite');
  const dis_store = dis_transaction.objectStore('disciplines');
  const dis_index = dis_store.index('discipline_id');
  const dis = await dis_index.get(discipline.discipline_id);

  const dis_pages = dis.pages
    .filter(p => p.num !== num)
    .map(p => p.num > num ? { ...p, num: p.num - 1 } : p);
  const final_dis = { ...dis, pages: dis_pages };
  await dis_store.put(final_dis);
  await dis_transaction.done;
  await post_transaction.done;

}

const deleteDiscipline = async (discipline_id) => {
  if (!db) {

    db = await initDB();
  } const transaction = db.transaction(['disciplines', 'posts'], 'readwrite');
  const dis_store = transaction.objectStore('disciplines');
  const pos_store = transaction.objectStore('posts');
  const index = pos_store.index("post_dis_id");
  const postsRequest = await index.getAll((discipline_id));
  postsRequest.forEach((async post => {
    await pos_store.delete(post.post_id);
    await pos_store.done;
  }))
  await dis_store.delete(discipline_id)
  await transaction.done;
}

const addFolder = async (folder) => {
  if (!db) {

    db = await initDB();
  }
  const transactionFolders = db.transaction('folders', 'readwrite');
  const storeFolders = transactionFolders.objectStore('folders');
  const allFolders = await storeFolders.getAll();
  const lastPosition = allFolders.length ? Math.max(...allFolders.map(folder => folder.position)) : 1;
  const lastId = allFolders.length ? Math.max(...allFolders.map(folder => folder.folder_id)) : 1;
  const finalFolder = { ...folder, folder_id: lastId + 1, position: lastPosition + 1 };
  await storeFolders.add(finalFolder);
  await transactionFolders.done;

}

const editFolder = async (folder) => {
  if (!db) {
    db = await initDB();
  }
  const transaction = db.transaction('folders', 'readwrite');
  const store = transaction.objectStore('folders');

  await store.put(folder);
  await transaction.done;
}

const editFolderPosition = async (folder) => {
  if (!db) {
    db = await initDB();
  }
  const foldersArray = await folder.map(folder => folder);
  const transaction = db.transaction('folders', 'readwrite');
  const store = transaction.objectStore('folders');
  for await (const dis of foldersArray) {
    await store.put(dis);
  }
  await transaction.done;
};

const deleteFolder = async (folder_id) => {
  if (!db) {

    db = await initDB();
  } const transaction = db.transaction('folders', 'readwrite');
  const folder_store = transaction.objectStore('folders');
  const dis_store = transaction.objectStore('disciplines');
  const index = dis_store.index("folder_dis_id");
  const disRequest = await index.getAll((folder_id));
  disRequest.forEach((async dis => {
    const newDis = { ...dis, position: 0, folder_dis_id: null };
    await dis_store.put(newDis);
    await dis_store.done;
  }))
  await folder_store.delete(folder_id)
  await transaction.done;
}

const addPost = async (post) => {
  db = await initDB();

  const transaction = db.transaction('posts', 'readwrite');
  const store = transaction.objectStore('posts');
  const index = store.index("post_dis_page");
  try {
    const postPositions = await index.getAll([post.discipline_id, post.page]);
    const actualPosition = postPositions.length ? Math.max(...postPositions.map(post => post.page)) : 0;
    const correctPost = { ...post, position: actualPosition + 1 }
    await store.add(correctPost);
    await transaction.done;
  } catch (error) {
    console.error('Error adding post:', error);
  } finally {
    transaction.done;
  }
}

const editPost = async (post) => {
  if (!db) {
    db = await initDB();
  }
  const transaction = db.transaction('posts', 'readwrite');
  const store = transaction.objectStore('posts');
  await store.put(post);
  await transaction.done;
};

const editPostPosition = async (post) => {
  if (!db) {
    db = await initDB();
  }
  const postsArray = await post.map(post => post);
  const transaction = db.transaction('posts', 'readwrite');
  const store = transaction.objectStore('posts');
  postsArray.forEach(async post => {
    await store.put(post);
    await transaction.done;
  })
};

const deletePost = async (post_id) => {
  if (!db) {
    db = await initDB();
  }
  const transaction = db.transaction('posts', 'readwrite');
  const store = transaction.objectStore('posts');
  await store.delete(post_id);
  await transaction.done;
};

const downloadJSON = async () => {
  if (!db) {

    db = await initDB();
  }
  const transactionPost = db.transaction('posts', 'readwrite');
  const storePost = transactionPost.objectStore('posts');
  const dataPost = await storePost.getAll();
  const transactionDis = db.transaction('disciplines', 'readwrite');
  const storeDis = transactionDis.objectStore('disciplines');
  const dataDis = await storeDis.getAll();
  const data = { version: 3, posts: dataPost, disciplines: dataDis };
  const jsonBlob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  saveAs(jsonBlob, 'binder.json');
}

const uploadJSON = async (data) => {
  if (!db) {
    db = await initDB();
  }

  if (!data.version && data.version !== 3) {
    data.disciplines.sort((a, b) => a.position - b.position);
    const oldPositions = [];

    for (let i = 0; i <= data.disciplines.length; i++) {
      oldPositions.push(data.disciplines[i].discipline_id);
    }

    const firstSettings = { settings_id: 1, positions: oldPositions, last_position: data.disciplines.length, style: 1 };
    console.log('upload - firstSettings: ', firstSettings);

    const storeSettings = db.transaction('settings', 'readwrite').objectStore('settings');
    await storeSettings.put(firstSettings);
  }

  const dataDis = data.disciplines;
  const dataPost = data.posts;
  const transactionPost = db.transaction('posts', 'readwrite');
  const storePost = transactionPost.objectStore('posts');
  await storePost.clear();
  dataPost.forEach(async (item) => {
    await storePost.put(item);
    await transactionPost.done;
  })

  const transactionDis = db.transaction('disciplines', 'readwrite');
  const storeDis = transactionDis.objectStore('disciplines');
  await storeDis.clear();
  dataDis.forEach(async (item) => {
    await storeDis.put(item);
    await transactionDis.done;
  })
}

const DbProvider = ({ children }) => {
  const [db, setDb] = useState(null);

  useEffect(() => {
    const initializeDB = async () => {
      if (!db) {
        const database = await initDB();
        setDb(database);
      }
    };
    initializeDB();


  }, [db]);

  return (
    <DbContext.Provider value={{
      db,
      initDB,
      getPagePosts,
      getTabPosition,
      getAllDisciplines,
      getDiscipline,
      addDiscipline,
      editDiscipline,
      editDisciplinesPosition,
      deletePage,
      deleteDiscipline,
      getAllFolders,
      addFolder,
      editFolder,
      editFolderPosition,
      deleteFolder,
      addPost,
      editPost,
      editPostPosition,
      deletePost,
      downloadJSON,
      uploadJSON
    }}>
      {children}
    </DbContext.Provider>
  );
};

export { DbContext, DbProvider };