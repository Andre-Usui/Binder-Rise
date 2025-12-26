import DisciplineButton from './DisciplineButton';
import FolderButton from './FolderButton';
import Button from '../Button';
import { useDisciplines } from '../../DisciplinesContext';
import { tabsContainer, tabBtnOuterSettings, tabBtnSettings, tabBtnOuterAddFolder, tabBtnAddFolder, tabBtnOuterAddDis, tabBtnAddDis, } from './tabsTailwind';

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
  /*
    console.log("folders is: ", folders);
    console.log("disc is: ", disc);
    console.log("disciplines is: ", disciplines);
  */
  return (
    <div id="headerTabs"
      className={tabsContainer}
    >
      <div id="tabBtnOuterSettings"
        className={tabBtnOuterSettings}
      >
        <Button
          buttonClass={tabBtnSettings}
          buttonClick={toggleSettingsForm}
          buttonName=""
        />
      </div>
      {folders == undefined ? '' : folders.map(folder => (
        <FolderButton
          key={folder.folder_id}
          folder={folder}
          isActive={folder === folder.folder_id}
          onDelete={() => handleDeleteFolder(folder.folder_id)}
          onEdit={toggleEditFolderForm}
          onClick={() => handleSetFolder(folder)}
        />
      ))}

      <div id="tabBtnOuterAddFolder"
        className={tabBtnOuterAddFolder}
      >
        <Button
          buttonClass={tabBtnAddFolder}
          buttonClick={toggleAddFolderForm}
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
      <div className={tabBtnOuterAddDis}
       >

        <Button
          buttonClass={tabBtnAddDis}
          buttonClick={toggleAddForm}
          buttonName="+"
        />
      </div>

    </div>
  );
}
