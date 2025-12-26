import Button from '../Button';
import { tabDisContainer, tabDisBtnDelete, tabDisBtnEdit, tabDisOuterBtn, tabDisBtn } from './tabsTailwind.js';

function DisciplineButton({ discipline, isActive, onClick, onEdit, onDelete }) {
  return (
    <div className="headerBtnClip">
      {isActive && (
        <div className={tabDisContainer}>
          <Button
            buttonClass={tabDisBtnDelete}
            buttonClick={onDelete}
            buttonName=""
          />
          <Button
            buttonClass={tabDisBtnEdit}
            buttonClick={onEdit}
            buttonName=""
          />
        </div>
      )}
      <div className={tabDisOuterBtn}
        style={discipline.style2}>
        <Button
          buttonClass={tabDisBtn}
          buttonClick={onClick}
          buttonName={discipline.discipline_name}
          style={discipline.style}
        />
      </div>
    </div>
  );
}

export default DisciplineButton;