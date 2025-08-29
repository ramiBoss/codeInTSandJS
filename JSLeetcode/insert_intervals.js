// Author: ramiBoss
// insert interval

class Interval{
  constructor(start, end){
    this.start = start;
    this.end = end;
  }
}


function insert(intervals, newInterval){
  let result = [];
  for(let interval of intervals){
    if(interval.end < newInterval.start){
      result.push(interval);
    }else if(interval.start > newInterval.end){
      result.push(newInterval);
      newInterval = interval;
    }else if(interval.end > newInterval.start){
      newInterval = new Interval(Math.min(interval.start, newInterval.start), Math.max(interval.end, newInterval.end));

    }
  }
  result.push(newInterval);
  return result;
}

function main(){
  let intervals = [new Interval(1, 2), new Interval(3, 5), new Interval(6, 7), new Interval(8, 10), new Interval(12, 16)];
  let newInterval = new Interval(4, 9);

  console.log(JSON.stringify(insert(intervals, newInterval)));
}

main();
