import Button from '../Button.jsx';
import Pages from './Pages.jsx';
import AddPostForm from './AddPostForm.jsx';
import EditPostForm from './EditPostForm.jsx';
import NewPageForm from './NewPageForm.jsx';
import EditPageForm from './EditPageForm.jsx';
import { DbContext } from '../../db3.jsx';
import React, { useEffect, useReducer, useContext, useCallback } from 'react';


const initialState = {
  posts: [],
  listPages: [],
  newPostForm: false,
  newPageForm: false,
  editPageForm: false,
  pageName: "",
  fullDiscipline: ""
};

const feedReducer = (state, action) => {
  switch (action.type) {
    case 'setFullDiscipline':
      return {
        ...state,
        fullDiscipline: action.payload.fullDiscipline,
      };

    case 'setPosts':
      return {
        ...state,
        posts: action.payload.posts,
        listPages: action.payload.listPages,
      };

    case 'setPageName':
      return {
        ...state,
        pageName: action.payload.pageName
      };

    case 'setListPages':
      return {
        ...state,
        listPages: action.payload.listPages
      }

    case 'toggleNewPostForm':
      return {
        ...state,
        newPostForm: !state.newPostForm
      }

    case 'toggleNewPageForm':
      return {
        ...state,
        newPageForm: !state.newPageForm
      }

    case 'toggleEditPageForm':
      return {
        ...state,
        editPageForm: !state.editPageForm
      }

    default:
      throw new Error('Unknown action: ' + action.type);
  }
};


