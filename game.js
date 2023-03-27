var TimeRecord = localStorage.getItem('record_time');

const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
var mapRows, mapRowCols;
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const livesText = document.querySelector('#lives');
const timeText = document.querySelector('#time');
const recordText = document.querySelector('#record');
const newRecordText = document.querySelector('#newrecord');


if(!TimeRecord){
  recordText.innerText = "Record: no has ganado ninguna vez, por lo tanto no tienes ningun record";
}else{
  recordText.innerText = "Record: " + '🏁' + localStorage.getItem('record_time');
}
let canvasSize;
let elementsSize;
var level = 0;
var lives = 3;
var timeStart;
var timeInterval;

livesText.innerText = '❤️'.repeat(lives);

const playerPosition = {
  x: undefined,
  y: undefined
}
const homePosition = {
  x: undefined,
  y: undefined
}
const giftPosition = {
  x: undefined,
  y: undefined
}
var enemyPositions = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }
  
  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);
  
  elementsSize = canvasSize / 10;
  if(playerPosition.x != undefined){
    playerPosition.y = canvasSize;
    playerPosition.x = elementsSize;
  }
  if(level != 3){
    getMaps(level);
  }else{
    game.fillText('Terminaste el juego', canvasSize, canvasSize/2);
  }
}

/* Funcion Mapa */
function getMaps(level){
   mapRows = maps[level].trim().split('\n');
   mapRowCols = mapRows.map(row => row.trim().split(''));
  startGame();
}

function gameOver(){
  lives = 4;
  level = 0;
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  timeStart = undefined;
  clearMap();
  getMaps(level);
}

function levelLose(){
  console.log(lives);
  if(lives == 1){
    gameOver();
  }else{
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    clearMap();
    getMaps(level);
  }
  lives--;
  livesText.innerText = '❤️'.repeat(lives);
  console.log('AQUI');
}

function clearMap(){
  game.clearRect(0,0,canvasSize,canvasSize);
}

function showTime(){
  timeText.innerText = 'Tiempo: ' + '⏲' + (Date.now() - timeStart);
}

function gameWin(){
  clearMap();
  game.fillText('Terminaste el juego', canvasSize, canvasSize/2);
  if(!TimeRecord){
    localStorage.setItem('record_time', (Date.now() - timeStart));
     recordText.innerText = "Record: " + '🏁' + localStorage.getItem('record_time');
     newRecordText.innerText = 'NUEVO RECORD!';
  }else if((Date.now() - timeStart) < TimeRecord){
    localStorage.setItem('record_time', (Date.now() - timeStart));
    recordText.innerText = "Record: " + '🏁' + localStorage.getItem('record_time');
    newRecordText.innerText = 'NUEVO RECORD!';
  }
  clearInterval(timeInterval);
}

/* Funcion Juego */
function startGame() {
  console.log({ canvasSize, elementsSize });

  game.font = elementsSize + 'px Verdana';
  game.textAlign = 'end';
  enemyPositions = [];
  
  if(!timeStart){
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 100);
  }

  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI + 1);
      posX.toFixed(1);
      posY.toFixed(1);
      /* Donde esta el inicio */
      if(col == 'O'){
        homePosition.x = posX;
        homePosition.y = posY;
      }


      if(col == 'O' && playerPosition.x === undefined && playerPosition.y === undefined){
        playerPosition.x = posX;
        playerPosition.y = posY;
        console.log(elementsSize);
      }else if(col == 'I'){
        giftPosition.x = posX;
        giftPosition.y = posY;
      }else if (col == 'X') {
        enemyPositions.push({
          x: posX,
          y: posY,
        });
      }
      game.fillText(emoji, posX, posY);
    });
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
  });
  console.log(playerPosition.y.toFixed(2), playerPosition.x);
  Number(giftPosition.x).toFixed(3);
  Number(giftPosition.y).toFixed(3);
  const enemyCollision = enemyPositions.find(enemy => {
    const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
    return enemyCollisionX && enemyCollisionY;
  });
  if(enemyCollision){
    levelLose(lives);
  }
  if(playerPosition.x.toFixed(2) == giftPosition.x.toFixed(2) && playerPosition.y.toFixed(2) == giftPosition.y.toFixed(2)){
    level++;
    if(level == 3){
      gameWin();
    }else{
      getMaps(level);
      clearMap();
      startGame();
    }
  }
}

btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);

function moveUp() {
  if((playerPosition.y - elementsSize) < 10){

  }else{
    playerPosition.y -= elementsSize;
    clearMap();
    startGame();
  }
}

function moveLeft() {
  if((playerPosition.x - elementsSize) < 10){

  }else{
  playerPosition.x -= elementsSize;
  clearMap();
  startGame();
  }
}

function moveRight() {
  if((playerPosition.x + elementsSize) > canvasSize){

  }else{
  playerPosition.x += elementsSize;
  clearMap();
  startGame();
  }
}

function moveDown() {
  if((playerPosition.y + elementsSize) > canvasSize){

  }else{
  playerPosition.y += elementsSize;
  clearMap();
  startGame();
  }
}

window.addEventListener("keydown", (e) => {
  let tecla = e.key;

  switch (tecla) {
    case "ArrowUp":
      moveUp();
      break;

    case "ArrowDown":
      moveDown();
      break;

    case "ArrowLeft":
      moveLeft();
      break;

    case "ArrowRight":
    moveRight();
      break;

    default:
      break;
  }
});