



let cart = [
    { name: "Pen", price: 10 },
    { name: "Book", price: 50 }
];
cart.push({ name: "Pencil", price: 5 });

cart.pop();

const total = cart.reduce((sum, item) => sum + item.price, 0);
console.log("Total price:", total);