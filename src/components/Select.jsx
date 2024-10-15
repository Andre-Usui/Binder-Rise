import Option from './Option.jsx';

export default function Select({ arrayList, name, form, className, onChange }) {

  const optionList = arrayList.map(item => {
    return (
      <Option
        key={item.name + "key"}
        value={item.value}
        name={item.name}
      />
    )
  })

  return (

    <select
      name={name}
      form={form}
      className={className}
      onChange={onChange}
      required
    >
      {optionList}
    </select>

  )
}