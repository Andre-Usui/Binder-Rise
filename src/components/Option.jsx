export default function Option({ value, name, selected }) {

  return (
    <>
      <option className="option" style={{ backgroundColor: value }} selected={selected}
        value={value}
      >
        {name}
      </option>
    </>
  )
}