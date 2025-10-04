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