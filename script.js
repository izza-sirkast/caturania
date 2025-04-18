import { allBlackPieces, allWhitePieces, determinePossibleMoves } from './piecePicked.js';

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
    // chessPieces: [
    //     [{piece:'br'}, {piece:'bn'}, {piece:'bb'}, {piece:'bq'}, {piece:'bk'}, {piece:'bb'}, {piece:'bn'}, {piece:'br'}],
    //     [{piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}],
    //     [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
    //     [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
    //     [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
    //     [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
    //     [{piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}],
    //     [{piece:'wr'}, {piece:'wn'}, {piece:'wb'}, {piece:'wq'}, {piece:'wk'}, {piece:'wb'}, {piece:'wn'}, {piece:'wr'}]
    // ],
    chessPieces: [
        [{piece:' '},  {piece:' '}, {piece:'bb'}, {piece:' '}, {piece:' '}, {piece:'bb'}, {piece:' '}, {piece:' '}],
        [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
        [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
        [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
        [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
        [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
        [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
        [{piece:' '}, {piece:' '}, {piece:'wb'}, {piece:' '}, {piece:' '}, {piece:'wb'}, {piece:' '}, {piece:' '}]
    ],
    pickedPiece: null, // structure: [row, col],
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
                }else if(chessState.chessPieces[i][j].boardState == 'eat'){
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
            }

        }
    }
}

function neutralizeBoardState() {
    for (let i = 0; i < chessState.chessPieces.length; i++) {
        for (let j = 0; j < chessState.chessPieces[i].length; j++) {
            chessState.chessPieces[i][j].boardState = undefined;
        }
    }
}

function playerMoveListener (event) {
    let x = event.clientX - canvasState.startX;
    let y = event.clientY - canvasState.startY;
    let row = Math.floor(y / canvasState.tileSize);
    let col = Math.floor(x / canvasState.tileSize);
    console.log(`${chessState.state} cliked on Row: ${row}, Col: ${col}`);

    if(chessState.state === 'playerWTurn') {
        let clickedPiece = chessState.chessPieces[row][col].piece;

        // Check if the clicked thing is not a white piece
        if(!allWhitePieces.includes(clickedPiece)) {
            console.log('Not a white piece!');
            chessState.state = 'playerWTurn';
            return;
        }

        chessState.state = 'playerWPick';
        chessState.pickedPiece = [row, col];

        determinePossibleMoves(chessState.chessPieces[row][col].piece, true, row, col, chessState);
    }else if(chessState.state === 'playerBTurn'){
        let clickedPiece = chessState.chessPieces[row][col].piece;

        // Check if the clicked thing is not a black piece
        if(!allBlackPieces.includes(clickedPiece)) {
            console.log('Not a black piece!');
            chessState.state = 'playerBTurn';
            return;
        }

        chessState.state = 'playerBPick';
        chessState.pickedPiece = [row, col];

        determinePossibleMoves(chessState.chessPieces[row][col].piece, false, row, col, chessState);
    }else if(chessState.state == 'playerWPick') {
        // Check if the clicked thing is not a possible move
        const clickedIsPossibleMove = chessState.chessPieces[row][col].boardState !== undefined && (chessState.chessPieces[row][col].boardState === 'move' || chessState.chessPieces[row][col].boardState === 'eat')
        if(!clickedIsPossibleMove) {
            chessState.state = 'playerWTurn';
            chessState.pickedPiece = null;
            // Neutralize the board state
            neutralizeBoardState();
            return;    
        }

        // Neutralize the board state
        neutralizeBoardState();

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
        chessState.state = 'playerBTurn';
    }else if(chessState.state == 'playerBPick') {
        // Check if the clicked thing is not a possible move
        const clickedIsPossibleMove = chessState.chessPieces[row][col].boardState !== undefined && (chessState.chessPieces[row][col].boardState === 'move' || chessState.chessPieces[row][col].boardState === 'eat')
        if(!clickedIsPossibleMove) {
            chessState.state = 'playerBTurn';
            chessState.pickedPiece = null;
            // Neutralize the board state
            neutralizeBoardState();
            return;    
        }

        // Neutralize the board state
        neutralizeBoardState();

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