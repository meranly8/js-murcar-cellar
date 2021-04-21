class CommentApi {
    static commentsURL = "http://localhost:3000/comments"

    static fetchComments() {
        fetch(this.commentsURL)
        .then(resp => resp.json())
        .then(jsonComments => {
            console.log(jsonComments)
        })
    }
}