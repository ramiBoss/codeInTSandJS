import { Product } from "./Product";

export class Inventory {  
    private products: Map<string, { product: Product; quantity: number }> = new Map();

    /**
     * Adds a product to the inventory.
     * @param {Product} product - The product to add.
     * @param {number} quantity - The quantity of the product to add.
     */
    addProduct(product: Product, quantity: number): void {
        if (this.products.has(product.name)) {
            const existing = this.products.get(product.name);
            if (existing) {
                existing.quantity += quantity;
            }
        } else {
            this.products.set(product.name, { product, quantity });
        }
    }

    /**
     * Removes a product from the inventory.
     * @param {string} productName - The name of the product to remove.
     * @param {number} quantity - The quantity of the product to remove.
     */
    removeProduct(productName: string, quantity: number): void {
        const existing = this.products.get(productName);
        if (existing) {
            if (existing.quantity >= quantity) {
                existing.quantity -= quantity;
                if (existing.quantity === 0) {
                    this.products.delete(productName);
                }
            } else {
                throw new Error(`Not enough quantity of ${productName} to remove.`);
            }
        } else {
            throw new Error(`Product ${productName} not found in inventory.`);
        }
    }

    /**
     * Gets the current inventory.
     * @returns {Map<string, { product: Product; quantity: number }>} The current inventory.
     */
    getInventory(): Map<string, { product: Product; quantity: number }> {
        return this.products;
    }
}

