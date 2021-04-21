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

        Wine.all.push(this)
    }

    renderWineTr(){
        this.tr.innerHTML = `
            <th id="${this.id}" class="wine-details">
                <h3>${this.wine}<br>
                    ${this.region}, ${this.country} (${this.year})
                </h3>
                <a id ="view-${this.id}-comments" href="">View Comments</a><br><br>
                <b>Price:</b> $${this.price}<br>
                <b>Opened:</b> ${this.opened}<br>
                <b>Rating:</b> ${this.rating}<br><br><br>
                <a id="update-${this.id}-link" href="">Update Details</a>
            </th>
            <th ><img src="${this.image}" class="wine-label" alt="${this.wine} label"><br>
        `
        return this.tr
    }

    addToTable() {
        wineTable.appendChild(this.renderWineTr())
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

        const updateLink = document.querySelector(`#update-${this.id}-link`)
        updateLink.addEventListener("click", this.showEditForm)
    }

    showComments() {
        debugger
    }

    showEditForm() {
        debugger
    }
    

}