import { useActionState, useOptimistic, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Spinner from './ui/Spinner';

type Post = { id: number; title: string, userId: number }
const searchPost = (userId: string): Promise<Post[]> => // 만약 여기서 리턴타입을 안줬다?????? 그럼 any가 된다. (any를 보면 타입을 잡아야하는거누나!)
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=5`)
        .then((res) => res.json())
export default function Posts() {
    const [state, setState] = useState('')
    const [optiState, setOptiState] = useOptimistic(state) // 이 state 인자의 의미? Optimistic은 trasition이 끝나면 항상 이 초기화 값으로 바꾼다.
    // const [posts, search, isPending] = useActionState<Post[], FormData>(
    //     async (_posts, formData) => {
    //         const userId = formData.get('userId') as string
    //         setState(userId) // 이게 바로 바뀌지 않을 것임. 왜냐?> searchPost만 비동기 임에도 action이 한 transition으로 단위로 처리한다는 것. 그래서 그 단위 동작이 다 끝날때까지 state가 바뀌지 않음. 그럼 어뜨카냐?
    //         setOptiState(userId) // 그래서 ㅓ존재하는게 useOptimistic임. 바로 바뀔 수 있어. !

    //         // 한 transition이라는 것은 취소 가능한 단위를 말하는 것이기도 함. 에러가 나면 취소할 수 잇어! -> 그럼 만약에 여기서 fetch가 실패하면 react에서 알아서 화면을 돌려 (?) 주나?
    //         return searchPost(userId)
    //     }, []) // 여기서 ! searchPost의 반환값도 promise일텐데 await을 안해줘도 되는 이유? react transition안에서 이걸 다 처리해서 상태에 넣어준다 (?) 완전 맞는 설명인지는 모르겠음.

    const [posts, setPosts] = useState<Post[]>([])
    const [isPending, setPending] = useState(false)
    const outTransition = async (formData: FormData) => {
        const userId = formData.get('userId') as string;
        if (!userId) return
        setState(userId)
        setOptiState(userId)
        setPending(true)
        const posts = await searchPost(userId)
        setPending(false)
        setOptiState(userId)
        setPosts(posts)
    }
    //이번에는 그냥 actionㅇ르 사용했을 때. 
    // 한개의 trasition이 되기 하지만, 어떠한 경우에는 react가 임의로 나눌 수 있다
    return (
        <div>
            <h1>Posts</h1>
            {/* <form action={search}> */}
            <form action={outTransition}>
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