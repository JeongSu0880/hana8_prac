function getUserIdAndName(user) {
    const { id, name } = user;

    console.log(id, name);
}

function getUserIdAndName2({ id, name }) {
    console.log(id, name);
} //요 패턴을 더 많이 쓴다.

getUserIdAndName({ id: 1, name: 'HONG', phone: '010123141521' })
getUserIdAndName2({ id: 4 })
