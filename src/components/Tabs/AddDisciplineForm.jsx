import { useReducer } from "react";
import Select from "../Select";
import { colorList } from "../colorList.js";
import ExampleTab from "./ExampleTab.jsx";
import { selectBox, selectOuterBox, selectExp, formContainer, formTitle, formColorBox, formLabel, formInput, formSelect, formSubmitButton } from './tabsTailwind.js';

const initialState = {
  title: '',
  pageName: '',
  bgColor: '',
  color: '',
};



function formDisciplineReducer(state, action) {
  switch (action.type) {
    case 'changeDiscipline': {
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

function AddDisciplineForm({ id, handle }) {

  const [state, dispatch] = useReducer(formDisciplineReducer, initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDiscipline = {
      discipline_name: state.title,
      style: { backgroundColor: state.bgColor, color: state.color },
      style2: { backgroundColor: state.altColor },
      pages: [{ num: 1, name: state.pageName }]
    };
    await handle(newDiscipline);
    dispatch({ type: 'resetForm' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
      dispatch({ type: 'changeDiscipline', title: value });
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
        <h1 className={formTitle}>Add a new Discipline</h1>
        <label htmlFor="title_id" className={formLabel}>Insert the title of the Discipline:</label>
        <input
          type="text"
          id="title_id"
          name="title"
          className={formInput}
          value={state.title}
          onChange={handleInputChange}
          autoComplete="off"
          required
        />


        <label htmlFor="pageName_id" className={formLabel}>Insert the first page name of the Discipline:</label>
        <input
          type="text"
          id="pageName_id"
          name="pageName"
          className={formInput}
          value={state.pageName}
          onChange={handleInputChange}
          autoComplete="off"
          required
        />

        <div className={formColorBox}>
          <div className={selectBox}>
            <label htmlFor="bgColor_id" className={formLabel}>Set the color of the Discipline&apos;s Tab:</label>

            <div className={selectOuterBox}>
              <div className={selectExp} style={{ backgroundColor: `${state.bgColor}` }}></div>
              <Select
                arrayList={colorList}
                id="bgColor_id"
                name="bgColor"
                form={id}
                className={formSelect}
                onChange={handleInputChange}
                stateColor={state.bgColor}
              />
            </div>

          </div>

          <div className={selectBox}>
            <label htmlFor="color_id" className={formLabel}>Set the font color of the Discipline&apos;s Tab:</label>

            <div className={selectOuterBox}>
              <div className={selectExp} style={{ backgroundColor: `${state.color}` }}></div>
              <Select
                arrayList={colorList}
                id="color_id"
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
                id="altColor"
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


export default AddDisciplineForm;