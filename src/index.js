const baseURL = "http://localhost:3000"
const wineTOCList = document.querySelector("#wine-toc-list")
const wineList = document.querySelector("#wine-list")
const addWineBtn = document.querySelector("#add-wine-btn")

function fetchWines() {
    fetch(baseURL + "/wines")
    .then(resp => resp.json())
    .then(winesJSON => {
        renderWineTOC(winesJSON)
        renderWines(winesJSON)
    })
}

function renderWineTOC(json) {
    const wines = json["data"]

    wines.map(wine => {
        const li = document.createElement("li")
        li.id = wine.id + "-link-li"
        li.innerHTML = `
            <a href="#${wine.id}" id="${wine.id}-link">${wine.attributes.wine}, ${wine.attributes.country} (${wine.attributes.year})</a>
            
        `
    wineTOCList.append(li)
    })
}

function renderWines(json) {
    const wines = json["data"]
    wines.map(wine => {
        const li = document.createElement("li")
        li.id = wine.id
        li.innerHTML = `
            <h3>${wine.attributes.wine}<br>
            ${wine.attributes.region}, ${wine.attributes.country}<br>(${wine.attributes.year})</h3>
            <img src="${wine.attributes.image}" class="wine-label" alt="${wine.attributes.wine} label"><br><br>
            <div id="details-${wine.id}">
                Opened: ${wine.attributes.opened}<br>
                Price: $${wine.attributes.price}<br>
                Rating: ${wine.attributes.rating}
            </div>
            
        `
        
        wineList.append(li)
    })
}

fetchWines()
