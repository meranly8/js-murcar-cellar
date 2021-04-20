const baseURL = "http://localhost:3000"

const wineTOCList = document.querySelector("#wine-toc-list")

const wineTable = document.querySelector("#wine-table")

const addWineBtn = document.querySelector("#add-wine-btn")

addWineBtn.state = "Closed"
addWineBtn.addEventListener("click", showWineForm)

const wineForm = document.querySelector("#wine-form")

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

function showWineForm() {
    if (addWineBtn.state === "Closed"){
        wineForm.className = "form-open"
        addWineBtn.state = "Open"
    } else {
        wineForm.className = "form-closed"
        addWineBtn.state = "Closed"
    }
}

fetchWines()
