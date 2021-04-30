class Wine {
    static all = []

    constructor({id, wine, region, country, year, price, opened, image, rating, comment_ids, created_at}) {
        this.id = id
        this.wine = wine
        this.region = region
        this.country = country
        this.year = year
        this.price = price
        this.opened = opened
        this.image = image
        this.rating = rating
        this.comment_ids = (comment_ids === undefined) ? [] : comment_ids.map(id => {return id.id})
        this.created_at = created_at

        this.tr = document.createElement("tr")
        this.tr.id = `wine-${id}`
        this.tr.addEventListener('click', this.handleWineClick)

        Wine.all.push(this)
    }

    updateDOM() {
        Wine.sortTable()
        Wine.displayTotal()
        Wine.renderWineTOC()
    }

    static sortTable() {
        wineTable.innerHTML = ""
        
        const wines = Wine.alphaSortWine()
        wines.map(wine => {
            wineTable.appendChild(wine.renderWineTr())
            wine.detailsFormatting()
        })
    }

    renderWineTr() {
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
                <b>Added:</b> <container id="added-detail-${this.id}">${this.created_at}</container><br><br>
                
                <button id="view-${this.id}-comments" data-id="${this.id}">View Comments</button><br><br>
                <div id="wine-${this.id}-comments" class="form-closed">
                </div>

                <button id="wine-${this.id}-add-cmt-btn" class="form-closed">Add Comment</button>
                <form id="add-cmt-wine-${this.id}" class="form-closed">
                </form>
            </th>
            <th id="label"><img src="${this.image}" class="wine-label" alt="${this.wine} label"></th><br>
        `
        return this.tr
    }

    handleWineClick = (event) => {
        if (event.target.innerText === "Update Details") {
            this.showEditForm(event)

        } else if (event.target.innerText === "View Comments") {
            this.showWineComments(event)

        } else if (event.target.innerText === "Delete Wine") {
            this.handleWineDeletion()

        } else if (event.target.innerText === "Close Edit Form") {
            event.target.nextSibling.nextElementSibling.nextElementSibling.className = "form-closed"
            event.target.innerText = "Update Details"

        } else if (event.target.innerText === "Close Comments") {
            this.hideWineComments(event)

        } else if (event.target.innerText === "Add Comment") {
            this.showWineCommentForm(event)
            
        } else if (event.target.innerText === "Close Comment Form") {
            this.hideWineCommentForm(event)
        }
        
    }

    detailsFormatting = () => {
        this.formatWineOpened()
        this.formatWineRating()
        this.formatWineCreatedAt()
    }
    
    formatWineOpened = () => {
        const openedDetail = document.querySelector(`#opened-detail-${this.id}`)
        
        if (this.opened === false || this.opened === "") {
            openedDetail.innerText = "No"
        } else if (this.opened === true || this.opened === "true") {
            openedDetail.innerText = "Yes"
        }
    }

    formatWineRating = () => {
        const ratingDetail = document.querySelector(`#rating-detail-${this.id}`)

        if (this.rating === null || this.rating === "") {
            ratingDetail.innerText = "Not yet rated"
        } else {
            ratingDetail.innerText = `${this.rating} / 5`
        }
    }

    formatWineCreatedAt = () => {
        const createdAt = this.tr.querySelector(`#added-detail-${this.id}`)
        const shortDate = new Date(this.created_at).toLocaleDateString()
        
        createdAt.innerText = shortDate
    }

    static displayTotal() {
        wineTotal.innerText = Wine.all.length
        Wine.all.length === 0 ? countryTotalsBtn.className = 'form-closed' : countryTotalsBtn.className = 'form-open'
    }

    static renderWineTOC() {
        wineTOCList.innerHTML = ""
        
        if (Wine.all.length === 0) {
            wineTOCList.innerHTML = "No wines in collection yet."
        } else {
            const wines = this.alphaSortWine()
            
            wines.map(wine => {
                const li = document.createElement("li")
                li.id = wine.id + "-link-li"
                li.innerHTML = `
                    <a href="#${wine.id}" id="${wine.id}-link">${wine.wine}, ${wine.country} (${wine.year})</a>
                `
                wineTOCList.append(li)
            })
        }
    }

    static alphaSortWine = () => {
        return Wine.all.sort((a, b) => {
            let nameA = a.wine.toUpperCase()
            let nameB = b.wine.toUpperCase()
            if (nameA < nameB) {
                return -1
            } else {
                return 1
            }
        })
    }

    static sortWineYear() {
        return Wine.all.sort((a, b) => {
            return a.year - b.year
        })
    }

    static sortWinePrice() {
        return Wine.all.sort((a, b) => {
            return b.price - a.price
        })
    }

    static alphaSortCountry() {
        return Wine.all.sort((a, b) => {
            let countryA = a.country.toUpperCase()
            let countryB = b.country.toUpperCase()
            if (countryA < countryB) {
                return -1
            } else {
                return 1
            }
        })
    }

    static sortFilterDOMBy(wines) {
        wineTable.innerHTML = ""
        wineTOCList.innerHTML = ""

        wines.map(wine => {
            wineTable.appendChild(wine.renderWineTr())
            
            wine.detailsFormatting()

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
        this.opened = this.tr.querySelector(`#edit-opened-${this.id}`).checked
        this.rating = this.tr.querySelector(`#edit-rating-${this.id}`).value
        this.image = this.tr.querySelector(`#edit-image-${this.id}`).value

        WineApi.updateWine(this)
    }

    renderEditForm = () => {
        const form = this.tr.querySelector(`#edit-form-${this.id}-div`)

        form.innerHTML = `
        <form id="edit-form-${this.id}" data-id=${this.id}>
            <table id="wine-edit-form">
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
                    <input type="number" name="year" id="edit-year-${this.id}" class="edit-year" min=1900 value="${this.year}"><br>
                </label>
                </th>
                <th>
                <label>Price:
                    $<input type="number" name="price" id="edit-price-${this.id}" min=0 class="edit-form-column-2, edit-price" value=${this.price}><br>
                </label><br>
                <label>Opened:
                    <input type="checkbox" name="opened" id="edit-opened-${this.id}" class="edit-form-column-2" value=${this.opened}><br>
                </label><br>
                <label>Rating:
                    <input type="number" name="rating" id="edit-rating-${this.id}" min=0 max=5 step=.5 class="edit-form-column-2" value=${this.rating}> / 5<br>
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
        const opened = this.tr.querySelector(`#edit-opened-${this.id}`)
        if (this.opened === true || this.opened === "true") opened.checked = true
    }

    showEditForm = (event) => {
        this.renderEditForm()

        const editDiv = this.tr.querySelector(`#edit-form-${this.id}-div`)
        editDiv.className = "form-opened"
        
        const editForm = editDiv.querySelector(`#edit-form-${this.id}`)
        editForm.addEventListener('submit', this.handleWineUpdateSubmit)

        event.target.innerText = "Close Edit Form"
    }

    handleWineDeletion = () => {
        this.tr.remove()
        
        WineApi.deleteWine(this.id)

        const wines = Wine.alphaSortWine()
        const index = wines.indexOf(this)
        wines.splice(index, 1)

        Wine.renderWineTOC()
        Wine.displayTotal()
    }

    showWineComments = (event) => {
        const commentDiv = document.querySelector(`#wine-${this.id}-comments`)
        commentDiv.className = "form-open"
        
        const addCommentBtn = document.querySelector(`#wine-${this.id}-add-cmt-btn`)
        addCommentBtn.className = "form-open"

        event.target.innerText = "Close Comments"
    }

    hideWineComments = (event) => {
        const commentDiv = document.querySelector(`#wine-${this.id}-comments`)
        commentDiv.className = "form-closed"

        const addCommentBtn = document.querySelector(`#wine-${this.id}-add-cmt-btn`)
        addCommentBtn.className = "form-closed"

        const commentForm = document.querySelector(`#add-cmt-wine-${this.id}`)
        commentForm.className = "form-closed"

        addCommentBtn.innerText = "Add Comment"

        event.target.innerText = "View Comments"
    }

    showWineCommentForm = (event) => {
        const commentForm = document.querySelector(`#add-cmt-wine-${this.id}`)
        this.renderCommentForm(commentForm)

        commentForm.className = "form-open"
        commentForm.addEventListener('submit', this.handleNewCommentSubmit)

        event.target.innerText = "Close Comment Form"
    }

    renderCommentForm = (commentForm) => {
        commentForm.innerHTML = `
            <br>
            <label>
                Name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="comment-name" id="comment-name-${this.id}">
            </label><br>
            <label>
                Comment: <textarea name="comment-comment" id="comment-comment-${this.id}"></textarea>
            </label>
            <input type="hidden" name="comment-wine_id" id="comment-wine_id-${this.id}" value="${this.id}"><br>
            <input type="submit" value="Create Comment">
        `
    }

    handleNewCommentSubmit = (event) => {
        event.preventDefault()
        const comment = {
            name: document.querySelector(`#comment-name-${this.id}`).value,
            comment: document.querySelector(`#comment-comment-${this.id}`).value,
            wine_id: this.id
        }

        const commentForm = document.querySelector(`#add-cmt-wine-${this.id}`)
        commentForm.reset()
        
        this.hideWineCommentForm(event)
        
        CommentApi.createComment(comment)
    }

    hideWineCommentForm = (event) => {
        const commentForm = document.querySelector(`#add-cmt-wine-${this.id}`)
        commentForm.className = "form-closed"

        const addCommentBtn = this.tr.querySelector(`#wine-${this.id}-add-cmt-btn`)
        addCommentBtn.innerText = "Add Comment"
    }
}