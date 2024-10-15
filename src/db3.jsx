import { createContext, useState, useEffect } from 'react';
import { openDB } from 'idb';
import { saveAs } from 'file-saver';

const DbContext = createContext();

let db

const initDB = async () => {


  try {
    db = await openDB('binderDB3', 2, {
      upgrade: async (db) => {
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

  const allPosts = await store.getAll(); 
  await allPosts.done;
  const posts = await index.getAll(discipline_id); 
  await posts.done;
  await transaction.done;
  return posts;
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
  } const transaction = db.transaction('disciplines', 'readwrite');
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
  const data = {posts: dataPost, disciplines: dataDis };
  const jsonBlob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  saveAs(jsonBlob, 'binder.json');
}

const uploadJSON = async (data) => {
  if (!db) {

    db = await initDB();
  }
  const dataDis = data.disciplines;
  const dataPost = data.posts;
  const transactionPost = db.transaction('posts', 'readwrite');
  const storePost = transactionPost.objectStore('posts');
  await storePost.clear();
  dataPost.forEach( async (item) => {
    await storePost.put(item);
    await transactionPost.done;
  })

  const transactionDis = db.transaction('disciplines', 'readwrite');
  const storeDis = transactionDis.objectStore('disciplines');
  await storeDis.clear();
  dataDis.forEach( async (item) => {
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
      getAllDisciplines,
      getDiscipline,
      addDiscipline,
      editDiscipline,
      editDisciplinesPosition,
      deletePage,
      deleteDiscipline,
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