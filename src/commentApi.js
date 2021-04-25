class CommentApi {
    static commentsURL = "http://localhost:3000/comments"

    static fetchComments() {
        fetch(this.commentsURL)
        .then(resp => resp.json())
        .then(jsonComments => {
            const comments = jsonComments["data"]
            comments.map(comment => {
                const c = new Comment({id: comment.id, ...comment.attributes})
                c.addToWineCommentDiv()
            })
        })
    }
}