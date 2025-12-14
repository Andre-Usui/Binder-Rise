import { useReducer, useEffect } from "react";
import Select from "../Select";
import { colorList } from "../colorList.js";
import ExampleTab from "./ExampleTab.jsx";

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
        className="disciplineForm"
        id={id}
      >
        <h2>Edit your Discipline</h2>
        <label htmlFor="title">Insert the title of the Discipline:</label> <br />
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

        <div className="disciplineFormColorBox">
          <div className="disciplineFormSelectBox">
            <label htmlFor="bgColor" className="disciplineFormLabel">Set the color of the Discipline's Tab:</label>
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
            <label htmlFor="color" className="disciplineFormLabel">Set the font color of the Discipline's Tab:</label>
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
            <label htmlFor="altColor" className="disciplineFormLabel">Set the detail color of the Discipline's Tab:</label>
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


export default EditDisciplineForm;