import Button from '../Button';
import { exampleTabBox, exampleTabContainer, headerBtnFolderExp, headerBtnOuterFolderExp, headerBtnOuterExp, headerBtnExp } from './tabsFormTailwind.js';


export default function ExampleTab({ bg, alt, color, title, folder }) {


  return (
    <>

      <div className={exampleTabContainer}>
        <div className={exampleTabBox}>
          <div className={folder ? headerBtnOuterFolderExp : headerBtnOuterExp} style={{ backgroundColor: alt }}>
            <Button
              buttonClass={folder ? headerBtnFolderExp : headerBtnExp}
              buttonName={title}
              style={{ backgroundColor: bg, color: color }}
              disabledCheck={true}
            />
          </div>
        </div>

      </div>
    </>
  )
}