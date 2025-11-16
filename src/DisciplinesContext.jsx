import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DbContext } from './DbContext.jsx';

const DisciplinesContext = createContext();

export const DisciplinesProvider = ({ children }) => {

  const [disciplines, setDisciplines] = useState([]);
  const [folders, setFolders] = useState([]);
  const [disc, setDisc] = useState("landing");
  const [page, setPage] = useState(1);
  const [forms, setForms] = useState({
    addForm: false,
    editForm: false,
    addFolderForm: false,
    editFolderForm: false,
    settingsForm: false
  });

  const {
    db,
    initDB,
    getAllDisciplines,
    addDiscipline,
    editDiscipline,
    deleteDiscipline,
    getAllFolders,
    addFolder,
    editFolder,
    deleteFolder
  } = useContext(DbContext);


  const organizeFolder = useCallback((folder, disciplinaMap, folderMap) => {
    if (folder.inside_position.length <= 0) return folder;

    return {
      ...folder,
      children: folder.positions
        .map(pos => {
          if (pos.tipo === "discipline") {
            return disciplinaMap.get(pos.id);
          }
          if (pos.tipo === "folder") {
            return organizeFolder(folderMap.get(pos.id), disciplinaMap, folderMap);
          }
          return null;
        })
        .filter(Boolean),
    };
  }, []);

  const fetchTab = useCallback(async () => {
    try {
      if (!db) await initDB();

      const fetchedDisciplines = await getAllDisciplines();
      const fetchedFolders = await getAllFolders();

      console.log("on useEffect DisciplineContext. FetchedDisciplines: ", fetchedDisciplines, ' fetchedFolders: ', fetchedFolders);

      // Create maps for efficient lookups
      const disciplineMap = new Map(fetchedDisciplines.map(d => [d.discipline_id, d]));
      const folderMap = new Map(fetchedFolders.map(f => [f.folder_id, f]));

      // Process folders with error handling
      if (fetchedFolders.length > 0) {
        try {
          const organizedFolders = fetchedFolders.map(f =>
            organizeFolder(f, disciplineMap, folderMap)
          );
          setFolders(organizedFolders.sort((a, b) => (a.position ?? 0) - (b.position ?? 0)));
        } catch (folderError) {
          console.error("Error organizing folders:", folderError);
          setFolders([]);
        }
      } else {
        setFolders([]);
      }

      // Process disciplines with error handling
      try {
        const sortedDisciplines = fetchedDisciplines.sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
        setDisciplines(sortedDisciplines);
      } catch (disciplineError) {
        console.error("Error sorting disciplines:", disciplineError);
        setDisciplines([]);
      }
    } catch (error) {
      console.error("Error fetching disciplines:", error);
      setDisciplines([]);
      setFolders([]);
    }
  }, [db, initDB, getAllDisciplines, getAllFolders, organizeFolder]);

  useEffect(() => {
    console.log("useEffect running")
    fetchTab();
  }, [fetchTab])

  // Form toggling helper
  const toggleForm = useCallback((formType) => {
    setForms(prev => ({
      ...prev,
      [formType]: !prev[formType]
    }));
  }, []);

  // Handlers
  const handleSetDiscipline = useCallback(async (dis) => {
    Object.keys(forms).forEach(form => toggleForm(form));
    setDisc(dis);
    setPage(1);
  }, [forms, toggleForm, setDisc, setPage]);

  const handleAddDiscipline = useCallback(async (newDiscipline) => {
    try {
      await addDiscipline(newDiscipline);
      toggleForm('addForm');
      setDisc(newDiscipline);
    } catch (error) {
      console.error('Error adding discipline:', error);
    }
  }, [addDiscipline, toggleForm, setDisc]);

  const handleEditDiscipline = useCallback(async (editedDiscipline) => {
    try {
      await editDiscipline(editedDiscipline);
      toggleForm('editForm');
      setDisc(editedDiscipline);
    } catch (error) {
      console.error('Error editing discipline:', error);
    }
  }, [editDiscipline, toggleForm, setDisc]);

  const handleDeleteDiscipline = useCallback(async (discipline_id) => {
    try {
      await deleteDiscipline(discipline_id);
      setDisc("landing");
    } catch (error) {
      console.error('Error deleting discipline:', error);
    }
  }, [deleteDiscipline, setDisc]);

  const handleAddFolder = useCallback(async (folder) => {
    try {
      await addFolder(folder);
      toggleForm('addFolderForm');
    } catch (error) {
      console.error('Error adding folder:', error);
    }
  }, [addFolder, toggleForm]);

  const handleEditFolder = useCallback(async (editedFolder) => {
    try {
      await editFolder(editedFolder);
      toggleForm('editFolderForm');
    } catch (error) {
      console.error('Error editing folder:', error);
    }
  }, [editFolder, toggleForm]);

  const handleDeleteFolder = useCallback(async (folder_id) => {
    try {
      await deleteFolder(folder_id);
      setDisc("landing");
    } catch (error) {
      console.error('Error deleting folder:', error);
    }
  }, [deleteFolder, setDisc]);


  useEffect(() => {
    console.log('useEffect running');
    fetchTab();
  }, [fetchTab]);
  // Return the context value
  return (
    <DisciplinesContext.Provider value={{
      disciplines,
      folders,
      disc,
      setDisc,
      page,
      setPage,
      forms,
      toggleAddForm: () => toggleForm('addForm'),
      toggleEditForm: () => toggleForm('editForm'),
      toggleAddFolderForm: () => toggleForm('addFolderForm'),
      toggleEditFolderForm: () => toggleForm('editFolderForm'),
      toggleSettingsForm: () => toggleForm('settingsForm'),
      handleSetDiscipline,
      handleAddDiscipline,
      handleEditDiscipline,
      handleDeleteDiscipline,
      handleAddFolder,
      handleEditFolder,
      handleDeleteFolder,
    }}>
      {children}
    </DisciplinesContext.Provider>
  );
};

export const useDisciplines = () => {
  const context = useContext(DisciplinesContext);
  if (!context) {
    throw new Error('useDisciplines must be used within a DisciplinesProvider');
  }
  return context;
};