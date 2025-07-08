
function Assignment1() {
  var Name = prompt("Enter your name:");
  console.log("Hello " + Name + "!");
  alert("Hello " + Name + "!"+" Welcome to the JavaScript assignment.");
}

function Assignment2() {
  var num1 = Number(prompt("Enter first number:"));
  var operation = prompt("Enter operation (+, -, *, /):");
  var num2 = Number(prompt("Enter second number:"));
  var result;
  switch (operation) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      if (num2 !== 0) {
        result = num1 / num2;
      } else {
        alert("Cannot divide by zero.");
        return;
      }
      break;
    default:
      alert("Invalid operation.");
      return;
  }
  console.log(`The result of ${num1} ${operation} ${num2} is: ${result}`);
  alert(`The result of ${num1} ${operation} ${num2} is: ${result}`);
}
function Assignment3() {
  var length = Number(prompt("Enter the length of the rectangle:"));
  var width = Number(prompt("Enter the width of the rectangle:"));
  var area = length * width;
  console.log(`The area of the rectangle is: ${area}`);
  alert(`The area of the rectangle is: ${area}`);
}

var date = new Date();
var year = date.getFullYear();
function Assignment4() {
  var birthYear = Number(prompt("Enter your birth year:"));
  if (birthYear > year) {
    alert("Birth year cannot be in the future.");
    return;
  }
  var age = year - birthYear;
  console.log(`You are ${age} years old.`);
  alert(`You are ${age} years old.`);
}

function Assignment5() {
  var num1 = Math.floor(Math.random() * 10);
  var num2 = Math.floor(Math.random() * 10);
  var answer = num1 + num2;
  var userAnswer = Number(prompt(`What is ${num1} + ${num2}?`));

  if (userAnswer === answer) {
    console.log("Correct!");
    alert("Correct!");
  } else {
    console.log(`Incorrect! The correct answer is ${answer}.`);
    alert(`Incorrect! The correct answer is ${answer}.`);
  }
}
