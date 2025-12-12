import type { Session } from "../App"
import Button from "./ui/Button"
import Input from "./ui/Input"

export default function Login({ setSession }: {
    setSession: (s: Session) => void
}) {
    return <div>
        <div className='flex space-x-10'>
            <Input name="이름" nameClass='text-2xl text-gray-500 pb-2' inputClass='bg-white border-2 border-gray-200 rounded-md h-10' setValue={setSession} />
            <Input name="나이" nameClass='text-2xl text-gray-500 pb-2' inputClass='bg-white border-2 border-gray-200 rounded-md h-10' setValue={setSession} />
        </div>
        <div>
            <Button className='w-full h-10 bg-gray-50 border-amber-50 hover:bg-gray-300'>Sign in</Button>
        </div>
    </div>
}