import { helpItem, helpItemTitle, helpItemParagraph, helpItemList } from './settingsTailwind.js';

export default function HelpItem(props) {

  return (
    <>
      <div className={helpItem}>
        <h1 className={helpItemTitle}>{props.title}</h1>
        <p className={helpItemParagraph}>{props.description}</p>
        <ul>
          {props.ul.map(item => (
            <li key={item} className={helpItemList}>{item}</li>
          ))}
        </ul>
        <img src={props.srcImg} alt={props.altImg} />
      </div>
    </>)
}