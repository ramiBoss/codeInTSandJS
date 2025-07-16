// Function to reverse a string using recursion
const ReverseString = (str: string) => {
    if(str.length <= 1) {
        return str;
    }
    return ReverseString(str.slice(1)) + str.charAt(0);
}

const ReverseString2 = (str: string) => {
	if(str.length <= 1){
		return str;
	}
	return str.split('').reverse().join('');
}

const ReverseString3 = (str: string) => {
	if(str.length <= 1){
		return str;
	}

	const chars = str.split('');
	let reversed: string[] = [];

	for(let i = str.length-1; i >= 0; i--) {
		reversed.push(chars[i]);
	}

	return reversed.join('');
}

const ReverseString4 = (str: string) => {
    return str.split('').reverse().join('');
}

const ReverseString5 = (str: string) => {
    return Array.from(str).reverse().join('');
}

const ReverseString6 = (str: string) => {
    if(str.length <= 1) return str;
    
    let reversed = '';
    for(let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}

// Function to check if a string is a palindrome
const checkPalindrome = (str: string) => {
	if(str.length <= 1) {
		return true
	}

	if(str.charAt(0) !== str.charAt(str.length-1)) {
		return false;
	}

	let reversed = str.split('').reverse().join('');
	
	return str === reversed;
}


const checkPalindrome2 = (str: string) => {
	if(str.length <= 1) {
		return true
	}

	if(str.charAt(0) !== str.charAt(str.length-1)) {
		return false;
	}

	let i = 0, j = str.length-1;

	while(i < j) {
		if(str.charAt(i) !== str.charAt(j)) {
			return false;
		}
		i++;
		j--;
	}
	return true;
}