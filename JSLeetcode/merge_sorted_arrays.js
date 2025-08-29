// Author: ramiBoss

// merge sorted arrays

function mergeArrays(theMatrix){
	let n = theMatrix.length;
	let mergedList = [];
	for(let i=0; i<n; i++ ){
		mergedList = [...mergedList, ...theMatrix[i]];
		mergedList.sort((a,b) => a-b);
	}
	return mergedList;
}

function main(){
	let theMatrix = [
						[1,5,7,9],
						[2,3,6],
						[4,5,6,7],
						[8,9,10,11]
					];

	console.log("The mergedList: " + mergeArrays(theMatrix));
}

main();
