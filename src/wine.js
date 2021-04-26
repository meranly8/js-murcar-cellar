class Wine {
    static all = []

    constructor({id, wine, region, country, year, price, opened, image, rating, comment_ids}) {
        this.id = id
        this.wine = wine
        this.region = region
        this.country = country
        this.year = year
        this.price = price
        this.opened = opened
        this.image = image
        this.rating = rating
        this.comment_ids = comment_ids.map(id => {return id.id})

        this.tr = document.createElement("tr")
        this.tr.id = `wine-${id}`
        this.tr.addEventListener('click', this.handleWineClick)

        this.index = Wine.all.length
        Wine.all.push(this)
    }

    updateDOM() {
        wineTable.appendChild(this.renderWineTr())
        this.detailsFormatting()
        Wine.displayTotal()
        Wine.renderWineTOC()
    }

    renderWineTr(){
        this.tr.innerHTML = `
            <th id="${this.id}" class="wine-details">
                <h3>${this.wine}<br>
                    ${this.region}, ${this.country} (${this.year})
                </h3>

                <button id="update-${this.id}-button" data-id=${this.id}>Update Details</button><br><br>
                <div id="edit-form-${this.id}-div" class="form-closed">
                </div>

                <b>Price:</b> $${this.price}<br>
                <b>Opened:</b> <container id="opened-detail-${this.id}">${this.opened}</container><br>
                <b>Rating:</b> <container id="rating-detail-${this.id}">${this.rating}</container><br><br>
                
                <button id="view-${this.id}-comments" data-id="${this.id}">View Comments</button><br>
                <div id="wine-${this.id}-comments" class="form-closed">
                </div>

                <button id="wine-${this.id}-add-cmt-btn" class="form-closed">Add Comment</button>
                <form id="add-cmt-wine-${this.id}" class="form-closed">
                </form>
            </th>
            <th><img src="${this.image}" class="wine-label" alt="${this.wine} label"></th><br>
        `
        return this.tr
    }

    handleWineClick = (event) => {
        if (event.target.innerText === "Update Details") {
            this.showEditForm(event)

        } else if (event.target.innerText === "View Comments") {
            this.showComments(event)

        } else if (event.target.innerText === "Delete Wine") {
            this.handleWineDeletion()

        } else if (event.target.innerText === "Close Edit Form") {
            event.target.nextSibling.nextElementSibling.nextElementSibling.className = "form-closed"
            event.target.innerText = "Update Details"

        } else if (event.target.innerText === "Close Comments") {
            this.hideComments(event)

        } else if (event.target.innerText === "Add Comment") {
            this.showCommentForm(event)
            
        } else if (event.target.innerText === "Close Comment Form") {
            this.hideCommentForm(event)
        }
        
    }

    detailsFormatting = () => {
        const ratingDetail = document.querySelector(`#rating-detail-${this.id}`)
        const openedDetail = document.querySelector(`#opened-detail-${this.id}`)
        
        if (this.rating === null || this.rating === "") ratingDetail.innerText = "Not yet rated"

        this.opened === false || this.rating === "" ? openedDetail.innerText = "No" : openedDetail.innerText = "Yes"
    }

    static displayTotal() {
        wineTotal.innerText = Wine.all.length
    }

    static renderWineTOC() {
        wineTOCList.innerHTML = ""

        Wine.all.map(wine => {
            const li = document.createElement("li")
            li.id = wine.id + "-link-li"
            li.innerHTML = `
                <a href="#${wine.id}" id="${wine.id}-link">${wine.wine}, ${wine.country} (${wine.year})</a>
            `
            wineTOCList.append(li)
        })
    }

    handleWineUpdateSubmit = (event) => {
        event.preventDefault()
        
        this.wine = this.tr.querySelector(`#edit-wine-${this.id}`).value
        this.region = this.tr.querySelector(`#edit-region-${this.id}`).value
        this.country = this.tr.querySelector(`#edit-country-${this.id}`).value
        this.year = this.tr.querySelector(`#edit-year-${this.id}`).value
        this.price = this.tr.querySelector(`#edit-price-${this.id}`).value
        this.opened = this.tr.querySelector(`#edit-opened-${this.id}`).value
        this.rating = this.tr.querySelector(`#edit-rating-${this.id}`).value
        this.image = this.tr.querySelector(`#edit-image-${this.id}`).value

        WineApi.updateWine(this)
    }

    handleWineDeletion = () => {
        this.tr.remove()
        
        WineApi.deleteWine(this.id)
        
        Wine.all.splice(this.index, 1)
        Wine.renderWineTOC()
        Wine.displayTotal()
    }

    renderEditForm = () => {
        const form = this.tr.querySelector(`#edit-form-${this.id}-div`)
        const checked = (this.opened === true) ? "checked" : ""
        form.innerHTML = `
        <form id="edit-form-${this.id}" data-id=${this.id}>
            <table>
                <th>
                <label>Wine:
                    <input type="text" name="wine" id="edit-wine-${this.id}" class="edit-form-column-1" value="${this.wine}"><br>
                </label><br>
                <label>Region:
                    <input type="" name="region" id="edit-region-${this.id}" class="edit-form-column-1" value="${this.region}"><br>
                </label><br>
                <label>Country:
                    <input type="" name="country" id="edit-country-${this.id}" class="edit-form-column-1" value="${this.country}"><br>
                </label><br>
                <label>Year:
                    <input type="number" name="year" id="edit-year-${this.id}" min=1900 class="edit-form-column-1" value="${this.year}"><br>
                </label>
                </th>
                <th>
                <label >Price:
                    $<input type="number" name="price" id="edit-price-${this.id}" class="edit-form-column-2" value=${this.price}><br>
                </label><br>
                <label>Opened:
                    <input type="checkbox" name="opened" id="edit-opened-${this.id}" class="edit-form-column-2" value=${this.opened} ${checked}><br>
                </label><br>
                <label>Rating:
                    <input type="number" name="rating" id="edit-rating-${this.id}" min=0 max=5 step=.5 class="edit-form-column-2" value=${this.rating}><br>
                </label><br>
                <label>Label Image Link:
                    <input type="text" name="image" id="edit-image-${this.id}" placeholder="ex: https://i.imgur.com/Hnlo6p8h.png" class="edit-form-column-2" value="${this.image}"><br><br>
                </label>
                </th>
            </table>
            <input type="submit" value="Update Wine">
        </form><br>
        <button id="delete-${this.id}-button" data-id=${this.id}>Delete Wine</button><br><br>
        `
    }

    showEditForm = (event) => {
        this.renderEditForm()

        const editDiv = event.target.nextSibling.nextElementSibling.nextElementSibling
        editDiv.className = "form-opened"
        
        const editForm = editDiv.querySelector(`#edit-form-${this.id}`)
        editForm.addEventListener('submit', this.handleWineUpdateSubmit)

        event.target.innerText = "Close Edit Form"
    }

    showComments = (event) => {
        const commentDiv = document.querySelector(`#wine-${this.id}-comments`)
        commentDiv.className = "form-open"
        
        const addCommentBtn = document.querySelector(`#wine-${this.id}-add-cmt-btn`)
        addCommentBtn.className = "form-open"

        event.target.innerText = "Close Comments"
    }

    hideComments = (event) => {
        const commentDiv = document.querySelector(`#wine-${this.id}-comments`)
            commentDiv.className = "form-closed"

            const addCommentBtn = document.querySelector(`#wine-${this.id}-add-cmt-btn`)
            addCommentBtn.className = "form-closed"

            const commentForm = document.querySelector(`#add-cmt-wine-${this.id}`)
            commentForm.className = "form-closed"

            addCommentBtn.innerText = "Add Comment"

            event.target.innerText = "View Comments"
    }

    showCommentForm = (event) => {
        const c = new Comment({wine_id: this.id})
        c.renderCommentForm()
        
        const commentForm = document.querySelector(`#add-cmt-wine-${this.id}`)
        commentForm.className = "form-open"

        event.target.innerText = "Close Comment Form"
    }

    hideCommentForm = (event) => {
        const commentForm = document.querySelector(`#add-cmt-wine-${this.id}`)
        commentForm.className = "form-closed"
        event.target.innerText = "Add Comment"
    }
}