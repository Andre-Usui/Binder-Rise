import DisciplineButton from './DisciplineButton';
import FolderButton from './FolderButton';
import Button from '../Button';
import { useDisciplines } from '../../DisciplinesContext';
import './tabs.css';


export default function Tabs() {

  const {
    disc,
    disciplines,
    folders,
    toggleAddForm,
    toggleEditForm,
    toggleSettingsForm,
    toggleAddFolderForm,
    toggleEditFolderForm,
    handleSetDiscipline,
    handleDeleteDiscipline,
    handleSetFolder,
    handleDeleteFolder,
  } = useDisciplines();

  console.log("folders is: ", folders);
  console.log("disc is: ", disc);
  console.log("disciplines is: ", disciplines);
  
  return (
    <div className="headerTabs">
      <div className="headerBtnOuterOption">
        <Button
          buttonClass="headerBtnOption"
          buttonClick={() => toggleSettingsForm()}
          buttonName=""
        />
      </div>
      {folders == undefined ? '' : folders.map(folder => (
        <FolderButton
          key={folder.folder}
          folder={folder}
          isActive={folder === folder.folder_id}
          onDelete={() => handleDeleteFolder(folder.folder_id)}
          onEdit={toggleEditFolderForm}
          onClick={() => handleSetFolder(folder)}
        />
      ))}

      <div className="headerBtnOuterFolder">

        <Button
          buttonClass="headerBtnFolder"
          buttonClick={() => toggleAddFolderForm()}
          buttonName=""
        />
      </div>
      {disciplines == undefined ? '' : disciplines.map(dis => (
        <DisciplineButton
          key={dis.discipline_id}
          discipline={dis}
          isActive={disc.discipline === dis.discipline_id}
          onDelete={() => handleDeleteDiscipline(dis.discipline_id)}
          onEdit={toggleEditForm}
          onClick={() => handleSetDiscipline(dis)}
        />
      ))}
      <div className="headerBtnOuterPlus">

        <Button
          buttonClass="headerBtnPlus"
          buttonClick={toggleAddForm}
          buttonName="+"
        />
      </div>

    </div>
  );
}
