// Author: ramiBoss
// empty and array in JS

function assign_empty_array(){
	console.log(" Assign Empty Array");
	let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	console.log("Array Length Before: " + array.length);
	array = [];
	console.log("Array Length After: " + array.length);
}

function make_length_zero(){
	console.log("Make Length Zero");
	let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	console.log("Array Length Before: " + array.length);
	array.length = 0;
	console.log("Array Length After: " + array.length);
}

function use_splice(){
	console.log("Clear array using splice");
	let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	console.log("Array Length Before: " + array.length);
	array = array.splice(0, array.length);
	console.log("Array Length After: " + array.length);
}

function manually_clear_array(){
	console.log("Manualy pop the elements of the array");
	let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	console.log("Array Length Before: " + array.length);
	while(array.length){
		array.pop();
	}
	console.log("Array Length After: " + array.length);
}
function main(){
	assign_empty_array();
	make_length_zero();
	use_splice();
	manually_clear_array();
}
main();
