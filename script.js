import { renderChess, playerMoveListener } from './chess/chessScript.js';
import { chessState } from './chess/chessVars.js';

let canvas = document.getElementById('chezz');
let canvasState = {
    ctx: canvas.getContext('2d'),
    tileSize: 50
}
canvasState.startX = window.innerWidth / 2 - (canvasState.tileSize * 8) / 2;
canvasState.startY = window.innerHeight / 2 - (canvasState.tileSize * 8) / 2,
canvasState.ctx.canvas.width = window.innerWidth;
canvasState.ctx.canvas.height = window.innerHeight;


let gameLoopInterval = null;

export function changeGameState(newState){
    if(newState === 'play'){
        canvas.addEventListener('click', (event) => playerMoveListener(event, canvasState, chessState));

        gameLoopInterval = setInterval(() => {
            renderChess(canvasState, chessState);
        }, 10)
    }else if(newState === 'mainMenu'){
        canvas.removeEventListener('click', (event) => playerMoveListener(event, canvasState, chessState));
        clearInterval(gameLoopInterval);


    }
}

changeGameState('play');