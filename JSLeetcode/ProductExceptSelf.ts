const productExceptSelf = (nums: number[]) => {
	if(nums.length === 0){
		return [];
	}

	let prefixSum = 1;
	const result: number[] = [];

	for(let i = 0; i < nums.length - 1; i++){
		result[i] = prefixSum;
		prefixSum *= nums[i];
	}

	let suffixSum = 1;

	for(let i =nums.length-1; i >=0; i--){
		result[i] *= suffixSum;
		suffixSum *= nums[i]
	}

	return result;
	
}




enum Marker {
	X='X',
	O='O',
	EMPTY='_'
}


class Player {
	constructor(private name: string, private marker: Marker){};

	getName(){
		return this.name;
	}

	getMarker(){
		return this.marker
	}
}

class Cell {
	constructor(private marker: Marker = Marker.EMPTY){};

	setMarker(marker: Marker){
		this.marker
	}

	getMarker(){
		return this.marker
	}

}