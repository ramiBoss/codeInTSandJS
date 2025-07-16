// Author: ramiBoss

function Employee(){
  this.name = '';
  this.dept = 'general';
}

function Manager(){
  Employee.call(this);
  this.reports = [];
}

Manager.prototype = Object.create(Employee.prototype);
Manager.prototype.constructor = Manager;

function WorkBee(){
  Employee.call(this);
  this.projects = [];
}

WorkBee.prototype = Object.create(Employee.prototype);
WorkBee.prototype.constructor = WorkBee;

function SalesPerson(){
  WorkBee.call(this);
  this.dept = 'sales';
  this.quota = 100;
}

SalesPerson.prototype = Object.create(WorkBee.prototype);
SalesPerson.prototype.constructor = SalesPerson;



let saif = new SalesPerson;
saif.name = 'saif';
saif.dept = 'sales';
console.log(saif.name);
