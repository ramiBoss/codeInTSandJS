// Example usage
const inventory = new Inventory();
const cola = new Product("Cola", 1.25);
const chips = new Product("Chips", 1.00);

inventory.addProduct(cola, 10);
inventory.addProduct(chips, 5);

console.log(inventory.getInventory());

inventory.removeProduct("Cola", 2);
console.log(inventory.getInventory());

inventory.removeProduct("Chips", 5);
console.log(inventory.getInventory());

try {
    inventory.removeProduct("Chips", 1); // This will throw an error
} catch (error) {
    console.error(error.message);
}

// Output:
// Map(2) { 'Cola' => { product: Product { name: 'Cola', price: 1.25 }, quantity: 10 },
//          'Chips' => { product: Product { name: 'Chips', price: 1 }, quantity: 5 } }
// Map(2) { 'Cola' => { product: Product { name: 'Cola', price: 1.25 }, quantity: 8 },
//          'Chips' => { product: Product { name: 'Chips', price: 1 }, quantity: 5 } }
// Map(1) { 'Cola' => { product: Product { name: 'Cola', price: 1.25 }, quantity: 8 } }
// Product Chips not found in inventory.
// Not enough quantity of Chips to remove.
// Error: Product Chips not found in inventory.
// Error: Not enough quantity of Chips to remove.