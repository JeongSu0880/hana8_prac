import { useImperativeHandle, type RefObject } from 'react';
import type { LoginUser } from '../App';
import Button from './ui/Button';

type Prop = {
  loginUser: LoginUser;
  logout: () => void;
  ref: RefObject<ProfileHandler | null>
};

export type ProfileHandler = {
  showLoginUser: () => void
  logout: () => void
}

export default function Profile({ loginUser, logout, ref }: Prop) {
  const showLoginUser = () => {
    alert(loginUser.name)
  }

  const profileHandler = {
    showLoginUser,
    logout
  }

  useImperativeHandle(ref, () => profileHandler);
  //함수를 바깥쪽에 전달하는 유일한 방법
  //근데 왜 ref를 만들어??????

  return (
    <>
      <h1 className='text-2xl'>LoginUser: {loginUser.name}</h1>
      <Button
        onClick={logout}
        className='bg-red-600 text-white hover:bg-red-300'
      >
        LogOut
      </Button>
      <Button onClick={showLoginUser}></Button>
    </>
  );
}
