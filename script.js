import { pawnPicked } from './piecePicked.js';

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

// Game State
let gameState = 'play'; // play, end

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
    pickedPiece: null, // structure: [row, col],
    possibleMoves: [], // cache for possible moves of the picked piece, structure: [[row, col], [row, col], ...],
}

// ========================================VARIABLES========================================>>


function renderChess() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            canvasState.ctx.fillStyle = (i + j) % 2 === 0 ? 'gray' : 'peru';
            canvasState.ctx.fillRect(canvasState.startX + j * canvasState.tileSize, canvasState.startY + i * canvasState.tileSize, canvasState.tileSize, canvasState.tileSize); 
    
            // Highlight the picked piece possible moves
            if(chessState.state == 'playerWPick' && chessState.pickedPiece != null) {
                let row = chessState.pickedPiece[0];
                let col = chessState.pickedPiece[1];
                switch(chessState.chessPieces[row][col].piece){
                    case 'wp':
                        pawnPicked(true, row, col, chessState, canvasState);
                        break;
                }
            }else if(chessState.state == 'playerBPick' && chessState.pickedPiece != null) {
                let row = chessState.pickedPiece[0];
                let col = chessState.pickedPiece[1];
                switch(chessState.chessPieces[row][col].piece){
                    case 'bp':
                        pawnPicked(false, row, col, chessState, canvasState);
                        break;
                }
            }

            switch(chessState.chessPieces[i][j].piece) {
                case 'bp':
                    canvasState.ctx.fillStyle = 'black';
                    canvasState.ctx.font = '40px Arial';
                    canvasState.ctx.fillText('♟', canvasState.startX + j * canvasState.tileSize + 5, canvasState.startY + i * canvasState.tileSize + 40);
                    break;
                case 'wp':
                    canvasState.ctx.fillStyle = 'white';
                    canvasState.ctx.font = '40px Arial';
                    canvasState.ctx.fillText('♙', canvasState.startX + j * canvasState.tileSize + 5, canvasState.startY + i * canvasState.tileSize + 40);
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
    console.log(`Row: ${row}, Col: ${col}`);

    if(chessState.state === 'playerWTurn') {
        let clickedPiece = chessState.chessPieces[row][col].piece;

        // Check if the clicked thing is not a white piece
        if(clickedPiece !== 'wp' && clickedPiece !== 'wr' && clickedPiece !== 'wn' && clickedPiece !== 'wb' && clickedPiece !== 'wq' && clickedPiece !== 'wk') {
            console.log('Not a white piece!');
            chessState.state = 'playerWTurn';
            return;
        }

        chessState.state = 'playerWPick';
        chessState.pickedPiece = [row, col];
    }else if(chessState.state === 'playerBTurn'){
        let clickedPiece = chessState.chessPieces[row][col].piece;

        // Check if the clicked thing is not a black piece
        if(clickedPiece !== 'bp' && clickedPiece !== 'br' && clickedPiece !== 'bn' && clickedPiece !== 'bb' && clickedPiece !== 'bq' && clickedPiece !== 'bk') {
            console.log('Not a black piece!');
            chessState.state = 'playerBTurn';
            return;
        }

        chessState.state = 'playerBPick';
        chessState.pickedPiece = [row, col];
    }else if(chessState.state == 'playerWPick') {
        // Check if the clicked thing is not a possible move
        const clickedIsPossibleMove = chessState.possibleMoves.some(move => move[0] === row && move[1] === col);
        
        if(!clickedIsPossibleMove) {
            chessState.state = 'playerWTurn';
            chessState.pickedPiece = null;
            chessState.possibleMoves = [];
            return;    
        }

        let fromRow = chessState.pickedPiece[0];
        let fromCol = chessState.pickedPiece[1];
        // Check if the piece is a pawn and if it moved two steps
        if(chessState.chessPieces[fromRow][fromCol].piece == 'wp' && Math.abs(row - fromRow) == 2){
            chessState.chessPieces[fromRow][fromCol].twoStepUsed = true;
        }

        // Move the piece
        chessState.chessPieces[row][col] = chessState.chessPieces[fromRow][fromCol];
        chessState.chessPieces[fromRow][fromCol] = {piece: ' '};
        chessState.pickedPiece = null;
        chessState.possibleMoves = [];
        chessState.state = 'playerBTurn';
    }else if(chessState.state == 'playerBPick') {
        // Check if the clicked thing is not a possible move
        const clickedIsPossibleMove = chessState.possibleMoves.some(move => move[0] === row && move[1] === col);
        
        if(!clickedIsPossibleMove) {
            chessState.state = 'playerBTurn';
            chessState.pickedPiece = null;
            chessState.possibleMoves = [];
            return;    
        }

        let fromRow = chessState.pickedPiece[0];
        let fromCol = chessState.pickedPiece[1];
        // Check if the piece is a pawn and if it moved two steps
        if(chessState.chessPieces[fromRow][fromCol].piece == 'bp' && Math.abs(row - fromRow) == 2){
            chessState.chessPieces[fromRow][fromCol].twoStepUsed = true;
        }

        // Move the piece
        chessState.chessPieces[row][col].piece = chessState.chessPieces[fromRow][fromCol].piece;
        chessState.chessPieces[fromRow][fromCol].piece = ' ';
        

        chessState.pickedPiece = null;
        chessState.possibleMoves = [];
        chessState.state = 'playerWTurn';
    }
}

let gameLoopInterval;

function changeGameState(newState){
    if(newState === 'play'){
        canvas.addEventListener('click', playerMoveListener);

        gameLoopInterval = setInterval(() => {
            renderChess();
        }, 10)
    }
}

changeGameState('play');