class WineApi {
    static winesURL = "http://localhost:3000/wines"

    static fetchWines() {
        fetch(this.winesURL)
        .then(resp => resp.json())
        .then(jsonWines => {
            const wines = jsonWines["data"]
            wines.map(wine => {
                const w = new Wine({id: wine.id, ...wine.attributes, comment_ids: wine.relationships.comments.data})
                w.addToPage()
            })
        })
    }

    static createWine() {
        const formData = {
            wine: wineInput.value,
            region: regionInput.value,
            country: countryInput.value,
            year: yearInput.value,
            price: priceInput.value,
            opened: openedInput.value,
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
            w.addToPage()
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
        .then(json => alert(json.message))
    }
}