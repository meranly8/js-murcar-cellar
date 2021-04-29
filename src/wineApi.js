class WineApi {
    static winesURL = "http://localhost:3000/wines"

    static fetchWines() {
        fetch(this.winesURL)
        .then(resp => resp.json())
        .then(jsonWines => {
            const wines = jsonWines["data"]
            wines.map(wine => {
                const w = new Wine({id: wine.id, ...wine.attributes, comment_ids: wine.relationships.comments.data})

                w.updateDOM()
            })
            CommentApi.fetchComments()
            Wine.renderWineTOC()
            Wine.displayTotal()
            addFilterOptions()
        })
    }

    static createWine() {
        const formData = {
            wine: wineInput.value,
            region: regionInput.value,
            country: countryInput.value,
            year: yearInput.value,
            price: priceInput.value,
            opened: openedInput.checked,
            rating: ratingInput.value,
            image: imageInput.value
        }

        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(formData)
        }
    
        fetch(this.winesURL, configObj)
        .then(resp => resp.json())
        .then(jsonWine => {
            const wine = jsonWine["data"]
            const w = new Wine({id: wine.id, ...wine.attributes})
            resetAddForm()
            w.updateDOM()
            addFilterOptions()
        })
    }

    static updateWine(wine) {
        const formData = {
            wine: wine.wine,
            region: wine.region,
            country: wine.country,
            year: wine.year,
            price: wine.price,
            opened: wine.opened,
            rating: wine.rating,
            image: wine.image
        }
        
        const configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(formData)
        }

        fetch(`${this.winesURL}/${wine.id}`, configObj)
        .then(resp => resp.json())
        .then(jsonWine => {
            wine.renderWineTr()
            wine.detailsFormatting()
            Wine.renderWineTOC()
            CommentApi.fetchFilteredComments(wine)
        })
    }

    static deleteWine(id) {
        const configObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        }

        fetch(`${this.winesURL}/${id}`, configObj)
        .then(resp => resp.json())
        .then(json => {
            alert(json.message)
            addFilterOptions()
        })
    }
}