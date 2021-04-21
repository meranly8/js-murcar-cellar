const baseURL = "http://localhost:3000"

const wineTOCList = document.querySelector("#wine-toc-list")

const wineTable = document.querySelector("#wine-table")

const addWineBtn = document.querySelector("#add-wine-btn")

addWineBtn.state = "Closed"
addWineBtn.addEventListener("click", showWineForm)

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

function handleNewWineSubmit(event) {
    event.preventDefault()
    WineApi.createWine()
    wineForm.reset()
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

WineApi.fetchWines()
