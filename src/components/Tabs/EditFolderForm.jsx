import { useReducer, useEffect } from "react";
import Select from "../Select.jsx";
import { colorList } from "../colorList.js";
import ExampleTab from "./ExampleTab.jsx";
import { useDisciplines } from '../../DisciplinesContext';
import { selectBox, selectOuterBox, selectExp, formContainer, formTitle, formColorBox, formLabel, formInput, formSelect, formSubmitButton } from './tabsFormTailwind.js';


const initialState = {
  title: '',
  bgColor: '',
  color: '',
};

function formFolderReducer(state, action) {
  switch (action.type) {
    case 'changeTitle': {
      return {
        ...state,
        title: action.title,
      };
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
    case 'setFolderData': {
      console.log("setFolderData Reducer called")
      return {
        ...state,
        title: action.payload.title,
        bgColor: action.payload.bgColor,
        color: action.payload.color,
        altColor: action.payload.altColor
      };
    }
    case 'resetForm': {
      return initialState;
    }
    default:
      throw new Error('Unknown action: ' + action.type);
  }
}



function EditFolderForm({ id, folder, handle }) {

  const {
    disc
  } = useDisciplines();

  const [state, dispatch] = useReducer(formFolderReducer, initialState);

  useEffect(() => {
    console.log("useEffect EditDiscipline effect was called, post: ", folder)
    if (folder) {

      dispatch({
        type: 'setDisciplineData',
        payload: {
          title: folder.folder_name,
          bgColor: folder.style.backgroundColor,
          color: folder.style.color,
          altColor: folder.style2.backgroundColor
        },
      });
    }
    console.log("setDisciplineData: ", disc)
  }, [disc, folder]);

  const handleEditSubmit = async (e) => {
    console.log("HandleEditSubmit was called, the discipline is: ", disc)
    e.preventDefault();
    const editDiscipline = {
      ...disc,
      discipline_name: state.title,
      style: { backgroundColor: state.bgColor, color: state.color },
      style2: { backgroundColor: state.altColor },
    };
    console.log("HandleEditSubmit was called, the EditDiscipline is: ", editDiscipline)

    await handle(editDiscipline);
    dispatch({ type: 'resetForm' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
      dispatch({ type: 'changeTitle', title: value });
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
        onSubmit={handleEditSubmit}
        className={formContainer}
        id={id}
      >
        <h1 className={formTitle}>Edit your Folder</h1>
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
            <label htmlFor="altColor" className={formLabel}>Set the detail color of the Folder&apos;s Tab:</label>
            
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


export default EditFolderForm;