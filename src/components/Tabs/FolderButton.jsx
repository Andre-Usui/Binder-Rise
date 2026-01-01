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
      <div className="
          h-[3.4rem] min-w-[3.4rem]
          bg-main-4
          flex items-end justify-self-end
          ml-[-0.7rem] mr-4
          px-[0.2rem]
          z-1
          lg:h-[2.1rem]
          sm:h-[2.4rem]
          [clip-path:polygon(0%_100%,2%_76%,4%_51%,6%_30%,10%_10%,15%_0%,85%_0,90%_10%,94%_30%,96%_51%,98%_76%,100%_100%)]"
        style={folder.style2}>
        <Button
          buttonClass="
            h-[3rem] min-w-[3rem]
            px-4
            bg-main-3 bg-cover bg-center
            border-none cursor-pointer
            lg:h-[1.8rem] lg:text-[0.9rem]
            sm:h-[2.1rem]
            [clip-path:polygon(0%_100%,2%_76%,4%_51%,6%_30%,10%_10%,15%_0%,85%_0,90%_10%,94%_30%,96%_51%,98%_76%,100%_100%)]"
          buttonClick={handleSetExpand}
          buttonName={folder.name}
          style={folder.style}
        />
      </div>
    </div>
  );
}

export default FolderButton;