

function lps(str){
  let max_length=0, maxString=null;
  let len;
  let length = str.length;
  for(let i=0; i<length; i++ ){
    for(let j=i+1; j<=length; j++){
      len = j-i;
      subString = str.substring(i, j);
      console.log(subString);
      if(isPalindrome(subString)){
        if(len > max_length){
          max_length = len;
          maxString=subString;
        }
      }
    }
  }
  console.log(max_length);
  return maxString;
}

function isPalindrome(str){
  let i=0, j=str.length-1;
  // console.log(j);
  while(i<=j){
    console.log("Comparison: " + str.charAt(i) + " " + str.charAt(j));
    if(str.charAt(i) !== str.charAt(j)){
      console.log(str + " " + false);
      return false;
    }
    i++;
    j--;
  }
  return true;
}

function lpsdp(str){
  let length = str.length;
  let table = new Array(length);
  for(let i=0;i<table.length;i++){
    table[i] = new Array(length);
  };

  for(let i=0;i<table.length;i++){
    for(let j=0;j<table.length;j++){
      table[i][j] = 0;
    }
  }


  for(let i=0;i<length;i++){
    table[i][i]=1;
  }

  for(let i=0;i<length;i++){
    if(str[i] == str[i+1]){
      table[i][i+1]=1;
    }
  }

  for(let l=2;l<length;l++){
    for(let i=0;i<length-l;i++){
      let j=i+l;
      if(str.charAt(i) == str.charAt(j) && table[i+1][j-1] == 1){
        table[i][j]=1;
      }
    }
  }

  console.log(table);

}

function main(){
  let string="ABBCBD";
  // console.log(lps(string));
  lpsdp(string);
}

main();
