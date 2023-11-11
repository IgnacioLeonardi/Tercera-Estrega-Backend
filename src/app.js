import express from "express";
import { ProductManager } from "./ProductManager.js";

const app = express();

app.use(express.urlencoded({extended:  true}));
app.use(express.json());

const newProducto = new ProductManager('./database/products.json')

app.get("/products", async (req, res) => {
    let limit = req.query.limit;
    const products = await newProducto.getProducts();
    if(!limit) {
        return res.json(products)
    }
    let productLimit = products.slice (0, limit)
    return res.json(productLimit)
})

app.get("/products/:id", async (req, res) =>{
    const id = parseInt(req.params.id);
    try {
        const searchId = await newProducto.getProductsById(id)
        return res.json({ searchId })
    } catch (error) {
        res.json({ message: error.message })
    }
})

app.listen(8080, () => console.log("Servidor cargado correctamente en puerto 8080"));