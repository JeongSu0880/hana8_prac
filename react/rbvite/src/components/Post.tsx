import { useActionState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Spinner from './ui/Spinner';

type Post = { id: number; title: string, userId: number }
const searchPost = (userId: string): Promise<Post[]> => // 만약 여기서 리턴타입을 안줬다?????? 그럼 any가 된다. (any를 보면 타입을 잡아야하는거누나!)
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=5`)
        .then((res) => res.json())
export default function Posts() {
    const [posts, search, isPending] = useActionState<Post[], FormData>(
        async (_posts, formData) => {
            return searchPost(formData.get('userId') as string)
        }, []) // 여기서 ! searchPost의 반환값도 promise일텐데 await을 안해줘도 되는 이유? react transition안에서 이걸 다 처리해서 상태에 넣어준다 (?) 완전 맞는 설명인지는 모르겠음.
    return (
        <div>
            <h1>Posts</h1>
            <form action={search}>
                <input type='text' name='userId' placeholder='useId...' />
                <SearchButton label='Search' inpName='userId' />
            </form>
            {isPending ? <Spinner /> :
                <ul>
                    {posts.map(({ id, title }) => <li key={id}>{id}. {title}</li>)}
                </ul>
            }
        </div>
    )
}

function SearchButton({ label = 'Search', inpName = '' }: { label: string; inpName: string }) {
    const { pending, data } = useFormStatus();
    const searchStr = data?.get(inpName)

    return <button>{pending ? 'searching...' : label}</button>
}

//1. fetch 해온 값을 어떻게 배열화해서 출력하는지 보기
//2. state 초깃값 어떻게 주시는지
//3. 아니 타입을 어디어디 정의해야해...

//useFormStatus는 언제 유용하냐!
// 이게 업으면 pending 상태를 알리기 위해 SearchButton의 속성으로 pending을 또 건네주어야 하는 불상사가 생긴다...ㅠ
// 하지만! formStatus를 쓰면 바로 접근 가능하다.