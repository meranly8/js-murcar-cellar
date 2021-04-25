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
        this.comment_ids = comment_ids

        this.tr = document.createElement("tr")
        this.tr.id = `wine-${id}`
        this.tr.addEventListener('click', this.handleWineClick)

        this.index = Wine.all.length
        Wine.all.push(this)
    }

    addToPage() {
        wineTable.appendChild(this.renderWineTr())
        this.detailsFormatting()
        Wine.displayTotal()
        Wine.renderWineTOC()
        resetAddForm()
    }

    renderWineTr(){
        const checked = (this.opened === true) ? "checked" : ""

        this.tr.innerHTML = `
            <th id="${this.id}" class="wine-details">
                <h3>${this.wine}<br>
                    ${this.region}, ${this.country} (${this.year})
                </h3>
                <button id="update-${this.id}-button" data-id=${this.id}>Update Details</button><br><br>
                <div id="edit-form-${this.id}-div" class="form-closed">
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
                </div>
                <b>Price:</b> $${this.price}<br>
                <b>Opened:</b> <container id="opened-detail-${this.id}">${this.opened}</container><br>
                <b >Rating:</b> <container id="rating-detail-${this.id}">${this.rating}</container><br><br>
                
                <button id="view-${this.id}-comments" data-id="${this.id}">View Comments</button><br><br>
                <div id="wine-${this.id}-comments">
                </div>
            </th>
            <th><img src="${this.image}" class="wine-label" alt="${this.wine} label"></th><br>
        `
        return this.tr
    }

    handleWineClick = (event) => {
        if (event.target.innerText === "Update Details") {
            const editDiv = event.target.nextSibling.nextElementSibling.nextElementSibling
            const editForm = editDiv.querySelector(`#edit-form-${this.id}`)

            editDiv.className = "form-opened"
            editForm.addEventListener('submit', this.handleWineUpdateSubmit)

            event.target.innerText = "Close Edit Form"

        } else if (event.target.innerText === "View Comments") {
            this.showComments()

        } else if (event.target.innerText === "Delete Wine") {
            this.handleWineDeletion()

        } else if (event.target.innerText === "Close Edit Form") {
            event.target.nextSibling.nextElementSibling.nextElementSibling.className = "form-closed"
            event.target.innerText = "Update Details"
        }
    }

    detailsFormatting() {
        const ratingDetail = document.querySelector(`#rating-detail-${this.id}`)
        const openedDetail = document.querySelector(`#opened-detail-${this.id}`)
        
        if (this.rating === null || "") ratingDetail.innerText = "Not yet rated"
        this.opened === false || "" ? openedDetail.innerText = "No" : openedDetail.innerText = "Yes"
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

    handleWineUpdateSubmit(event) {
        event.preventDefault()

        const wine = Wine.all.find(wine => wine.id === this.dataset.id)

        wine.wine = this.querySelector(`#edit-wine-${this.dataset.id}`).value
        wine.region = this.querySelector(`#edit-region-${this.dataset.id}`).value
        wine.country = this.querySelector(`#edit-country-${this.dataset.id}`).value
        wine.year = this.querySelector(`#edit-year-${this.dataset.id}`).value
        wine.price = this.querySelector(`#edit-price-${this.dataset.id}`).value
        wine.opened = this.querySelector(`#edit-opened-${this.dataset.id}`).value
        wine.rating = this.querySelector(`#edit-rating-${this.dataset.id}`).value
        wine.image = this.querySelector(`#edit-image-${this.dataset.id}`).value

        WineApi.updateWine(wine)
    }

    handleWineDeletion(event) {
        this.parentNode.parentNode.parentNode.remove()
        
        WineApi.deleteWine(this.dataset.id)
        
        const wine = Wine.all.find(element => element.id === event.target.dataset.id)
        const index = wine.index
        Wine.all.splice(index, 1)
        Wine.renderWineTOC()
        Wine.displayTotal()
    }

    showComments() {
        debugger
    }
}