import { useRef } from 'react';
import Option from './Option.jsx';

export default function Select({ arrayList, name, form, className, onChange, stateColor, id }) {

  const formRefs = useRef({});

  const handleFocus = (field) => {
    formRefs.current[field]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest"
    });
  };

  const optionList = arrayList.map(item => {
    var selected = false;
    if (stateColor === item.value) {
      selected = true;
    }
    return (
      <Option
        key={item.name + "key"}
        value={item.value}
        name={item.name}
        selected={selected}
      />
    )
  })

  return (

    <select
      id={id}
      name={name}
      form={form}
      className={className}
      onChange={onChange}
      ref={(el) => (formRefs.current[name] = el)}
      onFocus={() => handleFocus(name)}
      required
    >
      {optionList}
    </select>

  )
}