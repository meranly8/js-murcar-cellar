class Comment {
    static all = []

    constructor({id, name, comment, wine_id, created_at}) {
        this.id = id
        this.name = name
        this.comment = comment
        this.wine_id = wine_id
        this.created_at = created_at

        this.p = document.createElement("p")
        this.p.id = `comment-${id}`
        this.p.dataset.id = wine_id

        Comment.all.push(this)
    }

    addToWineCommentDiv() {
        const commentDiv = document.querySelector(`#wine-${this.wine_id}-comments`)
        commentDiv.append(this.renderCommentP())
    }

    renderCommentP() {
        this.p.innerHTML = `
            Created: ${this.created_at}<br>
            Name: ${this.name}<br>
            Comment: ${this.comment}<br>
        `
        return this.p
    }

    renderCommentForm() {
        const commentForm = document.querySelector(`#add-cmt-wine-${this.wine_id}`)
        commentForm.innerHTML = `
        <br>
        <label>
            Name: <input type="text" name="comment-name" id="comment-name-${this.wine_id}">
        </label><br>
        <label>
            Comment: <textarea name="comment-comment" id="comment-comment-${this.wine_id}"></textarea>
        </label>
        <input type="hidden" name="comment-wine_id" value="${this.wine_id}"><br>
        <input type="submit" value="Create Comment">
        `
        commentForm.addEventListener('submit', this.handleNewCommentSubmit)
    }

    handleNewCommentSubmit = () => {
        debugger
    }
}