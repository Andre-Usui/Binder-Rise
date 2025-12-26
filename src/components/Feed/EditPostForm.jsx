import { useReducer, useEffect } from "react";
import { formPostLabel, formPostInput, formPost,formPostText, formPostBoxBtn, formPostBtn} from "./feedFormTailwind";

const initialState = {
  discipline_id: null,
  page: null,
  post_title: "",
  reference: "",
  content: "",
  creation_date: "",
  onEdit: null,
};

function postReducer(state, action) {
  switch (action.type) {
    case 'changeTitle': {
      return {
        ...state,
        post_title: action.post_title,
      };
    }
    case 'changeReference': {
      return {
        ...state,
        reference: action.reference,
      };
    }
    case 'changeContent': {
      return {
        ...state,
        content: action.content,
      };
    }
    case 'setPostData':
      return {
        ...state,
        post_title: action.payload.post_title,
        reference: action.payload.reference,
        content: action.payload.content,
      };
    case 'resetForm': {
      return initialState;
    }
    default:
      throw new Error('Unknown action: ' + action.type);
  }
}


function EditPostForm({ discipline_id, page, post, onEdit }) {


  const [state, dispatch] = useReducer(postReducer, initialState)

  useEffect(() => {
    console.log("useEffect EditPost called, post: ", post, ', state.page: ', page)
    if (post) {

      const referenceObj = post.reference;
      const referenceStr = referenceObj.map(ref => `${ref.ref_name}(${ref.ref_link})`).join(', ');
      dispatch({
        type: 'setPostData',
        payload: {
          post_title: post.post_title,
          reference: referenceStr,
          content: post.content,
        },
      });
    }
  }, [post]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const referenceObj = state.reference === ""
      ? []
      : state.reference.split(', ').map(pair => {
        const [ref_name, ref_link] = pair.match(/(.+)\((.+)\)/).slice(1, 3);
        return { ref_name, ref_link };
        /*   //matching name(link)
      Let's break down the regular expression /(.+)\((.+)\)/ used in your code:
  
        '/(.+)\((.+)\)/':
        '/( ... )/' - This indicates the start and end of the regular expression.
        '.+' - This matches one or more of any character except line breaks.
        '\(' - This matches the literal opening parenthesis '('.
        '\)' - This matches the literal closing parenthesis ')'.
      */

      });
    const editedPost = {
      discipline_id: discipline_id,
      page: page,
      post_id: post.post_id,
      post_title: state.post_title,
      reference: referenceObj,
      content: state.content,
      creation_date: new Date().toDateString(),
      onEdit: false
    };
    await onEdit(editedPost);
    dispatch({ type: 'resetForm' });
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === 'title') {
      dispatch({ type: 'changeTitle', post_title: value });
    } else if (name === 'reference') {
      dispatch({ type: 'changeReference', reference: value });
    } else if (name === 'content') {
      dispatch({ type: 'changeContent', content: value });
    }
  };

  return (
    <form
      onSubmit={handleEditSubmit}
      className={formPost}
    >
      <label htmlFor="title" className={formPostLabel} >Set the title of the post bellow:</label>
      <br />

      <input
        type="text"
        id="title"
        name="title"
        className={formPostInput}
        value={state.post_title}
        onChange={handleInputChange}
        wrap="hard"
        autoComplete="off"
        required
      />
      <br />
      <label htmlFor="reference" className={formPostLabel}>Set references of the post bellow (separate then by comma + space ):</label>
      <br />

      <input
        type="text"
        id="reference"
        name="reference"
        className={formPostInput}
        value={state.reference}
        onChange={handleInputChange}
        autoComplete="off"
      />
      <br />

      <label htmlFor="textArea" className={formPostLabel} >Set the content of the post bellow:</label>
      <br />

      <textarea
        id="content"
        name="content"
        className={formPostText}
        onChange={handleInputChange}
        value={state.content}
        autoComplete="off"
        required
      />

      <br />
      <div className={formPostBoxBtn}>

        <input
          type="submit"
          className={formPostBtn}
          value="Submit"
        />
      </div>
    </form>
  )
}

export default EditPostForm;