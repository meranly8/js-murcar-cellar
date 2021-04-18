const baseURL = "http://localhost:3000"
const winesList = document.querySelector("#wines-list")
const addWineBtn = document.querySelector("#add-wine-btn")

function fetchWines() {
    fetch(baseURL + "/wines")
    .then(resp => resp.json())
    .then(winesJSON => {
        renderWines(winesJSON)
    })
}

function renderWines(json) {
    const wines = json["data"]
    wines.map(wine => {
        const li = document.createElement("li")
        li.innerHTML = `
            <h4>${wine.attributes.wine}<br></h4>
            <h5>${wine.attributes.region}, ${wine.attributes.country}<br>${wine.attributes.year}</h5>
            <img src="${wine.attributes.image}" class="wine-label" alt="${wine.attributes.wine} label"><br><br>
            <a href="" id="show-wine-details">Show Details</a>
            
        `
    winesList.append(li)
    })
}

fetchWines()

function showWineDetails() {

}