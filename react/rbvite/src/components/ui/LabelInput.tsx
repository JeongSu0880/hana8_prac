import { useId, type ChangeEvent } from 'react';

type Props = {
    type?: string;
    label?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    placeholder?: string;
}

export default function LabelInput({ type, label, onChange, className, placeholder }: Props) {
    const inputId = useId();
    return (
        <div>
            {label && <label htmlFor={inputId} className='text-sm text-gray-500'>
                {label}
            </label>}
            <input
                type={type || 'text'}
                id={inputId}
                placeholder={placeholder}
                className={`w-full ${className}`}
                onChange={onChange} //값이 하나도 없을때는 NAN
                required
            ></input>
        </div>
    )
}