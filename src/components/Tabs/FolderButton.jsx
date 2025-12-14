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