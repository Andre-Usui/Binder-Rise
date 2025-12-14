import { DbContext } from '../../DbContext.jsx'
import { useContext } from 'react';
import Button from '../Button.jsx';


export default function Download() {

  const {
    downloadJSON
  } = useContext(DbContext);


  const handleDownload = async () => {

    await downloadJSON();

  }

  return (
    <Button
      buttonClass="settingsButton"
      buttonName="Download Binder's JSON"
      buttonClick={handleDownload}
    />
  )
}