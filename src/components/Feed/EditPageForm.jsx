import { useState, useEffect, useContext } from "react";
import { DbContext } from '../../DbContext.jsx';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function EditPageForm({ discipline, posts, page, onEdit, handleSetPage, fetchPosts }) {

  const {
    editPostPosition,
    deletePage
  } = useContext(DbContext);

  const [title, setTitle] = useState("");
  const [postOrder, setPostOrder] = useState([]);

  useEffect(() => {
    if (posts && posts.length >= 0) {
      const disciplinePage = discipline.pages[page - 1];
      const pageName = disciplinePage.name;
      const pageName2 = String(pageName);
      console.log("pageName is ", pageName2);
      setTitle(String(pageName2));
      const p = posts.sort((a, b) => a.position - b.position);
      console.log("useEffect on EditPageForm: pageName: ", pageName, "orderedPosts: ", p)
      setPostOrder(p); 
    }
  }, [posts, discipline, page]);

  console.log("retreiving data: ", posts, discipline, page, title, postOrder)

  const updatePostPositions = async (orderedPosts) => {
    console.log("orderedPost: ", orderedPosts);
    const updatedPosts = orderedPosts.map((post, index) => ({
      ...post,
      position: index + 1, 
    }));
    console.log("updatedPosts: ", updatedPosts)

    await editPostPosition(updatedPosts)

    setPostOrder(updatedPosts); 
  };

  const handleSubmitPage = async (e) => {
    e.preventDefault();
    const editedPages = {
      ...discipline,
      pages: discipline.pages.map((p) =>
        p.num === page ? { ...p, name: title } : p
      )
    };
    console.log("handleSubmit on edit page was called", editedPages);
    await onEdit(editedPages);
    setTitle('');
  };
  
  const handleDeletePage = async (e) => {
    e.preventDefault();
    await deletePage(discipline, page);
    await handleSetPage(1);
    await fetchPosts();
  }

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(postOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPostOrder(items);
    updatePostPositions(items);
  };

  const PostList = () => {
    if (!Array.isArray(postOrder) || postOrder.length === 0) return null;

    return (
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="posts">
          {(provided) => (
            <ul className="dragableUl" {...provided.droppableProps} ref={provided.innerRef}>
              {postOrder.map((post, index) => (
                <Draggable
                  key={post.post_id.toString()}
                  draggableId={post.post_id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <li
                      className="dragableLi"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <p>{post.post_title}</p>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmitPage} className="addPageForm">
        <label className="formPostLabel" htmlFor="pageName">Insert below the page title:</label>
        < br/> < br/>
        <input
          type="text"
          name="pageName"
          className="formPostInput"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoComplete="off"
          required
        />
        <p>Drag to set posts positions: </p>
        
        <PostList />

        <input
          type="submit"
          value="Submit"
          className="postItemBtn"
        />
        <input
          type="button"
          value="Delete page"
          className="postItemBtn"
          onClick={handleDeletePage}
        />
      </form>
    </div>
  );
}

export default EditPageForm;