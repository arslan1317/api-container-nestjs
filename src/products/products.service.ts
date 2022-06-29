import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductsService {
    private products: Product[]  = [];

    insertProduct(title: string, desc: string, price: number) {
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, desc, price);
        this.products.push(newProduct)
        return prodId;
    }

    getAllProducts() {
        return [...this.products];
    }

    getProduct(prodId: string) {
        const product = this.findProduct(prodId)[0];
        return {...product}; 
    }

    updateProduct(productId: string, title: string, desc: string, price: number) {
        const [product, index] = this.findProduct(productId);
        const updatedProduct = {...product}
        if(title) {
            updatedProduct.title = title
        }
        if(desc) {
            updatedProduct.description = desc
        }
        if(price) {
            updatedProduct.price = price
        }
        this.products[index] = updatedProduct
    }

    deleteProductById (prodId: string) {
        const productIndex = this.findProduct(prodId)[1];
        this.products.splice(productIndex, 1)
    }

    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex((prod) => prod.id === id);
        const product = this.products[productIndex]
        if(!product) {
            throw new NotFoundException('Could not find product!');
        }

        return [product, productIndex]
    }

}