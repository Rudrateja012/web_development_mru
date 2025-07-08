class Student {
    constructor(name, roll, marks) {
        this.name = name;
        this.roll = roll;
        this.marks = marks;
    }
    
    getGrade() {
        if(this.marks >= 90) {
            return "A+";
        }
        else if(this.marks >= 80) {
            return "A";
        }
        else if(this.marks >= 70) {
            return "B+";
        }
        else if(this.marks >= 60) {
            return "B";
        }
        else if(this.marks >= 50) {
            return "C";
        }
        else {
            return "F";
        }
    }
}

const stu1 = new Student("Rudra", 358, 75);
const stu2 = new Student("Rajeev", 320, 85);
const stu3 = new Student("Dhana", 350, 60);
console.log(stu1.name+" "+stu1.getGrade()+" Grade");
console.log(stu2.name+" "+stu2.getGrade()+" Grade");
console.log(stu3.name+" "+stu3.getGrade()+" Grade");
console.log("Total Students: 3");
console.log("Total Marks: " + (stu1.marks + stu2.marks + stu3.marks));
console.log("Average Marks: " + ((stu1.marks + stu2.marks + stu3.marks) / 3).toFixed(2));
console.log("Highest Marks: " + Math.max(stu1.marks, stu2.marks, stu3.marks));
console.log("Lowest Marks: " + Math.min(stu1.marks, stu2.marks, stu3.marks));



