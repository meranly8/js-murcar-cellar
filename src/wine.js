class Wine {
    static all = []

    constructor({id, wine, region, country, year, price, opened, image, rating}) {
        this.id = id
        this.wine = wine
        this.region = region
        this.country = country
        this.year = year
        this.price = price
        this.opened = opened
        this.image = image
        this.rating = rating

        this.tr = document.createElement("tr")
        this.tr.id = `wine-${id}`

        Wine.all.push(this)
    }

    renderWineTr(){
        this.tr.innerHTML = `
            <th id="${this.id}" class="wine-details">
                <h3>${this.wine}<br>
                    ${this.region}, ${this.country} (${this.year})
                </h3>
                <button id="update-${this.id}-button" data-id=${this.id} href="">Update Details</button><br><br>
                <form id="edit-form-${this.id}" class="form-closed" >
                    <table>
                        <th>
                        <label>Wine:
                            <input type="text" name="wine" id="edit-wine-${this.id}" class="form-column-1" value="${this.wine}"><br>
                        </label><br>
                        <label>Region:
                            <input type="" name="region" id="wine-region" class="form-column-1" value="${this.region}"><br>
                        </label><br>
                        <label>Country:
                            <input type="" name="country" id="wine-country" class="form-column-1" value="${this.country}"><br>
                        </label><br>
                        <label>Year:
                            <input type="number" name="year" id="wine-year" min=1900 class="form-column-1" value="${this.year}"><br>
                        </label>
                        </th>
                        <th>
                        <label >Price:
                            $<input type="number" name="price" id="wine-price" class="form-column-2" value="${this.price}"><br>
                        </label><br>
                        <label>Opened:
                            <input type="checkbox" name="opened" id="wine-opened" class="form-column-2" value="${this.opened}"><br>
                        </label><br>
                        <label>Rating:
                            <input type="number" name="rating" id="wine-rating" min=0 max=5 step=.5 class="form-column-2" value="${this.rating}"><br>
                        </label><br>
                        <label>Label Image Link:
                            <input type="text" name="image" id="wine-image" placeholder="ex: https://i.imgur.com/Hnlo6p8h.png" class="form-column-2" value="${this.image}"><br><br>
                        </label>
                        </th>
                    </table>
                    <input type="submit" value="Update Wine"><br>
                </form>
                <b>Price:</b> $${this.price}<br>
                <b>Opened:</b> ${this.opened}<br>
                <b>Rating:</b> ${this.rating}<br><br>
                
                <a id="view-${this.id}-comments" data-id="${this.id}" href="">View Comments</a><br><br>
                <div id="wine-${this.id}-comments">
                </div>
            </th>
            <th ><img src="${this.image}" class="wine-label" alt="${this.wine} label"><br>
        `
        return this.tr
    }

    addToTable() {
        wineTable.appendChild(this.renderWineTr())
        this.addListeners()
    }

    static renderWineTOC() {
        Wine.all.map(wine => {
            const li = document.createElement("li")
            li.id = wine.id + "-link-li"
            li.innerHTML = `
                <a href="#${wine.id}" id="${wine.id}-link">${wine.wine}, ${wine.country} (${wine.year})</a>
            `
            wineTOCList.append(li)
        })
    }

    addToWineTOC() {
        //remove all elements in wineTOCList, iterate over Wine.all so wine's are in alpha order
        
        const li = document.createElement("li")
        li.id = this.id + "-link-li"
        li.innerHTML = `
            <a href="#${this.id}" id="${this.id}-link">${this.wine}, ${this.country} (${this.year})</a>
        `
        wineTOCList.append(li)
        wineForm.className = "form-closed"
        addWineBtn.state = "Closed"
        addWineBtn.innerText = "Add Wine"
    }

    addListeners() {
        const commentLink = document.querySelector(`#view-${this.id}-comments`)
        commentLink.addEventListener("click", this.showComments)

        const updateDetailsBtn = document.querySelector(`#update-${this.id}-button`)
        updateDetailsBtn.state = "Closed"
        updateDetailsBtn.addEventListener("click", this.showEditForm)

    }

    showEditForm() {
        debugger
    }

    showComments() {
        debugger
    }
}