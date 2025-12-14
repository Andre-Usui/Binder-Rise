import { useReducer } from "react";
import Select from "../Select.jsx";
import { colorList } from "../colorList.js";
import ExampleTab from "./ExampleTab.jsx";


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
        className="disciplineForm"
        id={id}
      >
        <h2>Add a new Folder</h2>
        <label htmlFor="title">Insert the title of the Folder:</label> <br />
        <input
          type="text"
          name="title"
          className="disciplineFormInput"
          value={state.title}
          onChange={handleInputChange}
          autoComplete="off"
          required
        />

        <br /><br />
        <label htmlFor="pageName">Insert the first page name of the Folder:</label> <br />
        <input
          type="text"
          name="pageName"
          className="disciplineFormInput"
          value={state.pageName}
          onChange={handleInputChange}
          autoComplete="off"
          required
        />

        <div className="disciplineFormColorBox">
          <div className="disciplineFormSelectBox">
            <label htmlFor="bgColor" className="disciplineFormLabel">Set the color of the Folder's Tab:</label>
            <br />
            <div className="selectOuterBox">
              <div className="selectColorExample" style={{ backgroundColor: `${state.bgColor}` }}></div>
              <Select
                arrayList={colorList}
                name="bgColor"
                form={id}
                className="disciplineFormSelect"
                onChange={handleInputChange}
                stateColor={state.bgColor}
              />
            </div>
            <br />
          </div>

          <div className="disciplineFormSelectBox">
            <label htmlFor="color" className="disciplineFormLabel">Set the font color of the Folder's Tab:</label>
            <br />
            <div className="selectOuterBox">
              <div className="selectColorExample" style={{ backgroundColor: `${state.color}` }}></div>
              <Select
                arrayList={colorList}
                name="color"
                form={id}
                className="disciplineFormSelect"
                onChange={handleInputChange}
                stateColor={state.color}

              />
            </div>
            <br />
          </div>

          <div className="disciplineFormSelectBox">
            <label htmlFor="altColor" className="disciplineFormLabel">Set the detail color of the Folder's Tab:</label>
            <br />
            <div className="selectOuterBox">
              <div className="selectColorExample" style={{ backgroundColor: `${state.altColor}` }}></div>
              <Select
                arrayList={colorList}
                name="altColor"
                form={id}
                className="disciplineFormSelect"
                onChange={handleInputChange}
                stateColor={state.altColor}
              />
            </div>
            <br />
          </div>
        </div>

        <ExampleTab
          bg={state.bgColor}
          alt={state.altColor}
          color={state.color}
          title={state.title}
          folder={true}
        />

        <div className="buttonFormBox">
          <input
            type="submit"
            className="disciplineFormSubmitForm"
            value="Submit"
          />
        </div>
      </form>
    </div >
  )
}


export default AddFolderForm;