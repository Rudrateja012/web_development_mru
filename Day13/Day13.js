// Function Declaration
function add(a, b) {
    return a + b;
}

// Function Expression
const multiply = function(a, b) {
    return a * b;
};

// Arrow Function
const square = x => x * x;

// Hoisting Example
console.log(hoisted(5)); // Works due to hoisting
function hoisted(x) {
    return x + 10;
}

// Callback Function Example
function greet(name, callback) {
    return callback(name);
}
const sayHello = name => `Hello, ${name}!`;
console.log(greet("Rudra", sayHello));

// Reusable Function: Capitalize
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Function Composition Example
function double(x) {
    return x * 2;
}
function increment(x) {
    return x + 1;
}
// Compose: increment(double(5)) = 11
const composed = increment(double(5));
console.log(composed);

// Generic compose function
function compose(f, g) {
    return function(x) {
        return f(g(x));
    };
}
const incThenDouble = compose(double, increment);
console.log(incThenDouble(5)); // (5+1)*2 = 12

// Callback with Array
const nums = [1, 2, 3, 4];
const squares = nums.map(square);
console.log(squares); // [1, 4, 9, 16]