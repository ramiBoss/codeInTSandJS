// Author: ramiBoss

// Given a string, reverse each word in the sentence

function getSeperator(){
	let seperator = " ";
	return seperator;
}

function reverseSentence(sentence){
	let seperator = getSeperator();
	return sentence.split(seperator).reverse().join(seperator);
}

function main(){
	let sentence = "Welcome aboard to our beautiful planet";
	console.log("Reversed Output: " + reverseSentence(sentence));
}

main();
