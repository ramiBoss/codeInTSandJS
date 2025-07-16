// Author: ramiBoss

let array1 = new Array("Apple", "mango", "pineapple", "peach");
let array2 = ["fish", "hen", "Buffalo", "Cow", "Goat"];

let skills = ["ReactJs", "Redux", "javaScript", "Java", "Python", "HTML5"];
console.log("Array State: " + skills);
console.log("popped: " + skills.pop());
console.log("Array State: " + skills);
console.log("pushed: " + skills.push('Git'));
console.log("Array State: " + skills);
console.log("shift: " + skills.shift());
console.log("Array State: " + skills);
console.log("unshift: " + skills.unshift("Angular"));
console.log("Array State: " + skills);

for(let skill of skills)
  console.log(skill);

console.log(skills.toString());

console.log("Array State: " + skills);
let output = skills.splice(1, 2, "Agile");
console.log("Splice: " + output);
console.log("Array State: " + skills);

output = skills.slice(1, 4);
console.log("Slice: " + output);
console.log("Array State: " + skills);
let newArray = skills.concat(array1, array2);
console.log("Array State: " + newArray);

console.log("indexOf: " + skills.indexOf("Java"));
skills.push("Java");
console.log("lastIndexOf: " + skills.lastIndexOf("Java"));

let result = skills.find(skill => skill === 'Nuts');
console.log("find: " + result);

result = skills.filter(skill => skill.startsWith('J'));
console.log("filter: " + result);

result = skills.filter(skill => skill.endsWith('t'));
console.log("filter: " + result);

result = skills.filter(skill => skill.includes('t'));
console.log("filter: " + result);
