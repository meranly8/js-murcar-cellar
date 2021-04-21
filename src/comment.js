class Comment {
    static all = []

    constructor({id, name, comment, wine_id}) {
        this.id = id
        this.name = name
        this.comment = comment
        this.wine_id = wine_id

        this.th = document.createElement("th")

        Comment.all.push(this)
    }
}