const baseURL = "http://localhost:3000"

const wineTotal = document.querySelector("#wine-total")
const countryTotalsBtn = document.querySelector("#totals-by-country-btn")
countryTotalsBtn.addEventListener("click", showCountryTotals)
const totalsContainer = document.querySelector("#totals-by-country")

const addWineBtn = document.querySelector("#add-wine-btn")

addWineBtn.state = "Closed"
addWineBtn.addEventListener("click", showWineForm)

const sortBtns = document.querySelector("#sort-btns")
sortBtns.addEventListener("click", handleSort)

const filterList = document.querySelector("#filter-list")
filterList.addEventListener("change", handleFilter)
const filteredTotal = document.querySelector("#filtered-total")

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

function showCountryTotals() {
    if (totalsContainer.className === "form-closed") {
        totalsContainer.className = "form-opened"
        countryTotalsBtn.innerText = "Close Totals"
        
        uniqueCountryTotals()
    
    } else if (totalsContainer.className === "form-opened") {
        totalsContainer.className = "form-closed"
        countryTotalsBtn.innerText = "Totals by Country"
        
        totalsContainer.innerHTML = ""
    }
}

function uniqueCountryTotals() {
    const sortedWines = Wine.alphaSortCountry()
    const distinctCountries = [...new Set(sortedWines.map(wine => wine.country))]
    
    return distinctCountries.map(country => {
        const container = document.createElement("container")
        const total = Wine.all.filter(wine => wine.country === country).length

        container.innerHTML = `<b>${country}:</b> ${total}<br>`
        container.className = "total-container"
        container.id = country
        totalsContainer.appendChild(container)
    })
}

function handleNewWineSubmit(event) {
    event.preventDefault()
    WineApi.createWine()
    
    hideAddForm()
    resetBtnActivation()
}

function hideAddForm() {
    wineForm.reset()
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

function handleSort(event) {
    clearBtnActivation()
    filteredTotal.innerText = ""
    if (event.target.innerText === "Wine") {
        Wine.sortTable()
        Wine.renderWineTOC()
        CommentApi.fetchComments()
        event.target.className = "activated"
        

    } else if (event.target.innerText === "Year") {
        const wines = Wine.sortWineYear()
        Wine.sortFilterDOMBy(wines)
        CommentApi.fetchComments()
        event.target.className = "activated"

    } else if (event.target.innerText === "Price") {
        const wines = Wine.sortWinePrice()
        Wine.sortFilterDOMBy(wines)
        CommentApi.fetchComments()
        event.target.className = "activated"

    } else if (event.target.innerText === "Country") {
        const wines = Wine.alphaSortCountry()
        Wine.sortFilterDOMBy(wines)
        CommentApi.fetchComments()
        event.target.className = "activated"

    }
}

function clearBtnActivation() {
    document.querySelector(`#wine-sort-btn`).classList.remove("activated")
    document.querySelector(`#year-sort-btn`).classList.remove("activated")
    document.querySelector(`#price-sort-btn`).classList.remove("activated")
    document.querySelector(`#country-sort-btn`).classList.remove("activated")
}

function handleFilter(event) {
    filteredTotal.innerText = ""
    if (event.target.value === "All Wines") {
        Wine.sortTable()
        Wine.renderWineTOC()
        CommentApi.fetchFilteredComments(Wine.all)

    } else if (event.target.value === "Unopened") {
        const unopenedWines = Wine.all.filter(wine => wine.opened === false || wine.opened === "")
        Wine.sortFilterDOMBy(unopenedWines)
        CommentApi.fetchFilteredComments(unopenedWines)
        filteredTotal.innerText = ` (${unopenedWines.length})`

    } else if (event.target.value === "Opened") {
        const openedWines = Wine.all.filter(wine => wine.opened === true || wine.opened === "true")
        Wine.sortFilterDOMBy(openedWines)
        CommentApi.fetchFilteredComments(openedWines)
        filteredTotal.innerText = ` (${openedWines.length})`

    } else {
        const countryWines = Wine.all.filter(wine => wine.country === event.target.value)
        Wine.sortFilterDOMBy(countryWines)
        CommentApi.fetchFilteredComments(countryWines)
        filteredTotal.innerText = ` (${countryWines.length})`
        
    }
}

WineApi.fetchWines()