import Button from '../Button';

function DisciplineButton({ discipline, isActive, onClick, onEdit, onDelete }) {
  return (
    <div className="headerBtnClip">
      {isActive && (
        <div className="    
        flex flex-row-reverse items-center
        relative h-4
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
        h-[2.7rem] min-w-[3.3rem]
        bg-main-4
        flex items-end
        ml-4
        px-[0.3rem]
        whitespace-nowrap
        [clip-path:polygon(0%_100%,2%_76%,4%_51%,6%_30%,10%_10%,15%_0%,85%_0,90%_10%,94%_30%,96%_51%,98%_76%,100%_100%)]
        lg:h-[1.8rem]"
        style={discipline.style2}>
        <Button
          buttonClass="    
          h-[2.2rem] min-w-[3rem]
          px-[3rem] pr-[4rem]
          bg-main-3
          border-none
          cursor-pointer
          font-bold
          font-main-1
          text-[1.3rem]
          [clip-path:polygon(0%_100%,2%_76%,4%_51%,6%_30%,10%_10%,15%_0%,85%_0,90%_10%,94%_30%,96%_51%,98%_76%,100%_100%)]
          lg:h-[1.5rem] lg:text-[0.9rem]"
          buttonClick={onClick}
          buttonName={discipline.discipline_name}
          style={discipline.style}
        />
      </div>
    </div>
  );
}

export default DisciplineButton;