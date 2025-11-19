const mat = Array.from({ length: rows }, () => new Array(columns).fill(0));



function fNextStep(map, y1, x1, y2, x2){
  let rows = map.length;
  let columns = map[0].length;
  let score = fGetScore(map, y1, x1, y2, x2, rows, columns);
  let steps = 0;

  if(score) {
    map[y1][x1] = 0;
    map[y2][x2] = 0;
  }

  steps = fGetSteps(map, rows, columns);

}
function fGetSteps(map, rows, columns){
  let steps = 0;

  for(let i = 0; i < rows;i++){
    for(let j = 0; j < columns;j++){
      steps+=fGetStepsFromPosition(map, rows, columns, i , j);
    } 
  }  
  return steps;
}
function fGetStepsFromPosition(map, rows, columns, y1 , x1){
  let steps = 0;
  let y2 = 0;
  let x2 = 0;
  let yBuf = y1;
  let xBuf = x1;
  let flagEnd = 0;

  while(!flagEnd){
    if(xBuf < columns - 1) {
      y2 = yBuf;
      x2 = xBuf + 1;
    }
    else if(yBuf < rows - 1){
      y2 = yBuf + 1;
      x2 = 0;
    }
    else flagEnd = 1;
    if(!flagEnd){
      if(fGetScore(map, y1, x1, y2, x2, rows, columns)) steps++;
      yBuf = y2;
      xBuf = x2;
    }
  }
  
  return steps;
}

function fGetScore(map, y1, x1, y2, x2, rows, columns){
  let score = 0;
  
  if(fCorrectPlace(map, y1, x1, y2, x2, rows, columns)){
    score = getScore(map[y1][x1],map[y2][x2]);
  }
  return score;
}
function fCorrectPlace(map, y1, x1, y2, x2, rows, columns){
  let flagCorrect = 2;
  let flagVoidNumbers = 1;

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
  let flagVoid = 1;

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

