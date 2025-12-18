import Button from '../Button';
import { useState } from 'react';

function FolderButton({ folder, onEdit, onDelete }) {
  const [expand, setExpand] = useState(false);
  function handleSetExpand() {
    setExpand(!expand);
    console.log("setExpanded: ", expand)
  }
  return (
    <div className="headerBtnClip">
      {expand && (
        <div className=" 
        flex flex-row-reverse items-center
        relative
        h-4
        right-[1.1rem] top-[0.2rem]
        gap-[0.2rem]
        overflow-visible">
          <Button
            buttonClass="    
              h-[1.3rem] w-[1.3rem]
              bg-[url(/trash-icon.svg)]
              bg-cover bg-center
              border-none
              cursor-pointer
              lg:h-[1.5rem] lg:w-[1.5rem]"
            buttonClick={onDelete}
            buttonName=""
          />
          <Button
            buttonClass="    
              h-[1.3rem] w-[1.3rem]
              bg-[url(/edit-icon.svg)]
              bg-cover bg-center
              border-none
              cursor-pointer
              lg:h-[1.5rem] lg:w-[1.5rem]"
            buttonClick={onEdit}
            buttonName=""
          />

        </div>
      )}
      <div className="headerFolderBtnOuter" style={folder.style2}>
        <Button
          buttonClass="headerFolderBtn"
          buttonClick={handleSetExpand}
          buttonName={folder.name}
          style={folder.style}
        />
      </div>
    </div>
  );
}

export default FolderButton;