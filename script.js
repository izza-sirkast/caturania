import { renderChess } from './chess/chessScript.js';
import { playerMoveListener } from './chess/handlePlayerEvent.js';
import { chessState, initChessCanvasState } from './chess/chessVars.js';
import { menuEventListener } from './menu/menuEventListener.js';
import { renderMenu } from './menu/menuScript.js';
import { initMenuCanvasState } from './menu/menuVars.js';

let canvas = document.getElementById('caturania');
let ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let chessCanvasState = initChessCanvasState(ctx);
let menuCanvasState = initMenuCanvasState(ctx);

let gameLoopInterval = null;

function handlePlayerMoveClick(event) {
    playerMoveListener(event, chessCanvasState, chessState)
}

function handleMenuClick(event) {
    menuEventListener(event, menuCanvasState)
}

export function changeGameState(newState){
    canvas.removeEventListener('click', handleMenuClick);
    canvas.removeEventListener('click', handlePlayerMoveClick);
    clearInterval(gameLoopInterval);

    if(newState === 'play'){
        canvas.addEventListener('click', handlePlayerMoveClick);

        gameLoopInterval = setInterval(() => {
            renderChess(chessCanvasState, chessState);
        }, 10)
    }else if(newState === 'menu'){
        // == Menu event listener ==
        // hover listener

        // click listener
        canvas.addEventListener('click', handleMenuClick);

        gameLoopInterval = setInterval(() => {
            renderMenu(menuCanvasState);
        }, 10);    
    }
}

changeGameState('play');