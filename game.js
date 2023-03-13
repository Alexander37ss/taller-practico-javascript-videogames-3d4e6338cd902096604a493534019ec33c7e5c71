const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
var mapRows, mapRowCols;

let canvasSize;
let elementsSize;

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

  getMaps(0);
}

/* Funcion Mapa */
function getMaps(level){
   mapRows = maps[level].trim().split('\n');
   mapRowCols = mapRows.map(row => row.trim().split(''));
  startGame();
}

/* Funcion Juego */
function startGame() {
  console.log({ canvasSize, elementsSize });

  game.font = elementsSize + 'px Verdana';
  game.textAlign = 'end';


  
  for (let row = 1; row <= 10; row++) {
    for (let col = 1; col <= 10; col++) {
      game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementsSize * col, elementsSize * row);
    }
  }
}
