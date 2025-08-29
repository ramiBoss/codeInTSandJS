// Author: ramiBoss

//stock exchange problem.


function getMaxProfit(prices){
	let n = prices.length;
	let i = 0;
	if(n <= 1){
		return 0;
	}

	while(i < n-1){
		if(prices[i] > prices[i+1]){
			i++;
		}else{
			break;
		}
	}

	let buy = prices[i];

	while(i < n-1){
		if(prices[i] < prices[i+1]){
			i++;
		}else{
			break;
		}
	}

	let sell = prices[i];

	return (sell-buy);
}

function main(){
	let prices = [1];
	console.log("Profit: " + getMaxProfit(prices));
}

main();
