const mat = Array.from({ length: rows }, () => new Array(columns).fill(0));

function f1(map, y1, x1, y2, x2){
  let score = 0;
  let numberSteps = 0;

  let rows = map.length;
  let columns = map[0].length;

  if(fCorrectPlace(map, y1, x1, y2, x2, rows, columns)){
    score = getScore(map[y1][x1],map[y2][x2]);
  }
  



  numberSteps = fNumberSteps(map);

}
function fCorrectPlace(map, y1, x1, y2, x2, rows, columns){
  flagCorrect = 2;
  flagVoidNumbers = 1;

  if(y1 !== y2 || x1 !== x2) flagCorrect = 0;
  if(!flagCorrect && y1 === y2){
    if(flagVoidBetweenOnStr(y1, x1, x2)) flagCorrect = 1;
  }
  if(!flagCorrect && x1 === x2){
    flagVoidNumbers = 1;
    for(let i = y1 + 1;i<y2;i++){
      if(map[i][x1] !== 0){
        flagVoidNumbers = 0;
        break;
      }
    }
    if(flagVoidNumbers) flagCorrect = 1;
  }
  if(!flagCorrect && (y1 + 1) === y2){
    if(flagVoidBetweenOnStr(y1, x1, rows - 1) \
      && flagVoidBetweenOnStr(y2, 0, x2)) flagCorrect = 1;
  }
  if(flagCorrect = 2) flagCorrect = 0;
  return flagCorrect;
}
function fVoidBetweenOnStr(y, x1 ,x2){
  flagVoid = 1;
  for(let i = x1 + 1;i<x2;i++){
    if(map[y][i] !== 0){
      flagVoid = 0;
      break;
    }
  }
  return flagVoid;
}
function getScore(a, b){
  let score = 0;
  if(a === b) {
    score = 1;
    if(a === 5) score+=2;
  }
  else if(a + b === 10) score = 2;
  return score;
}

