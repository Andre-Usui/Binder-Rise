import { useReducer } from "react";
import Select from "../Select";
import { colorList } from "../colorList.js"

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



function AddisciplineForm({ id, handle }) {

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
        className="disciplineForm" 
        id={id}
      >
        <h2>Add a new Discipline</h2>
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
        <label htmlFor="pageName">Insert the first page name of the Discipline:</label> <br />
        <input
          type="text"
          name="pageName"
          className="disciplineFormInput"
          value={state.pageName}
          onChange={handleInputChange}
          autoComplete="off"
          required
        />

        <div className ="disciplineFormColorBox">

          <div className="disciplineFormSelectBox">
            <label htmlFor="bgColor" className="disciplineFormLabel">Set the color of the Discipline's Tab:</label>
            <br />

            <Select
              arrayList={colorList}
              name="bgColor"
              form={id}
              className="disciplineFormSelect"
              onChange={handleInputChange}
            />
            <br />
          </div>

          <div className="disciplineFormSelectBox">
            <label htmlFor="color" className="disciplineFormLabel">Set the font color of the Discipline's Tab:</label>
            <br />

            <Select
              arrayList={colorList}
              name="color"
              form={id}
              className="disciplineFormSelect"
              onChange={handleInputChange}
            />
            <br />
          </div>

          <div className="disciplineFormSelectBox">
            <label htmlFor="altColor" className="disciplineFormLabel">Set the detail color of the Discipline's Tab:</label>
            <br />

            <Select
              arrayList={colorList}
              name="altColor"
              form={id}
              className="disciplineFormSelect"
              onChange={handleInputChange}
            />
            <br />
          </div>

        </div>

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


export default AddisciplineForm;