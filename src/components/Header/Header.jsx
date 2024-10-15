import Button from '../Button.jsx';
import AddisciplineForm from './AddDisciplineForm.jsx';
import EditDisciplineForm from './EditDisciplineForm.jsx';
import Settings from "../Settings/Settings.jsx";
import { useState, useContext, useEffect, useCallback } from 'react';
import { DbContext } from '../../db3.jsx';


function Header({ setDiscipline, setPage, discipline, discipline_id }) {

  const { db, initDB, getAllDisciplines, addDiscipline, editDiscipline, deleteDiscipline } = useContext(DbContext);
  const [disciplines, setDisciplines] = useState([]);
  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [settingsForm, setSettingsForm] = useState(false)


  const fetchDisciplines = useCallback(async () => { 
    if (!db) {
      await initDB();
      await initDB.done;
    }
    try {
      const fetchedDisciplines = await getAllDisciplines();
      fetchedDisciplines.sort((a, b) => a.position - b.position);
      setDisciplines(fetchedDisciplines);
    } catch (error) {
      console.error("Error fetching disciplines:", error);
    }
  }, [db, initDB, getAllDisciplines]);

  useEffect(() => {
    fetchDisciplines();
  }, [fetchDisciplines, discipline]);

  // Handle Settings

  const handleSetSettings = () => {
    if (editForm) setEditForm(!editForm);
    if (addForm) setAddForm(!addForm);
    setSettingsForm(!settingsForm);
    setDiscipline("null");
    fetchDisciplines();
  }

  // Handle Discipline

  const handleSetDiscipline = (dis) => {
    if (addForm) setAddForm(!addForm);
    if (editForm) setEditForm(!editForm);
    if (settingsForm) setSettingsForm(!settingsForm);
    setDiscipline(dis);
    setPage(1);
  };

  // Adding Disciplines

  const handleAddDiscipline = async (newDiscipline) => {
    try {
      setAddForm(!addForm);
      await addDiscipline(newDiscipline); //from context
      await addDiscipline.done;
      await fetchDisciplines();
      handleSetDiscipline(newDiscipline);
    } catch (error) {
      console.error('Error adding discipline:', error);
    }
  };

  // Edit disciplines

  const handleEditDiscipline = async (editedDiscipline) => {
    try {
      await editDiscipline(editedDiscipline); //from context
      setEditForm(!editForm);
      await fetchDisciplines(); // Refresh the list after adding a new discipline
      handleSetDiscipline(editedDiscipline);
      //setEditForm(!editForm)
    } catch (error) {
      console.error('Error adding discipline:', error);
    }
  };

  // Delete disciplines

  const handleDeleteDiscipline = async (discipline_id) => { 
    try {
      await deleteDiscipline(discipline_id);
      await fetchDisciplines();
      setDiscipline("landing");
    } catch (error) {
      console.error('Error deleting discipline:', error);
    }
  };

  return (
    <div className="headerBox">
      <h1>Binder Rise</h1>
      <div className="headerTabs">
        <div className="headerBtnOuterOption">
          <Button
            buttonClass="headerBtnOption"
            buttonClick={handleSetSettings}
            buttonName=""
          />
        </div>
        {disciplines.map(discipline => (
          <div key={discipline.discipline_id} className="headerBtnClip">
            {discipline_id === discipline.discipline_id && (
              <div className="headerBtnBox">
                <Button
                  buttonClass="deleteBtn"
                  buttonClick={() => handleDeleteDiscipline(discipline.discipline_id)}
                  buttonName=""
                />
                <Button
                  buttonClass="editBtn"
                  buttonClick={() => { if (addForm) { setAddForm(!addForm) } setEditForm(!editForm) }}
                  buttonName=""
                />
              </div>)}
            <div className="headerBtnOuter" style={discipline.style2}>
              <Button
                buttonClass="headerBtn"
                buttonClick={() => handleSetDiscipline((discipline))}
                buttonName={discipline.discipline_name}
                style={discipline.style}
              />
            </div>
          </div>
        ))
        }
        <div className="headerBtnOuterPlus">
          <Button
            buttonClass="headerBtnPlus"
            buttonClick={() => { if (editForm) { setEditForm(!editForm) } setAddForm(!addForm) }}
            buttonName="+"
          />
        </div>
      </div>
      <div className="headerDivisor"></div>
      {addForm &&
        <AddisciplineForm
          handle={handleAddDiscipline}
          id="addDiscipline"
        />}
      {editForm && (
        <EditDisciplineForm
          discipline={discipline}
          handle={handleEditDiscipline}
          id="editDiscipline"
        />)}
      {settingsForm && (
        <Settings
          handle={handleSetSettings}
        />
      )}
    </div>
  )
}

export default Header;