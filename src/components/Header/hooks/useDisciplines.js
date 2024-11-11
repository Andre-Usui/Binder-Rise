import { useState, useEffect, useCallback, useContext } from 'react';
import { DbContext } from '../../../db3.jsx';

export function useDisciplines({ setDiscipline, setPage }) {
  const { db, initDB, getAllDisciplines, addDiscipline, editDiscipline, deleteDiscipline } = useContext(DbContext);
  const [disciplines, setDisciplines] = useState([]);
  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [settingsForm, setSettingsForm] = useState(false);

  const fetchDisciplines = useCallback(async () => {
    if (!db) await initDB();
    try {
      const fetchedDisciplines = await getAllDisciplines();
      setDisciplines(fetchedDisciplines.sort((a, b) => a.position - b.position));
    } catch (error) {
      console.error("Error fetching disciplines:", error);
    }
  }, [db, initDB, getAllDisciplines]);

  useEffect(() => {
    fetchDisciplines();
  }, [fetchDisciplines]);

  const toggleAddForm = () => {
    if (editForm) setEditForm(!editForm);
    if (settingsForm) setSettingsForm(!settingsForm);
    setAddForm(addForm => !addForm);
  }

  const toggleEditForm = () => {
    if (addForm) setAddForm(!addForm);
    if (settingsForm) setSettingsForm(!settingsForm);
    setEditForm(editForm => !editForm);
  }

  const toggleSettingsForm = () => {
    if (addForm) setAddForm(!addForm);
    if (editForm) setEditForm(!editForm);
    setSettingsForm(settingsForm => !settingsForm);
  }

  const handleSetDiscipline = (dis) => {
    if (addForm) setAddForm(!addForm);
    if (editForm) setEditForm(!editForm);
    if (settingsForm) setSettingsForm(!settingsForm);
    setDiscipline(dis);
    setPage(1);
  };

  const handleAddDiscipline = async (newDiscipline) => {
    try {
      toggleAddForm();
      await addDiscipline(newDiscipline);
      await fetchDisciplines();
      await setDiscipline(newDiscipline);
    } catch (error) {
      console.error('Error adding discipline:', error);
    }
  };

  const handleEditDiscipline = async (editedDiscipline) => {
    try {
      await editDiscipline(editedDiscipline);
      toggleEditForm();
      await fetchDisciplines();
      setDiscipline(editedDiscipline);
    } catch (error) {
      console.error('Error editing discipline:', error);
    }
  };

  const handleDeleteDiscipline = async (discipline_id) => {
    try {
      await deleteDiscipline(discipline_id);
      await fetchDisciplines();
      setDiscipline("landing");
    } catch (error) {
      console.error('Error deleting discipline:', error);
    }
  };

  return {
    disciplines,
    addForm,
    editForm,
    settingsForm,
    toggleAddForm,
    toggleEditForm,
    toggleSettingsForm,
    handleAddDiscipline,
    handleEditDiscipline,
    handleDeleteDiscipline,
    handleSetDiscipline
  };
}