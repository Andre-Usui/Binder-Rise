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
    folders,
    forms,
    toggleSettingsForm,
    handleAddDiscipline,
    handleEditDiscipline,
    handleAddFolder,
    handleEditFolder,
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
    <div id="headerBox"
      className="
        h-60 w-full grid grid-cols-auto justify-between overflow-visible 
        relative border-box bg-main-2 bg-waves-2 bg-repeat"
    >
      <h1
      className="pl-16 pt-12 text-main-4 text-[6rem] font-main-2 z-1 font-extrabold"
      >Binder Rise</h1>
      <Tabs />
      <div id="headerDivisor" className="bg-main-4 h-2 w-screen"></div>
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