export default function Button(props) {

  function disabledHandler(e) {
    e.preventDefault();
  }

  return (
    <button
      className={props.buttonClass}
      onClick={props.disabledCheck ? (e) => disabledHandler(e) : props.buttonClick}
      style={props.style}
      value={props.buttonName}

    >
      {props.buttonName}
    </button>

  )
}