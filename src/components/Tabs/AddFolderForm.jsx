import { useReducer } from "react";
import Select from "../Select.jsx";
import { colorList } from "../colorList.js";
import ExampleTab from "./ExampleTab.jsx";
import { selectBox, selectOuterBox, selectExp, formContainer, formTitle, formColorBox, formLabel, formInput, formSelect, option, formSubmitButton } from './tabsTailwind.js';


const initialState = {
  title: '',
  pageName: '',
  bgColor: '',
  color: '',
};

function formFolderReducer(state, action) {
  switch (action.type) {
    case 'changeFolder': {
      return {
        ...state,
        title: action.title,
      };
    }
    case 'changePageName': {
      return {
        ...state,
        pageName: action.pageName,
      }
    }
    case 'changeBgColor': {
      return {
        ...state,
        bgColor: action.bgColor,
      };
    }
    case 'changeColor': {
      return {
        ...state,
        color: action.color,
      };
    }
    case 'changeAltColor': {
      return {
        ...state,
        altColor: action.altColor,
      };
    }
    case 'resetForm': {
      return initialState;
    }
    default:
      throw new Error('Unknown action: ' + action.type);
  }
}



function AddFolderForm({ id, handle }) {

  const [state, dispatch] = useReducer(formFolderReducer, initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFolder = {
      name: state.title,
      style: { backgroundColor: state.bgColor, color: state.color },
      style2: { backgroundColor: state.altColor },
      inside_position: []
    };
    await handle(newFolder);
    dispatch({ type: 'resetForm' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
      dispatch({ type: 'changeFolder', title: value });
    } else if (name === 'pageName') {
      dispatch({ type: 'changePageName', pageName: value });
    } else if (name === 'bgColor') {
      dispatch({ type: 'changeBgColor', bgColor: value });
    } else if (name === 'color') {
      dispatch({ type: 'changeColor', color: value });
    } else if (name === 'altColor') {
      dispatch({ type: 'changeAltColor', altColor: value });
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className={formContainer}
        id={id}
      >
        <h1 className={formTitle}>Add a new Folder</h1>
        <label htmlFor="title" className={formLabel}>Insert the title of the Folder:</label>
        <input
          type="text"
          name="title"
          className={formInput}
          value={state.title}
          onChange={handleInputChange}
          autoComplete="off"
          required
        />

        <div className={formColorBox}>
          <div className={selectBox}>
            <label htmlFor="bgColor" className={formLabel}>Set the color of the Folder&apos;s Tab:</label>

            <div className={selectOuterBox}>
              <div className={selectExp} style={{ backgroundColor: `${state.bgColor}` }}></div>
              <Select
                arrayList={colorList}
                name="bgColor"
                form={id}
                className={formSelect}
                onChange={handleInputChange}
                stateColor={state.bgColor}
              />
            </div>

          </div>

          <div className={selectBox}>
            <label htmlFor="color" className={formLabel}>Set the font color of the Folder&apos;s Tab:</label>

            <div className={selectOuterBox}>
              <div className={selectExp} style={{ backgroundColor: `${state.color}` }}></div>
              <Select
                arrayList={colorList}
                name="color"
                form={id}
                className={formSelect}
                onChange={handleInputChange}
                stateColor={state.color}

              />
            </div>

          </div>

          <div className={selectBox}>
            <label htmlFor="altColor" className={formLabel}>Set the detail color of the Folder's Tab:</label>

            <div className={selectOuterBox}>
              <div className={selectExp} style={{ backgroundColor: `${state.altColor}` }}></div>
              <Select
                arrayList={colorList}
                name="altColor"
                form={id}
                className={formSelect}
                onChange={handleInputChange}
                stateColor={state.altColor}
              />
            </div>

          </div>
        </div>

        <ExampleTab
          bg={state.bgColor}
          alt={state.altColor}
          color={state.color}
          title={state.title}
          folder={true}
        />
          <input
            type="submit"
            className={formSubmitButton}
            value="Submit"
          />
      </form>
    </div >
  )
}


export default AddFolderForm;