import { DbContext } from '../../DbContext.jsx'
import { useContext, useState } from 'react';
import Button from '../Button.jsx';
import { settingsButton } from './settingsTailwind.js';


export default function Upload() {

  const {
    uploadJSON
  } = useContext(DbContext);

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const jsonData = JSON.parse(event.target.result);
      console.log(jsonData);

      const validatedData = validateData(jsonData);

      await uploadJSON(validatedData);
      window.location.reload();
    };
    reader.readAsText(file);
  };

  const validateData = (jsonData) => {
    if (!Array.isArray(jsonData.disciplines) || !Array.isArray(jsonData.posts)) {
      throw new Error("Formato de JSON inválido.");
    }
    return jsonData;
  };

  return (
    <>
      <input className={settingsButton} type="file" onChange={handleFileChange} accept=".json" />
      <Button
        buttonClass={settingsButton}
        buttonName="Upload Binder's JSON"
        buttonClick={handleUpload}
      />
    </>
  )
}