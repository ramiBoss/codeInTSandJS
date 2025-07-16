// Author: ramiBoss
var output = (function(x){
  delete x;
  return x;
});

console.log(output(5));
