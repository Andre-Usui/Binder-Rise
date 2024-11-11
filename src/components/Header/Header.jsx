import Settings from '../Settings/Settings';
import HeaderTabs from './HeaderTabs';
import AddDisciplineForm from './AddDisciplineForm';
import EditDisciplineForm from './EditDisciplineForm';
import { useDisciplines } from './hooks/useDisciplines';

function Header({ setDiscipline, setPage, discipline, discipline_id }) {
  const { disciplines, addForm, editForm, settingsForm, toggleAddForm, toggleEditForm, toggleSettingsForm, handleAddDiscipline, handleEditDiscipline, handleDeleteDiscipline, handleSetDiscipline } = useDisciplines({ setDiscipline, setPage });

  return (
    <div className="headerBox">
      <h1>Binder Rise</h1>
      <HeaderTabs
        disciplines={disciplines}
        discipline_id={discipline_id}
        onSetDiscipline={handleSetDiscipline}
        onDeleteDiscipline={handleDeleteDiscipline}
        onToggleEditForm={toggleEditForm}
        onToggleAddForm={toggleAddForm}
        onToggleSettingsForm={toggleSettingsForm}
      />
      <div className="headerDivisor"></div>
      {settingsForm && <Settings />}
      {addForm && <AddDisciplineForm handle={handleAddDiscipline} />}
      {editForm && <EditDisciplineForm discipline={discipline} handle={handleEditDiscipline} />}
    </div>
  );
}

export default Header;