function Feed({ discipline, discipline_id, setPage, page }) {

  const {
    db,
    initDB,
    getPagePosts,
    getDiscipline,
    editDiscipline,
    addPost,
    editPost,
    deletePost
  } = useContext(DbContext);

  const [state, dispatch] = useReducer(feedReducer, initialState);

  const handleSetPage = (value) => {
    if (state.newPostForm) handleNewPostForm();
    if (state.newPageForm) handleNewPageForm();
    if (state.editPageForm) handleEditPageForm();
    const newPage = parseInt(value.toString());
    setPage(newPage);
  }

  useEffect(() => {
  }, [page]);

  const fetchPosts = useCallback(async () => {
    if (!db) {
      await initDB();
      await initDB.done;
    }
    try {
      if (state.newPostForm) (dispatch({ type: 'toggleNewPostForm' }))
      if (state.newPageForm) (dispatch({ type: 'toggleNewPageForm' }))
      if (state.editPageForm) (dispatch({ type: 'toggleEditPageForm' }))
      const result = await getPagePosts(discipline_id);
      const fDiscipline = await getDiscipline(discipline_id);
      const pagesArray = Array.isArray(fDiscipline.pages) ? fDiscipline.pages : [];
      const pagesNumArray = pagesArray.map(p => p.num);
      const pageIndex = pagesNumArray.indexOf(page);
      const pName = pagesArray[pageIndex].name;
      const pagePost = result.filter((post) => post.page === page);
      pagePost.sort((a, b) => a.position - b.position);
      dispatch({ type: 'setPosts', payload: { posts: pagePost, listPages: pagesArray } });
      dispatch({ type: 'setFullDiscipline', payload: { fullDiscipline: fDiscipline } });
      dispatch({ type: 'setPageName', payload: { pageName: pName } });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, [db, page, discipline_id, discipline, getPagePosts]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Handlers Reducer

  const handleNewPostForm = () => {
    dispatch({ type: 'toggleNewPostForm' });
  }
  const handleNewPageForm = () => {
    dispatch({ type: 'toggleNewPageForm' })
  };
  const handleEditPageForm = () => {
    dispatch({ type: 'toggleEditPageForm' })
  };

  // Handle Edit Form

  const handleOnEditForm = async (postItem) => {
    postItem.onEdit = !postItem.onEdit;
    await editPost(postItem);
    await fetchPosts();
    

  };

  // Handle New Post
  const handleNewPost = async (newPost) => {  // Done
    try {
      await addPost(newPost);
      handleNewPostForm(); // closing PostForm component
      await fetchPosts(); // Refresh the list after adding a new post
    } catch (error) {
      console.error('Error adding discipline:', error);
    }
  };


  // Handle Edit Post
  const handleEditPost = async (editedPost) => {
    try {
      await editPost(editedPost);
      await fetchPosts(); // Refresh the list after adding a new post
    } catch (error) {
      console.error('Error adding discipline:', error);
    }
  };

  // Handle delete Post
  const handleDeletePost = async (post_id) => {  // DONE
    try {
      await deletePost(post_id).then(() => {
      }).catch((error) => {
        console.error("Error deleting post: ", error);
      });
      await fetchPosts(); // Refresh the list after deleting a post
    } catch (error) {
      console.error('Error adding discipline:', error);
    }
  };

  // Handle New Page

  const handleNewPage = async (editedDiscipline) => {
    try {
      await editDiscipline(editedDiscipline);
      handleSetPage(Math.max(...editedDiscipline.pages.map(p => p.num)));
      await fetchPosts(); // Refresh the list after adding a new post
    } catch (error) {
      console.error('Error adding discipline:', error);
    }
  };

  // Handle Edit Page

  const handleEditPage = async (editedDiscipline) => {
    try {
      await editDiscipline(editedDiscipline);
      handleEditPageForm();
      await fetchPosts(); // Refresh the list after adding a new post
    } catch (error) {
      console.error('Error adding discipline:', error);
    }
  };

  // ListFeed component

  const listFeed = state.posts.map((postItem, index) => {
    return (
      <React.Fragment key={index}>
        <li className="postItemLi">
          <h2 className="postItemTitle">{postItem.post_title}</h2>
          <ul>
            {postItem.reference.map((r, index) =>
              <li key={index} className="postItemReference" >
                <a href={r.ref_link}>{r.ref_name}</a>
              </li>
            )}
          </ul>
          <p className="postItemContent">{postItem.content}</p>
          <p className="postItemDate">creation: {postItem.creation_date}</p>
          <div className="postItemBtnBox">
            <Button
              buttonClick={() => handleOnEditForm(postItem)}
              buttonClass="postItemBtn"
              buttonName="Edit"
            />
            <Button
              buttonClick={() => handleDeletePost(postItem.post_id)}
              buttonClass="postItemBtn"
              buttonName="Delete"
            />
          </div>
          {postItem.onEdit && (<EditPostForm
            discipline_id={postItem.discipline_id}
            page={postItem.page}
            post={postItem}
            onEdit={handleEditPost}
          />)}
        </li>
      </React.Fragment>
    )
  })

  // #### return

  return (
    <div className="feedBox">
      <div className="pageTop">
        <h1>{state.fullDiscipline.discipline_name}</h1>
        <div className="pageBox">
          <h2>•</h2>
          <h2>{state.pageName}</h2>
          <Button
            buttonClass="editPageBtn"
            buttonClick={handleEditPageForm}
            buttonName=""
          />
        </div>
      </div>
      {state.editPageForm && (<EditPageForm
        posts={state.posts}
        discipline={state.fullDiscipline}
        page={page}
        onEdit={handleEditPage}
        handleSetPage={handleSetPage}
        fetchPosts={fetchPosts}
      />)}
      {!state.editPageForm && (
        <div className="pageContainer">
          <Pages
            pages={state.listPages}
            handleSetPage={handleSetPage}
            handleNewPageForm={handleNewPageForm}
          />
          {state.newPageForm && (
            <NewPageForm
              page={page}
              discipline={state.fullDiscipline}
              onAdd={handleNewPage}
            />)}

            
          <ul className="postItemUl">

            {listFeed}

          </ul>
          <div className='postItemBtnBox' style={{ width: "90%", marginTop: "0" }}>
            <Button
              buttonName="New Post" //TODO - if addPost is on, generate a postForm
              buttonClick={handleNewPostForm}
              buttonClass="postItemBtn"
              style={{marginRight: '10vw'}}
            />
          </div>
            <div className="newPostBox">
            {state.newPostForm && (
            <AddPostForm
              discipline_id={discipline_id}
              page={page}
              onAdd={handleNewPost}
            />)}
            </div>
        </div>
      )}
    </div>

  )
}

export default Feed;