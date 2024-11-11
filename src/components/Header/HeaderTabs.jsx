import DisciplineButton from './DisciplineButton';
import Button from '../Button';

export default function HeaderTabs({ disciplines, discipline_id, onSetDiscipline, onDeleteDiscipline, onToggleEditForm, onToggleAddForm, onToggleSettingsForm }) {
  return (
    <div className="headerTabs">
      <div className="headerBtnOuterOption">
        <Button
          buttonClass="headerBtnOption"
          buttonClick={() => onToggleSettingsForm()}
          buttonName=""
        />
      </div>
      {disciplines.map(discipline => (
        <DisciplineButton
          key={discipline.discipline_id}
          discipline={discipline}
          isActive={discipline_id === discipline.discipline_id}
          onDelete={() => onDeleteDiscipline(discipline.discipline_id)}
          onEdit={onToggleEditForm}
          onClick={() => onSetDiscipline(discipline)}
        />
      ))}
      <div className="headerBtnOuterPlus">

        <Button
          buttonClass="headerBtnPlus"
          buttonClick={onToggleAddForm}
          buttonName="+"
        />
      </div>
    </div>
  );
}
