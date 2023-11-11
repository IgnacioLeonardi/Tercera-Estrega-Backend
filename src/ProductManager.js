import fs from 'fs/promises'
import { Product } from './Product.js'


let id = 0
export class ProductManager {
    #path
    constructor(path) {
        this.#path = path
    }


    async getProducts() {
        const products = JSON.parse(await fs.readFile(this.#path, 'utf-8'));
        return products;
    }


    async addProduct(dataProduct) {
        let products = await this.getProducts();
        try {
            for (let obj of products) {
                if (obj.code === dataProduct.code) {
                    throw new Error('El codigo de producto ya existe.');
                } else {
                    for (let product of products) {
                        if (product.id > id) {
                            id = product.id;
                        }
                    }
                    dataProduct.id = id + 1
                    const newProducts = JSON.parse(await fs.readFile(this.#path, 'utf-8'))
                    const newProduct = new Product(dataProduct)
                    newProducts.push(newProduct)
                    await fs.writeFile(this.#path, JSON.stringify(newProducts, null, 2))
                    return newProduct
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }


    async getProductsById(id) {

        const filterById = await this.getProducts();
        const filter = filterById.find((p) => p.id === id);

        if (!filter) {
            return console.error(`El producto con ID: ${id} no existe.`);
        } else{
            return filter
        }
    }


    async updateProduct(idProduct, updateData) {
        const products = await this.getProducts();
        try {
            const product = products.find((p) => p.id === idProduct);
            if (!product) {
                throw new Error(`El producto con ID: ${idProduct} no es correcto.`);
            }
            for (let key in updateData) {
                if (product.hasOwnProperty(key)) {
                    product[key] = updateData[key];
                }
            }
            await fs.writeFile(this.#path, JSON.stringify(products, null, 2));
            return console.log("El producto se actualizo correctamente")
        } catch (error) {
            console.log(error.message);
        }
    }


    async deleteProduct(id) {
        if (typeof id !== 'number' || isNaN(id)) {
            throw new Error(`No se reconoce "${id}" como id valido`);
        }
        const data = await this.getProducts();
        const products = data.filter((product) => product.id !== id);
        try {
            if (data.length === products.length) {
                throw new Error(`El producto con ID: ${id} no existe`);
            } else {
                await fs.writeFile(this.#path, JSON.stringify(products, null, 2));
                console.log(`El producto con ID: ${id} fue eliminado`);
            }
        } catch (error) {
            console.log(error.message);
        }
    }
}

const producto1 = {
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'absdfdsffdgsdfsfhfgh23',
    stock: 25
}
const producto2 = {
    title: 'producto modificado',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abcsdfsdfsdf145',
    stock: 25
}

// const jsonInicial = await newProducto.getProducts()
// console.log(jsonInicial)

// const nuevo2 = await newProducto.addProduct(producto2)
// console.log(nuevo2)

// const mostrarProductos = await newProducto.getProducts()
// console.log(mostrarProductos)

// const filtroPorId = await newProducto.getProductsById(4)
// console.log(filtroPorId)

// const deleteForId = await newProducto.deleteProduct(2)

// const modificarProducto = await newProducto.updateProduct(150, producto2)

