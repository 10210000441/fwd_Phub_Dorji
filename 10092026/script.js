//Part One//
//Question 2//
let score = 0;
score = 10;

const studentName = "Pema";
console.log (studentName);

//Question 3//
let name = "Pema";
console.log(typeof name); 

let age = 19;
console.log(typeof age);

let isEnrolled = true;
console.log(typeof isEnrolled);

//Question 4//
console.log("Hi " + name + ", you are " + age + ".");
console.log(`Hi ${name}, you are ${age}.`);

//Question 5//
console.log(5 + 3);
console.log("5" + 3);
console.log(5 === "5"); 
console.log(5 === 5);
console.log(5 > 3 && 3 > 1); 
console.log(5 > 3 || 1 > 3); 

//Question 6//
let mark = 82;
if (mark >= 90) {
console.log("A");
} else if (mark >= 75) {
console.log("B");
} else {
console.log("Needs improvement");
};

//Question 7//
for (let i = 1; i <= 3; i++) {
console.log(i);
};
let countdown = 3;
while (countdown > 0) {
console.log(countdown);
countdown--;
};

//Question 8//
const subjects = ["HTML", "CSS", "JavaScript"];
console.log(subjects[0]); // "HTML"
console.log(subjects.length); // 3
subjects.push("Git"); // adds to the end
subjects.pop(); // removes the last item
for (const subject of subjects) {
console.log(subject);
};

//Question 9//
const student = {
name: "Pema",
age: 19,
subjects: ["HTML", "CSS"],
greet: function () {
return `Hi, I'm ${this.name}.`;
},
};
console.log(student.name);
console.log(student.greet()); 

//Question 10//
function add(a, b) {
return a + b;
}
const addArrow = (a, b) => a + b;
const btn = document.querySelector("#myBtn");
btn.addEventListener("click", () => {
document.querySelector("#title").textContent = "Clicked!";
});

