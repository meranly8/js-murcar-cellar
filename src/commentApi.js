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

    static fetchFilteredComments(wines) {
        wines.map(wine => {
            fetch(`${WineApi.winesURL}/${wine.id}`)
            .then(resp => resp.json())
            .then(json => {
                const comments = json["included"]
                comments.map(comment => {
                    const c = new Comment({id: comment.id, ...comment.attributes})
                    c.addToWineCommentDiv()
                })
            })
        })
    }

    static createComment(comment) {
        const formData = {
            name: comment.name,
            comment: comment.comment,
            wine_id: comment.wine_id
        }

        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(formData)
        }
        
        fetch(this.commentsURL, configObj)
        .then(resp => resp.json())
        .then(commentJson => {
            const comment = commentJson["data"]
            const c = new Comment({id: comment.id, ...comment.attributes})
            c.addToWineCommentDiv()
        })
    }

    static deleteComment(id) {
        const configObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        }

        fetch(`${this.commentsURL}/${id}`, configObj)
        .then(resp => resp.json())
        .then(commentJson => alert(commentJson.message))
    }
}