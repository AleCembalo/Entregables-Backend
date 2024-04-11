import fs from 'fs';

class ProductManager {

    constructor() {
        this.products = [];
        this.path = './products.Json';
        this.id = 1;
    }

    async writeFile() {
        const data = JSON.stringify(this.products, null, 2);
        try {
            await fs.promises.writeFile(this.path, data);
        } catch(err) {
            console.error(err.message)
        }        
    }

    async readFile () {
        try{
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = await JSON.parse(data);
            this.products = products;
            return this.products;
        } catch(err) {
            console.error(err.message)
        }
    }

    async addProduct(product) {
        const exist = this.products.some((p) => p.code === product.code);

        if (product.title && product.description && product.price && product.thumbnail &&
            product.code && product.stock !== '') {
            if (exist) {
                console.log("El código ya existe");
            } else {
                product.id = this.id++;
                this.products.push(product);
                console.log("Producto agregado correctamente");
                await this.writeFile();
            }
        } else {
            console.log("Debe completar todos los campos");
        }
    }

    async getProducts() {
        this.readFile();
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((p) => p.id === id);
        return product;
    }

    async deleteById (id) {
        const updatedProducts = this.products.filter((product) => product.id !== id);
        const updatedData = JSON.stringify(updatedProducts, null, 2);
        this.products = updatedProducts;

        try {
            await fs.promises.writeFile(this.path, updatedData);
            console.log ("Se eliminó el producto");
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    }
}    



const productManager = new ProductManager();

// Agregar productos

productManager.addProduct({
    title: "Producto 1",
    description: "Descripción 1",
    price: 100,
    thumbnail: "ruta/imagen1",
    code: "cod1",
    stock: 10,
});

productManager.addProduct({
    title: "Producto 2",
    description: "Descripción 2",
    price: 200,
    thumbnail: "ruta/imagen2",
    code: "cod2",
    stock: 5,
});

productManager.addProduct({
    title: "Producto 3",
    description: "Descripción 3",
    price: 150,
    thumbnail: "ruta/imagen3",
    code: "cod3",
    stock: 20,
});

productManager.addProduct({
    title: "Producto 4",
    description: "Descripción 4",
    price: 150,
    thumbnail: "ruta/imagen4",
    code: "cod4",
    stock: 20,
});


// mostrar productos agregados

productManager.getProducts();
console.log(productManager);

// mostrar productos por ID

const producto = productManager.getProductById(1);
console.log(producto);

// const prod = productManager.deleteById(2);
// console.log (prod);