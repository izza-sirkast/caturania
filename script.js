import { renderChess, playerMoveListener } from './chess/chessScript.js';
import { chessState, initChessCanvasState } from './chess/chessVars.js';
import { initMenuCanvasState } from './menu/menuVars.js';

let canvas = document.getElementById('chezz');
let ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let chessCanvasState = initChessCanvasState(ctx);

let menuCanvasState = initMenuCanvasState(ctx);

let gameLoopInterval = null;

export function changeGameState(newState){
    if(newState === 'play'){
        canvas.addEventListener('click', (event) => playerMoveListener(event, chessCanvasState, chessState));

        gameLoopInterval = setInterval(() => {
            renderChess(chessCanvasState, chessState);
        }, 10)
    }else if(newState === 'menu'){
        canvas.removeEventListener('click', (event) => playerMoveListener(event, canvasState, chessState));
        clearInterval(gameLoopInterval);

        menuCanvasState.ctx.clearRect(0, 0, menuCanvasState.ctx.canvas.width, menuCanvasState.ctx.canvas.height);
        menuCanvasState.ctx.fillStyle = 'black';
        menuCanvasState.ctx.font = '40px Arial';
        menuCanvasState.ctx.fillText('Chess Game', window.innerWidth / 2 - 100, window.innerHeight / 2 - 70);

        // Draw start button
        menuCanvasState.ctx.fillStyle = 'blue';
        menuCanvasState.ctx.fillRect(menuCanvasState.startButton.x, menuCanvasState.startButton.y, menuCanvasState.startButton.width, menuCanvasState.startButton.height);
        menuCanvasState.ctx.fillStyle = 'white';
        menuCanvasState.ctx.fillText('Start', menuCanvasState.startButton.x + 62, menuCanvasState.startButton.y + 33);
    }
}

changeGameState('menu');