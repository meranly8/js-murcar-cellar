class Comment {
    static all = []

    constructor({id, name, comment, wine_id, created_at}) {
        this.id = id
        this.name = name
        this.comment = comment
        this.wine_id = wine_id
        this.created_at = created_at

        // only comments with unique wine ids need to have a th
        this.th = document.createElement("th")
        this.th.dataset.id = wine_id

        Comment.all.push(this)
    }

    // need comments with the same wine_id to be added to the same th

    addToTable() {
        
        
        debugger
        document.querySelector(`tr#wine-${this.id}`).innerHTML += `
            <h5>Created at: ${this.created_at}</h5>
            <h5>By: ${this.name}</h5>
            <h6>${this.wine_id}</h6>
            <p>${this.comment}</p>
        `
    }
}