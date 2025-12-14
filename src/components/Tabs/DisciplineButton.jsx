import Button from '../Button';

function DisciplineButton({ discipline, isActive, onClick, onEdit, onDelete }) {
  return (
    <div className="headerBtnClip">
      {isActive && (
        <div className="headerBtnBox">
          <Button
            buttonClass="deleteBtn"
            buttonClick={onDelete}
            buttonName=""
          />
          <Button
            buttonClass="editBtn"
            buttonClick={onEdit}
            buttonName=""
          />
        </div>
      )}
      <div className="headerBtnOuter" style={discipline.style2}>
        <Button
          buttonClass="headerBtn"
          buttonClick={onClick}
          buttonName={discipline.discipline_name}
          style={discipline.style}
        />
      </div>
    </div>
  );
}

export default DisciplineButton;