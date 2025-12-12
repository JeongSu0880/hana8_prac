import { useEffect, useRef, type FormEvent } from 'react';
import type { LoginFunction } from '../App';
import LabelInput from './ui/LabelInput';

type Props = {
    login: LoginFunction;
};

export default function Login({ login }: Props) {
    // const [name, setName] = useState('');
    // const [age, setAge] = useState(0);
    // console.log(`name ${name} age ${age}`)
    //입력할때 보면 이게 한 글자글자마다 엄청 출력됨. 
    // 상태를 변경할 때마다 재실행되고 있다는 것을 의미해
    // 너무너무 낭비야. 
    // 그래서 불필요한 실행을 안하기 위해 상태 변경을 숨기는 (주솟값을 변경하지 않는) 것이 useRef
    //모든 dom은 ref를 받을 수 있어요. virtualdom의 dom이니 때문이죠.

    //react의 철학 :연결이 끊어져도 브라우저만 있으면 돌아가게 하겠다!

    const ageRef = useRef<HTMLInputElement>(null);// Dom을 참조하면 반드시 초깃값이 null 왜냐면 그리기 전이니까 앙ㄱ
    const nameRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        if (nameRef.current) nameRef.current.focus();
    }, []); //왜 이거 넣은거지?

    const makeLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 뭐라고 아웅와아오
        if (nameRef.current?.value && ageRef.current?.value)
            login(nameRef.current.value, Number(ageRef.current?.value));
    }
    return (
        <div className='border border-red-300 p-3 rounded-lg'>
            <h1 className='text-2xl text-center font-medium'>Login</h1>
            <form onSubmit={makeLogin} className='space-y-3'>
                <LabelInput label='Name' ref={nameRef} placeholder='name...'></LabelInput>
                <LabelInput type='number' label='Age' ref={ageRef} placeholder='age...'></LabelInput>
                <div className=''>
                    <button type='reset'>Cancel</button>
                    <button type='submit'>Submit</button>
                    {/* <Button
                        onClick={() => login(name, age)}
                        className='bg-sky-500 hover:bg-sky-300 text-white'
                    >
                        Login
                    </Button> */}
                </div>
            </form>
        </div>
    );
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



{/* <div>
                    <label htmlFor='name' className='text-sm text-gray-500'>
                        Name
                    </label>
                    <input
                        type='text'
                        id='name'
                        placeholder='user name..'
                        className='w-full'
                        // ref={ageRef}
                        onChange={(e) => setName(e.target.value)}
                        required
                    ></input>
                </div> */}
{/* <div>
                    <label htmlFor='age' className='text-sm text-gray-500'>
                        Age
                    </label>
                    <input
                        type='text'
                        id='age'
                        placeholder='user age..'
                        className='w-full'
                        ref={ageRef}
                        // onChange={(e) => setAge(+e.target.value)} //값이 하나도 없을때는 NAN
                        required
                    ></input>
                </div> */}
