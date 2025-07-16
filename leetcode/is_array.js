// Author: ramiBoss
// How to check if an object is an array or not?

function checkArray(){
	let array = [1, 2, 3, 4, 5, 6];
	console.log(array + " is an array: " + Array.isArray(array));
	let object = {
		array: [1, 2, 3, 4, 5, 6],
	};
	console.log(JSON.stringify(object) + " is an array: " + Array.isArray(object));
}

function main(){
	checkArray();
}

main();
