const baseURL = "http://localhost:3000"

const wineTOCList = document.querySelector("#wine-toc-list")

const wineTable = document.querySelector("#wine-table")

const addWineBtn = document.querySelector("#add-wine-btn")


function fetchWines() {
    fetch(baseURL + "/wines")
    .then(resp => resp.json())
    .then(jsonWine => {
        renderWines(jsonWine)
        Wine.renderWineTOC()
    })
}

function renderWines(json) {
    const wines = json["data"]
    wines.map(wine => {
        const w = new Wine({id: wine.id, ...wine.attributes})
        w.addToTable()
    })
}



fetchWines()
