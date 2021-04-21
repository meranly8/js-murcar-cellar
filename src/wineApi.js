class WineApi {
    static winesURL = "http://localhost:3000/wines"

    static fetchWines() {
        fetch(this.winesURL)
        .then(resp => resp.json())
        .then(jsonWines => {
            const wines = jsonWines["data"]
            wines.map(wine => {
                const w = new Wine({id: wine.id, ...wine.attributes})
                w.addToTable()
                w.addListeners()
            })
            Wine.renderWineTOC()
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
            w.addToTable()
            w.addListeners()
            w.addToWineTOC()
        })
    }
}