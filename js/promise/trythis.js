const getPosts = async (userId) => {
    const postList = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).then((value) => value.json())
    // console.log("🚀 ~ getPost ~ postList:", postList)
    const posts = [];
    Promise.all((postList) => {
        map
    }).then(async (post) => {
        console.log(post)
        const commentList = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`).then((value) => value.json())
        // console.log(commentList)
        // posts.push({ post.id: postId, })
    })
    // for (let i = 0; i < postList.length; i++) {

    // }
}

getPosts(1)