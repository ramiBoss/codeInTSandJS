import { Inventory } from "./Inventory";
import { VendingMachine } from "./VendingMachine";

function VendingMachineDemo() {
    console.log("Vending Machine Demo");

    const inventory = new Inventory();
    inventory.addProduct({ name: "Soda", price: 125 }, 10);
    inventory.addProduct({ name: "Chips", price: 100 }, 5);
    inventory.addProduct({ name: "Candy", price: 65 }, 20);
    const vendingMachine = new VendingMachine(inventory);
    vendingMachine.insertCoin(Coin.DOLLAR);
    console.log(`Balance after inserting a dollar: ${vendingMachine.getBalance()}`);
    try {
        vendingMachine.selectProduct("Soda");
        console.log("Product dispensed: Soda");
    } catch (error) {
        console.error(error.message);
    }
    const refund = vendingMachine.refund();
    console.log(`Refunded amount: ${refund}`);
    console.log(`Final Balance: ${vendingMachine.getBalance()}`);
    console.log(`Vending Machine State: ${vendingMachine.getState()}`);


    
}

VendingMachineDemo();