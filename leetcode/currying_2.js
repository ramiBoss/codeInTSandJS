// Author: ramiBoss
//currying 2

function createBase(base){
	return function(n){
		return base + n;
	}
}

function main(){
	console.log("Calculation with base 6");
	let c = createBase(6);
	console.log("10: " + c(10));
	console.log("20: " + c(20));
	console.log("Calculation with base 8");
	let d = createBase(8);
	console.log("10: " + d(10));
	console.log("20: " + d(20));
}

main();
