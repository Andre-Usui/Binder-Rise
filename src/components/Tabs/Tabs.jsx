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
    <div id="headerTabs"
      className="
        h-20 max-w-full
        flex flex-nowrap items-end
        pl-28
        overflow-x-auto
        z-3
        lg:overflow-y-hidden"
    >
      <div id="headerBtnOuterOption"
        className="
        h-[2.7rem] w-[3.7rem]
        bg-main-4
        flex items-center justify-center
        absolute left-0
        px-[0.3rem] pr-[0.2rem]
        z-5
        [clip-path:polygon(0%_100%,0%_0%,60%_0%,78%_9%,84%_15%,94%_31%,96%_51%,98%_76%,100%_100%)]
        lg:h-12"
      >
        <Button
          buttonClass="    
            h-8 w-8
            bg-[url(/options-icon.svg)]
            bg-cover bg-center
            rounded-full
            border-none
            cursor-pointer
            text-main-3"
          buttonClick={() => toggleSettingsForm()}
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

      <div id="headerBtnOuterFolder"
        className="
          h-12 w-16
          bg-main-4
          flex items-end
          ml-[-8]
          px-[0.5rem] py-[0.2rem]
          whitespace-nowrap
          [clip-path:polygon(0%_100%,2%_76%,4%_51%,6%_37%,10%_25%,15%_20%,55%_20%,60%_18%,62%_15%,64%_5%,66%_0%,90%_0%,91%_2%,93%_5%,94%_10%,98%_86%,100%_100%)]
          "
      >
        <Button
          buttonClass="
          h-8 w-12
          px-2
          bg-[url(/folder-icon.svg)]
          bg-main-3 bg-center
          border-none
          cursor-pointer
          font-bold
          font-main-font-1
          text-[1.7rem]
          font-bold
          [clip-path:polygon(0%_100%,2%_76%,4%_51%,6%_37%,10%_25%,15%_20%,55%_20%,60%_18%,62%_15%,64%_5%,66%_0%,90%_0%,91%_2%,93%_5%,94%_10%,98%_86%,100%_100%)]
  "
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
      <div className="
        h-[3.4rem] min-w-[3.4rem]
        bg-main-4
        flex items-end
        justify-self-end
        ml-[-1rem] mr-[5rem]
        px-[0.5rem] 
        [clip-path:polygon(0%_100%,4%_76%,8%_51%,16%_25%,32%_13%,40%_10%,60%_10%,68%_13%,84%_25%,92%_51%,96%_76%,100%_100%)]
      ">

        <Button
          buttonClass="
            h-[3rem] min-w-[3rem]
            px-4
            bg-main-3
            border-none
            cursor-pointer
            font-bold
            font-main-font-1
            text-[1.7rem]
            [clip-path:polygon(0%_100%,4%_76%,8%_51%,16%_25%,32%_13%,40%_10%,60%_10%,68%_13%,84%_25%,92%_51%,96%_76%,100%_100%)]
          "
          buttonClick={toggleAddForm}
          buttonName="+"
        />
      </div>

    </div>
  );
}
