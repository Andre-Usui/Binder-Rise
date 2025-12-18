export default function Option({ value, name, selected }) {

  return (
    <>
      <option className="option" style={{ backgroundColor: value }} defaultValue={selected}
        value={value}
      >
        {name}
      </option>
    </>
  )
}