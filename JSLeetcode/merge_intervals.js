// Author: ramiBoss

// merge intervals

class Interval{
  constructor(start, end){
    this.start = start;
    this.end = end;
  }
}

function merge(intervals){
  let prev = intervals[0];
  let result = [];
  for(let i=1; i<intervals.length; i++){
    if(prev.end > intervals[i].start){
      let merged = new Interval(prev.start, Math.max(prev.end, intervals[i].end));
      prev = merged
    }else{
      result.push(prev);
      prev = intervals[i];
    }
  }
  result.push(prev);

  return result;
}

function main(){
  let intervals = [new Interval(1, 3), new Interval(2, 6), new Interval(8, 10), new Interval(15, 18)];
  console.log(JSON.stringify(merge(intervals)));
}

main();
