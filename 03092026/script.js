

function sayHello(){
	console.log("Hello DIT CE!");
}
sayHello ();

function add(a,b,c,pg){
	return a+b+c/pg;
}
console.log(add(3,2,99,2)); 
console.log(add('C','RAJ',44,2));

const karma = document.querySelector('#karma');
karma.addEventListener("click",() => {
	console.log('Button Was Clicked');
});   

let score = 0;
score = 10;

const studentName = "Pema";
console.log (studentName);

let name = "Pema";
console.log(typeof name); 

let age = 19;
console.log(typeof age);

let isEnrolled = true;
console.log(typeof isEnrolled);

let subjects = ["HTML", "CSS"];
console.log(typeof subjects); 

console.log("Hi " + name + ", you are " + age + ".");
console.log(`Hi ${name}, you are ${age}.`);
