export default function Button(props) {
  return (

    <button
      className={props.buttonClass}
      onClick={props.buttonClick}
      style={props.style}
      value={props.buttonName}
    >
      {props.buttonName}
    </button>

  )
}