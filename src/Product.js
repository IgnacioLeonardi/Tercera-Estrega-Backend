function notNull(value) {
    if (!value) {
        throw new Error('Todos los campos deben estar completos.')
    }
    return (value)
}
function notNullAndNumber(value) {
    if (!value || typeof value !== 'number' || isNaN(value)) {
        throw new Error('Todos los campos deben estar completos y deben ser caracteres numericos.')
    }
    return (value)
}

export class Product {
    #price
    constructor({ id, title, price, description, thumbnail, code, stock }) {
        this.id = id
        this.title = notNull(title)
        this.description = notNull(description)
        this.price = notNullAndNumber(price)
        this.thumbnail = notNull(thumbnail)
        this.code = notNull(code)
        this.stock = notNullAndNumber(stock)
    }
    get price() {
        return this.#price
    }
    set price(newPrice) {
        if (newPrice <= 0) throw new Error('El precio no puede ser menor a 0')
        this.#price = newPrice
    }
    asPOJO() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            price: this.price,
            thumbnail: this.thumbnail,
            code: this.code,
            stock: this.stock
        }
    }

}