import { handlePlayerTurn, handlePlayerPick } from './handlePlayerEvent.js';

let canvas = document.getElementById('chezz');


// <<========================================VARIABLES========================================
// Canvas
let canvasState = {
    ctx: canvas.getContext('2d'),
    tileSize: 50
}
canvasState.startX = window.innerWidth / 2 - (canvasState.tileSize * 8) / 2;
canvasState.startY = window.innerHeight / 2 - (canvasState.tileSize * 8) / 2,
canvasState.ctx.canvas.width = window.innerWidth;
canvasState.ctx.canvas.height = window.innerHeight;


// Chess State
let chessState = {
    state: 'playerWTurn', // playerBTurn, playerWTurn, playerBPick, playerWPick, end
    chessPieces: [
        [{piece:'br'}, {piece:'bn'}, {piece:'bb'}, {piece:'bq'}, {piece:'bk'}, {piece:'bb'}, {piece:'bn'}, {piece:'br'}],
        [{piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}],
        [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
        [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
        [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
        [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
        [{piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}],
        [{piece:'wr'}, {piece:'wn'}, {piece:'wb'}, {piece:'wq'}, {piece:'wk'}, {piece:'wb'}, {piece:'wn'}, {piece:'wr'}]
    ],
    // chessPieces: [
    //     [{piece:' '},  {piece:' '}, {piece:' '}, {piece:'bq'}, {piece:'bk'}, {piece:' '}, {piece:' '}, {piece:' '}],
    //     [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
    //     [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
    //     [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
    //     [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
    //     [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
    //     [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
    //     [{piece:' '}, {piece:' '}, {piece:' '}, {piece:'wq'}, {piece:'wk'}, {piece:' '}, {piece:' '}, {piece:' '}]
    // ],
    pickedPiece: null, // structure: [row, col],
    enPassant: {
        location: null, // structure: { row, col }
        signal: false, // true to tell if the player do en passant move
    }
}

// ========================================VARIABLES========================================>>


function renderChess() {
    // Clear the canvas
    canvasState.ctx.clearRect(0, 0, canvasState.ctx.canvas.width, canvasState.ctx.canvas.height);

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            canvasState.ctx.fillStyle = (i + j) % 2 === 0 ? 'gray' : 'peru';
            canvasState.ctx.fillRect(canvasState.startX + j * canvasState.tileSize, canvasState.startY + i * canvasState.tileSize, canvasState.tileSize, canvasState.tileSize); 

            if(chessState.chessPieces[i][j].boardState !== undefined) {
                // Render only once
                if(chessState.chessPieces[i][j].boardState == 'move'){
                    canvasState.ctx.fillStyle = "rgba(36 227 182 / 30%)";
                }else if(chessState.chessPieces[i][j].boardState == 'eat' || chessState.chessPieces[i][j].boardState == 'enPassant'){
                    canvasState.ctx.fillStyle = "rgba(171 25 12 / 30%)";
                }

                canvasState.ctx.fillRect(canvasState.startX + j * canvasState.tileSize, canvasState.startY + i * canvasState.tileSize, canvasState.tileSize, canvasState.tileSize); 
            }

            switch(chessState.chessPieces[i][j].piece) {
                // Black pieces
                case 'bp':
                    canvasState.ctx.fillStyle = 'black';
                    canvasState.ctx.font = '40px Arial';
                    canvasState.ctx.fillText('♟', canvasState.startX + j * canvasState.tileSize + 5, canvasState.startY + i * canvasState.tileSize + 40);
                    break;
                case 'br':
                    canvasState.ctx.fillStyle = 'black';
                    canvasState.ctx.font = '40px Arial';
                    canvasState.ctx.fillText('♖', canvasState.startX + j * canvasState.tileSize + 5, canvasState.startY + i * canvasState.tileSize + 40);
                    break;
                case 'bn':
                    canvasState.ctx.fillStyle = 'black';
                    canvasState.ctx.font = '40px Arial';
                    canvasState.ctx.fillText('♞', canvasState.startX + j * canvasState.tileSize + 5, canvasState.startY + i * canvasState.tileSize + 40);
                    break;
                case 'bb':
                    canvasState.ctx.fillStyle = 'black';
                    canvasState.ctx.font = '40px Arial';
                    canvasState.ctx.fillText('♗', canvasState.startX + j * canvasState.tileSize + 5, canvasState.startY + i * canvasState.tileSize + 40);
                    break;
                case 'bq':
                    canvasState.ctx.fillStyle = 'black';
                    canvasState.ctx.font = '40px Arial';
                    canvasState.ctx.fillText('♕', canvasState.startX + j * canvasState.tileSize + 5, canvasState.startY + i * canvasState.tileSize + 40);
                    break;
                case 'bk':
                    canvasState.ctx.fillStyle = 'black';
                    canvasState.ctx.font = '40px Arial';
                    canvasState.ctx.fillText('♔', canvasState.startX + j * canvasState.tileSize + 5, canvasState.startY + i * canvasState.tileSize + 40);
                    break;

                // White Pieces
                case 'wp':
                    canvasState.ctx.fillStyle = 'white';
                    canvasState.ctx.font = '40px Arial';
                    canvasState.ctx.fillText('♙', canvasState.startX + j * canvasState.tileSize + 5, canvasState.startY + i * canvasState.tileSize + 40);
                    break;
                case 'wr':
                    canvasState.ctx.fillStyle = 'white';
                    canvasState.ctx.font = '40px Arial';
                    canvasState.ctx.fillText('♖', canvasState.startX + j * canvasState.tileSize + 5, canvasState.startY + i * canvasState.tileSize + 40);
                    break;
                case 'wn':
                    canvasState.ctx.fillStyle = 'white';
                    canvasState.ctx.font = '40px Arial';
                    canvasState.ctx.fillText('♘', canvasState.startX + j * canvasState.tileSize + 5, canvasState.startY + i * canvasState.tileSize + 40);
                    break;
                case 'wb':
                    canvasState.ctx.fillStyle = 'white';
                    canvasState.ctx.font = '40px Arial';
                    canvasState.ctx.fillText('♗', canvasState.startX + j * canvasState.tileSize + 5, canvasState.startY + i * canvasState.tileSize + 40);
                    break;
                case 'wq':
                    canvasState.ctx.fillStyle = 'white';
                    canvasState.ctx.font = '40px Arial';
                    canvasState.ctx.fillText('♕', canvasState.startX + j * canvasState.tileSize + 5, canvasState.startY + i * canvasState.tileSize + 40);
                    break;
                case 'wk':
                    canvasState.ctx.fillStyle = 'white';
                    canvasState.ctx.font = '40px Arial';
                    canvasState.ctx.fillText('♔', canvasState.startX + j * canvasState.tileSize + 5, canvasState.startY + i * canvasState.tileSize + 40);
                    break;
            }

        }
    }
}

function playerMoveListener (event) {
    let x = event.clientX - canvasState.startX;
    let y = event.clientY - canvasState.startY;
    let row = Math.floor(y / canvasState.tileSize);
    let col = Math.floor(x / canvasState.tileSize);
    console.log(`${chessState.state} cliked on Row: ${row}, Col: ${col}`);
    console.log(chessState.enPassant)
    
    if(chessState.state === 'playerWTurn' || chessState.state === 'playerBTurn') {
        handlePlayerTurn(chessState, {row, col});
    }else if(chessState.state === 'playerWPick' || chessState.state === 'playerBPick') {
        handlePlayerPick(chessState, {row, col});
    }
}

let gameLoopInterval = null;

function changeGameState(newState){
    if(newState === 'play'){
        canvas.addEventListener('click', playerMoveListener);

        gameLoopInterval = setInterval(() => {
            renderChess();
        }, 10)
    }
}

changeGameState('play');