export const sum = (...args: number[]) => args.reduce((acc, n) => acc + n, 0);


type User = {
    id: number,
    username: string
}
// sum.ts
export const sumId = async () => {
    const users = (await fetch('https://jsonplaceholder.typicode.com/users')
        .then(
            res => res.json()
        )) as { id: number }[];

    return users.reduce((acc, { id }) => acc + id, 0);
};

export const fetchUser = async (userId: number) => {
    const users: User = (await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(
            res => res.json()
        ))

    if (!users.id) throw new Error(`USerID not found`)
    const { id, username } = users
    return { id, username }
}