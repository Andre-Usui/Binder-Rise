import Settings from '../Settings/Settings';
import Tabs from '../Tabs/Tabs';
import AddDisciplineForm from '../Tabs/AddDisciplineForm';
import EditDisciplineForm from '../Tabs/EditDisciplineForm';
import AddFolderForm from '../Tabs/AddFolderForm';
import EditFolderForm from '../Tabs/EditFolderForm';
import { useDisciplines } from '../../DisciplinesContext';
import { AnimatePresence, motion } from 'motion/react';
import './header.css';

function Header() {
  const {
    disc,
    disciplines,
    folders,
    forms,
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
      <Tabs
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
        {forms.settingsForm && (
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

        {forms.addForm && (
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

        {forms.editForm && (
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

        {forms.addFolderForm && (
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

        {forms.editFolderForm && (
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
              folder={folders}
              handle={handleEditFolder}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Header;