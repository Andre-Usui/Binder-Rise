import { useRef } from 'react';
import Option from './Option.jsx';

export default function Select({ arrayList, name, form, className, onChange }) {

  const formRefs = useRef({});

  const handleFocus = (field) => {
    formRefs.current[field]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest"
    });
  };

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
      ref={(el) => (formRefs.current[name] = el)}
      onFocus={() => handleFocus(name)}
      required
    >
      {optionList}
    </select>

  )
}