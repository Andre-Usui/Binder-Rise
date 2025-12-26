import { useReducer, useEffect } from "react";
import Select from "../Select";
import { colorList } from "../colorList.js";
import ExampleTab from "./ExampleTab.jsx";
import{selectBox, selectOuterBox, selectExp, formContainer, formTitle,formColorBox, formLabel, formInput, formSelect, option, formSubmitButton} from './tabsTailwind.js';


const initialState = {
  title: '',
  bgColor: '',
  color: '',
};

function formDisciplineReducer(state, action) {
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
    case 'setDisciplineData': {
      console.log("setDisciplineData Reducer called")
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



function EditDisciplineForm({ id, discipline, handle }) {

  const [state, dispatch] = useReducer(formDisciplineReducer, initialState);

  useEffect(() => {
    console.log("useEffect EditDiscipline effect was called, post: ", discipline)
    if (discipline) {

      dispatch({
        type: 'setDisciplineData',
        payload: {
          title: discipline.discipline_name,
          bgColor: discipline.style.backgroundColor,
          color: discipline.style.color,
          altColor: discipline.style2.backgroundColor
        },
      });
    }
    console.log("setDisciplineData: ", discipline)
  }, [discipline]);

  const handleEditSubmit = async (e) => {
    console.log("HandleEditSubmit was called, the discipline is: ", discipline)
    e.preventDefault();
    const editDiscipline = {
      ...discipline,
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
        <h1 className={formTitle}>Edit your Discipline</h1>
        <label htmlFor="title" className={formLabel}>Insert the title of the Discipline:</label> 
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
            <label htmlFor="bgColor" className={formLabel}>Set the color of the Discipline&apos;s Tab:</label>
            
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
            <label htmlFor="color" className={formLabel}>Set the font color of the Discipline&apos;s Tab:</label>
            
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
            <label htmlFor="altColor" className={formLabel}>Set the detail color of the Discipline&apos;s Tab:</label>
            
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


export default EditDisciplineForm;