export default function HelpItem(props) {

  return (
    <>
      <div className="helpItem">
        <h1>{props.title}</h1>
        <p>{props.description}</p>
        <ul>
          {props.ul.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <img src={props.srcImg} alt={props.altImg} />
      </div>
    </>  )
}