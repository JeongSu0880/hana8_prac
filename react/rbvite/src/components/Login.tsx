import { useEffect, useImperativeHandle, useRef, type FormEvent } from 'react';
import { useSession } from '../hooks/SessionContext';
import Button from './ui/Button';
import LabelInput from './ui/LabelInput';

export type LoginHandler = {
  validate: () => void;
  focusName: () => void;
};

export default function Login() {
  const { login, loginHandlerRef: ref } = useSession();
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    validate() {
      if (!nameRef.current?.value) {
        alert('Input the name!');
        nameRef.current?.focus();
        return false;
      }

      if (!ageRef.current?.value) {
        alert('Input the age!');
        ageRef.current?.focus();
        return false;
      }

      return true;
    },

    focusName() {
      nameRef.current?.focus();
    },
  }));

  const makeLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (nameRef.current?.value && ageRef.current?.value)
    login(nameRef.current?.value ?? '', Number(ageRef.current?.value));
  };


  //비동기
  useEffect(() => {//마운트 시점에 호출
    alert('Login plz....')
    nameRef.current?.focus();

    return () => alert('Login success!') //언마운트 시점에 호출
  }, []);

  //DOM을 가볍게 유지해야하기 위해 사용됙지 않는 돔은 언마운트를 시킴.
  //그런데, 리액트 19에서 새로 나온 Activity는 돔을 언마운트 시키지 않음.

  return (
    <div className='border border-red-300 p-3 rounded-lg'>
      <h1 className='text-2xl text-center font-medium'>Login</h1>
      <form onSubmit={makeLogin} className='space-y-3'>
        <LabelInput label='Name' ref={nameRef} />
        <LabelInput
          type='number'
          ref={ageRef}
          // onChange={(e) => setAge(+e.target.value)}
          placeholder='Age...'
        />
        {/* <div>
          <label htmlFor='age' className='text-sm text-gray-600'>
            Age
          </label>
          <input
            type='number'
            id='age'
            ref={ageRef}
            // onChange={(e) => setAge(+e.target.value)}
            placeholder='user name...'
            className='w-full'
            required
          />
        </div> */}

        <div className='text-center'>
          <button type='reset'>Cancel</button>
          <Button
            // type='submit'
            // onClick={() => login(name, age)}
            className='bg-blue-500 text-white hover:bg-blue-600'
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}
