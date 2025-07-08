class Vehicle{
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    getDetails() {
        return `${this.year} ${this.brand} ${this.model}`;
    }
}

class Bike extends Vehicle {
    constructor(brand, model, year, engineType) {
        super(brand, model, year);
        this.engineType = engineType;
    }

    getDetails() {
        return `${super.getDetails()} - ${this.engineType}`;
    }
}

let bike1 = new Bike("TVS","Ntorq",2022,"Petrol");
let bike2 = new Bike("TVS","Apache",2022,"Petrol");


console.log(bike1.getDetails());
console.log(bike2.getDetails());






