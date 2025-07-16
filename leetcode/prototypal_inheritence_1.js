// Author: ramiBoss

function Employee(){
  this.name = 'ramesh';
  this.dept = 'general';
}

function WorkBee(){
  this.projects = [];
}

WorkBee.prototype = new Employee;

let amy = new WorkBee;

console.log(amy.dept);
