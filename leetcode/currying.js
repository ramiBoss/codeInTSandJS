// Author: ramiBoss
// currying example

function mul(a){
	return function(b){
		return function(c){
			return a*b*c;
		}
	}
}

function main(){
	console.log("1*2*3: " + mul(1)(2)(3));
	console.log("2*3*4: " + mul(2)(3)(4));
	console.log("4*5*6: " + mul(4)(5)(6));
	console.log("6*7*8: " + mul(6)(7)(8));
}

main();
