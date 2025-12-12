import Button from './ui/Button';
import Input from './ui/Input';

export default function Login() {
  return (
    <div>
      <div className='flex space-x-10'>
        <Input name='이름' className='bg-gray-200 border-gray-600' />
        <Input name='나이' className='bg-gray-200 border' />
      </div>
      <Button className='bg-amber-200 border-amber-50 hover:bg-amber-400'>
        Sign in
      </Button>
    </div>
  );
}
