console.log("Hello World");
console.warn("Warning: This is a warning message");
console.error("Error: This is an error message");

myFunction = () =>{
    console.log("Button clicked!");
    alert("Button clicked!");
}

ConfirmBtn = () => {
    var a = confirm("Are you sure you want to proceed?")
    console.log(a);
    if(a) {
        console.log("User clicked OK");
    } else {
        console.log("User clicked Cancel");
    }
}

promptBtn = () => {
    var name = prompt("Please enter your name:");
    if(name) {
        console.log("Hello " + name);
        alert("Hello " + name);
    } else {
        console.log("No name entered");
        alert("No name entered");
    }
}









