
import express from 'express';
import ProductManager from './main.js';

const PORT = 3000;
const app = express();
const productManager = new ProductManager();

app.get ('/products', async (req, res) => {
    const limit = +req.query.limit || 0;
    const products = await productManager.getProducts(limit);

    res.send ({status: 1, payload: products})
});

app.get ('/products/:pid', async (req, res) => {
    const product = await productManager.getProductById(req.params.pid);

    res.send ({status: 1, payload: product})
})

app.listen ( PORT, () => { console.log (`Servidor activo en puerto ${PORT}`); });