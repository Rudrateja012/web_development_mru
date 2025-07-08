class product{
    constructor(itemName,price,quantity){
        this.itemName = itemName;
        this.price = price;
        this.quantity = quantity;
    }

    getTotalPrice() {
        return this.price * this.quantity;
    }
}
const product1 = new product("banana", 500, 2);
const product2 = new product("apple", 125, 1);


console.log(`Total price of ${product1.itemName} is ${product1.getTotalPrice()}`);
console.log(`Total price of ${product2.itemName} is ${product2.getTotalPrice()}`);

