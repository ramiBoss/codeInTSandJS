// Author: ramiBoss
//How would you check if a number is an integer

function isInt(number){
	return number%1 === 0;
}

function main(){
	let num = 10;
	console.log(num + " is Integer: " + isInt(num));
	num = 10.5;
	console.log(num + " is Integer: " + isInt(num));
	num = "Hello";
	console.log(num + " is Integer: " + isInt(num));
}

main();
