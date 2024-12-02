import { useState } from "react";

const NewPageForm = ({ discipline, onAdd }) => {

  const [title, setTitle] = useState("");

  const handleSubmitPage = async (e) => {
    e.preventDefault();
    console.log(discipline);
    const pagesArray = Array.isArray(discipline.pages) ? discipline.pages : [];
    console.log("pagesArray is: ", pagesArray);
    const lastPage = Math.max(...pagesArray.map(p => p.num)) || 0;
    const newPage = { name: title, num: lastPage + 1 };
    const updatedDiscipline = { ...discipline, pages: [ ...discipline.pages, newPage ] };
    await onAdd(updatedDiscipline);
    setTitle('');
  }

  return (
    <div>
      <form onSubmit={handleSubmitPage} className="addPageForm">
        <label htmlFor="pageName" className="formPostLabel">Insert bellow the page title:</label>

        <input
          type="text"
          name="pageName"
          className="formPostInput"
          onChange={(e) => { setTitle(e.target.value) }}
          autoComplete="off"
          required
        />

        <input
          type="submit"
          value="Submit"
          className="postItemBtn"
        />

      </form>
    </div>

  )
}

export default NewPageForm;