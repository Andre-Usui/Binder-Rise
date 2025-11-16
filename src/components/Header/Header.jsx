import Settings from '../Settings/Settings';
import HeaderTabs from './HeaderTabs';
import AddDisciplineForm from './AddDisciplineForm';
import EditDisciplineForm from './EditDisciplineForm';
import AddFolderForm from './AddFolderForm';
import EditFolderForm from './EditFolderForm';
import { useDisciplines } from '../../DisciplinesContext';
import { AnimatePresence, motion } from 'motion/react';
import { useContext } from 'react';
import './header.css';

function Header() {
  const {
    disc,
    disciplines,
    folders,
    addForm,
    editForm,
    addFolderForm,
    editFolderForm,
    settingsForm,
    toggleAddForm,
    toggleEditForm,
    toggleSettingsForm,
    handleAddDiscipline,
    handleEditDiscipline,
    toggleAddFolderForm,
    toggleEditFolderForm,
    handleDeleteDiscipline,
    handleSetFolder,
    handleAddFolder,
    handleEditFolder,
    handleDeleteFolder,
    handleSetDiscipline
  } = useDisciplines();

  const variants = {
    enter: {
      opacity: .3,
      height: 0,
    },
    center: {
      opacity: 1,
      height: "auto",
    },
    exit: {
      opacity: .3,
      height: 0,
    },
  };

  return (
    <div className="headerBox">
      <h1>Binder Rise</h1>
      <HeaderTabs
        disciplines={disciplines}
        folders={folders}
        onSetFolder={handleSetFolder}
        onDeleteFolder={handleDeleteFolder}
        onSetDiscipline={handleSetDiscipline}
        onDeleteDiscipline={handleDeleteDiscipline}
        onToggleEditForm={toggleEditForm}
        onToggleAddForm={toggleAddForm}
        onToggleEditFolderForm={toggleEditFolderForm}
        onToggleAddFolderForm={toggleAddFolderForm}
        onToggleSettingsForm={toggleSettingsForm}
      />
      <div className="headerDivisor"></div>
      <AnimatePresence mode="sync">
        {settingsForm && (
          <motion.div
            key="settingsForm"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <Settings handle={toggleSettingsForm} />
          </motion.div>
        )}

        {addForm && (
          <motion.div
            key="addForm"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <AddDisciplineForm handle={handleAddDiscipline} />
          </motion.div>
        )}

        {editForm && (
          <motion.div
            key="editForm"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <EditDisciplineForm
              discipline={disc}
              handle={handleEditDiscipline}
            />
          </motion.div>
        )}

        {addFolderForm && (
          <motion.div
            key="addFolderForm"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <AddFolderForm
              handle={handleAddFolder}
            />
          </motion.div>
        )}

        {editFolderForm && (
          <motion.div
            key="editFolderForm"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <EditFolderForm
              folder={folder}
              handle={handleEditFolder}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Header;