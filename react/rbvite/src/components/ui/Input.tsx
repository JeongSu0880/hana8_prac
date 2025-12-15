import { useState } from 'react';

type Prop = {
  name?: string;
  nameClass?: string;
  inputClass?: string;
  setValue: (v: string) => void;
};

export default function Input({ name, nameClass, inputClass, setValue }: Prop) {
  const [value] = useState('');

  return (
    <div className='flex flex-col text-center pb-3'>
      <span className={nameClass}>{name || ''}</span>
      <input
        className={inputClass}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></input>
    </div>
  );
}
