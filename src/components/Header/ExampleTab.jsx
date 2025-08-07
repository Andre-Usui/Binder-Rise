import './exampleTab.css';
import Button from '../Button';

export default function ExampleTab({ bg, alt, color, title }) {

  
  return (
    <>
      <div className="exampleTabContainer">
        <div className="exampleTabBox">
          <div className="headerBtnOuterExp" style={{ backgroundColor: alt }}>
            <Button
              buttonClass="headerBtnExp"
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