class Wine {
    static all = []

    constructor({id, wine, region, country, year, price, opened, image, rating}) {
        this.id = id
        this.wine = wine
        this.region = region
        this.country = country
        this.year = year
        this.price = price
        this.opened = opened
        this.image = image
        this.rating = rating

        this.tr = document.createElement("tr")

        Wine.all.push(this)
    }


}