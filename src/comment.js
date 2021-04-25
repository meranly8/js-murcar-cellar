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
}