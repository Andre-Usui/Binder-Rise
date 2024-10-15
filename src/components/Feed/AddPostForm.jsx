import { useReducer } from "react";


const initialState = {
  discipline_id: null,
  page: null,
  post_title: "",
  reference: [],
  content: "",
  creation_date: "",
  on_edit: false
};

function postReducer(state, action) {
  switch (action.type) {
    case 'changeTitle': {
      return {
        ...state,
        post_title: action.title,
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
    case 'resetForm': {
      return initialState;
    }
    default:
      throw new Error('Unknown action: ' + action.type);
  }
}


function AddPostForm({ discipline_id, page, onAdd }) {

  const [state, dispatch] = useReducer(postReducer, initialState)


  const handleAddSubmit = async (e) => {
    e.preventDefault();

    const referenceArr = state.reference.split(', ');
    const referenceObj = referenceArr.map(pair => {
      const [ref_name, ref_link] = pair.match(/(.+)\((.+)\)/).slice(1, 3);
      return { ref_name, ref_link }

      /*   //matching name(link)
      Let's break down the regular expression /(.+)\((.+)\)/ used in your code:

        '/(.+)\((.+)\)/':
        '/( ... )/' - This indicates the start and end of the regular expression.
        '.+' - This matches one or more of any character except line breaks.
        '\(' - This matches the literal opening parenthesis '('.
        '\)' - This matches the literal closing parenthesis ')'.
      */
     
    })

    const newPost = {
      discipline_id: discipline_id,
      page: page,
      post_title: state.post_title,
      reference: referenceObj,
      content: state.content,
      creation_date: new Date().toDateString(), 
      on_edit: false
    };

    await onAdd(newPost); 
    dispatch({ type: 'resetForm' });
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === 'title') {
      dispatch({ type: 'changeTitle', title: value });
    } else if (name === 'reference') {
      dispatch({ type: 'changeReference', reference: value });
    } else if (name === 'content') {
      dispatch({ type: 'changeContent', content: value });
    }
  };

  return (
    <form
      onSubmit={handleAddSubmit}
      className="formPost"
    >
      <label htmlFor="title" className="formPostLabel" >Set the title of the post bellow:</label>
      <br />

      <input
        type="text"
        name="title"
        className="formPostInput"
        value={state.title}
        onChange={handleInputChange}
        autoComplete="off"
        required
      />
      <br />
      <label htmlFor="reference" className="formPostLabel" >Set references of the post bellow (separate then by comma + space):</label>
      <br />

      <input
        type="text"
        name="reference"
        className="formPostInput"
        value={state.reference}
        onChange={handleInputChange}
        autoComplete="off"
      />
      <br />

      <label htmlFor="content" className="formPostLabel" >Set the content of the post bellow:</label>
      <br />

      <textarea
        name="content"
        className="formPostText"
        value={state.content}
        onChange={handleInputChange}
        autoComplete="off"
        required
      />

      <br />
      <div className="formPostBoxBtn">

        <input
          type="submit"
          className="formPostBtn"
          value="Submit"

        />
      </div>
    </form>
  )
}

export default AddPostForm;