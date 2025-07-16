// Author: ramiBoss

function Employee(name, dept){
  this.name = name || '';
  this.dept = dept || 'general';
}

function Engineer(name, dept){
  this.name = name;
  this.dept = dept;
  this.projects = [];
}

Engineer.prototype = new Employee(this.name, this.dept);

let ramiz = new Engineer('ramiz', 'development');

// ramiz.name = 'ramiz';
// ramiz.dept = 'Development';
ramiz.projects.push("coupons Management");
Employee.prototype.company = 'none';
console.log(ramiz.name);
console.log(ramiz.projects);
console.log(ramiz.company);
