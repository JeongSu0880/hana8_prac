import { useState } from 'react';
import Button from "./ui/Button"
import type { LoginFunction } from '../App';

type Props = {
    login: LoginFunction;
}

export default function Login({ login }: Props) {
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);

    return (
        <div className='border border-red-300 p-3 rounded-lg'>
            <h1 className="text-2xl text-center font-medium">Login</h1>
            <form className='space-y-3'>
                <div>
                    <label htmlFor='name' className='text-sm text-gray-500'>
                        Name
                    </label>
                    <input
                        type='text'
                        id='name'
                        placeholder='user name..'
                        className='w-full'
                        onChange={e => setName(e.target.value)}
                        required
                    >
                    </input>
                </div>
                <div>
                    <label htmlFor='age' className='text-sm text-gray-500'>
                        Age
                    </label>
                    <input
                        type='text'
                        id='age'
                        placeholder='user age..'
                        className='w-full'
                        onChange={e => setAge(+e.target.value)} //값이 하나도 없을때는 NAN
                        required
                    >
                    </input>
                </div>

                <Button onClick={() => login(name, age)} className='bg-sky-500 hover:bg-sky-300 text-white'>Login</Button>
            </form>
        </div>
    )
}


// <div>
//         <div className='flex space-x-10'>
//             <Input name="이름" nameClass='text-2xl text-gray-500 pb-2' inputClass='bg-white border-2 border-gray-200 rounded-md h-10' setValue={setSession} />
//             <Input name="나이" nameClass='text-2xl text-gray-500 pb-2' inputClass='bg-white border-2 border-gray-200 rounded-md h-10' setValue={setSession} />
//         </div>
//         <div>
//             <Button className='w-full h-10 bg-gray-50 border-amber-50 hover:bg-gray-300'>Sign in</Button>
//         </div>
//     </div>

