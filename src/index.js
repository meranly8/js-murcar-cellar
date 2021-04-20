const baseURL = "http://localhost:3000"
const wineTOCList = document.querySelector("#wine-toc-list")
const wineTable = document.querySelector("#wine-table")
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
        const tr = document.createElement("tr")
        tr.id = wine.id
        tr.innerHTML = `
            <th id="${wine.id}" class="wine-details">
                <h3>${wine.attributes.wine}<br>
                    ${wine.attributes.region}, ${wine.attributes.country} (${wine.attributes.year})
                </h3>
                <a id = "view-${wine.id}-comments" href="">Open Comments</a><br><br>
                <b>Price:</b> $${wine.attributes.price}<br>
                <b>Opened:</b> ${wine.attributes.opened}<br>
                <b>Rating:</b> ${wine.attributes.rating}<br><br><br>
                <a id="update-${wine.id}-link" href="">Update Details</a>
            </th>
            
            
            <th ><img src="${wine.attributes.image}" class="wine-label" alt="${wine.attributes.wine} label"><br>
            
        `
        
        wineTable.append(tr)
    })
}

fetchWines()
