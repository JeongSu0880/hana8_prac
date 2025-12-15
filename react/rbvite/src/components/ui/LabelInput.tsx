import { useId, type RefObject } from 'react';

type Props = {
    type?: string;
    label?: string;
    ref?: RefObject<HTMLInputElement | null>
    // onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    placeholder?: string;
    defaultValue?: string
    required?: boolean
}

export default function LabelInput({ type, label, ref, className, placeholder, defaultValue, required }: Props) {
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
                ref={ref}
                defaultValue={defaultValue}
                // onChange={onChange} //값이 하나도 없을때는 NAN
                required={required}
            ></input>
        </div>
    )
}