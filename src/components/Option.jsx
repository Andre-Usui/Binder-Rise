export default function Option({ value, name }) {

  return (
    <>
      <option className="option" style={{backgroundColor: value}}
        value={value}
      >
        {name}
      </option>
    </>
  )
}