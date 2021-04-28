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
        this.p.className = "comment-p"

        Comment.all.push(this)
    }

    addToWineCommentDiv() {
        const commentDiv = document.querySelector(`#wine-${this.wine_id}-comments`)
        commentDiv.append(this.renderCommentP())
        this.formatCreatedAt()
    }

    renderCommentP() {
        this.p.innerHTML = `
            <b>Created:</b> <container id="comment-${this.id}-created-at">${this.created_at}</container><br>
            <b>Name:</b> ${this.name}<br>
            <b>Comment:</b> ${this.comment}
            <button id="delete-${this.id}-comment" data-id=${this.id}>Delete</button>
        `

        const deleteBtn = this.p.querySelector(`#delete-${this.id}-comment`)
        deleteBtn.addEventListener('click', this.handleCommentDelete)
        return this.p
    }

    formatCreatedAt() {
        const D = new Date(this.created_at)
        const options = {
            weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            timeZone: 'America/Chicago',
            timeZoneName: 'short'
        }
        const I = new Intl.DateTimeFormat('en-US', options).format(D)
        
        const dateTime = this.p.querySelector(`#comment-${this.id}-created-at`)
        dateTime.innerText = I
    }

    handleCommentDelete() {
        const comment = Comment.all.find(c => c.id === this.dataset.id)
        comment.p.remove()

        CommentApi.deleteComment(comment.id)
    }
}