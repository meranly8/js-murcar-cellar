const baseURL = "http://localhost:3000"

const wineTotal = document.querySelector("#wine-total")
const countryTotalsBtn = document.querySelector("#totals-by-country-btn")
countryTotalsBtn.addEventListener("click", showCountryTotals)
const totalsContainer = document.querySelector("#totals-by-country")

const addWineBtn = document.querySelector("#add-wine-btn")

addWineBtn.state = "Closed"
addWineBtn.addEventListener("click", showWineForm)

const sortFilter = document.querySelector(`#sort-filter-list`)
sortFilter.addEventListener("change", handleSortFilter)

const wineTOCList = document.querySelector("#wine-toc-list")

const wineTable = document.querySelector("#wine-table")

const wineForm = document.querySelector("#wine-form")

const wineInput = document.querySelector("#wine-wine")
const regionInput = document.querySelector("#wine-region")
const countryInput = document.querySelector("#wine-country")
const yearInput = document.querySelector("#wine-year")
const priceInput = document.querySelector("#wine-price")
const openedInput = document.querySelector("#wine-opened")
const ratingInput = document.querySelector("#wine-rating")
const imageInput = document.querySelector("#wine-image")

wineForm.addEventListener("submit", handleNewWineSubmit)

// table with distinctCountries elements as headers with ids
function showCountryTotals() {
    if (totalsContainer.className === "form-closed") {
        totalsContainer.className = "form-opened"
        countryTotalsBtn.innerText = "Close Totals"

        const distinctCountries = [...new Set(Wine.all.map(wine => wine.country))] // grab unquie countries for display
    
    } else if (totalsContainer.className === "form-opened") {
        totalsContainer.className = "form-closed"
        countryTotalsBtn.innerText = "Totals by Country"
    }

}

function handleNewWineSubmit(event) {
    event.preventDefault()
    WineApi.createWine()
    wineForm.reset()
}

function resetAddForm() {
    wineForm.className = "form-closed"
    addWineBtn.state = "Closed"
    addWineBtn.innerText = "Add Wine"
}

function showWineForm() {
    if (addWineBtn.state === "Closed"){
        wineForm.className = "form-open"
        addWineBtn.state = "Open"
        addWineBtn.innerText = "Close Form"
    } else {
        wineForm.className = "form-closed"
        addWineBtn.state = "Closed"
        addWineBtn.innerText = "Add Wine"
    }
}

function handleSortFilter(event) {
    debugger
    if (event.target.value === "by-year") {

    } else if (event.target.value === "by-price") {

    } else if (event.target.value === "opened") {

    } else if (event.target.value === "unopened") {

    } else if (event.target.value === "by-wine") {

    }
}

WineApi.fetchWines()
