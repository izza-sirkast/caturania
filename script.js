let canvas = document.getElementById('chezz');
let ctx = canvas.getContext('2d');

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

//================================================================================================
// Classes
//================================================================================================

const tileSize = 50;
const startX = window.innerWidth / 2 - (tileSize * 8) / 2;
const startY = window.innerHeight / 2 - (tileSize * 8) / 2;

const chessPieces = [
    [{piece:'br'}, {piece:'bn'}, {piece:'bb'}, {piece:'bq'}, {piece:'bk'}, {piece:'bb'}, {piece:'bn'}, {piece:'br'}],
    [{piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}],
    [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
    [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
    [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
    [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
    [{piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}],
    [{piece:'wr'}, {piece:'wn'}, {piece:'wb'}, {piece:'wq'}, {piece:'wk'}, {piece:'wb'}, {piece:'wn'}, {piece:'wr'}]
]

let chessState = 'playerWTurn'; // playerBTurn, playerWTurn, playerBPick, playerWPick, end
let pickedPiece = null; // structure: [row, col]
let possibleMoves = []; // cache for possible moves of the picked piece, structure: [[row, col], [row, col], ...]
let gameState = 'play'; // play, end

function renderChess() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            ctx.fillStyle = (i + j) % 2 === 0 ? 'gray' : 'peru';
            ctx.fillRect(startX + j * tileSize, startY + i * tileSize, tileSize, tileSize); 
    
            // Highlight the picked piece possible moves
            if(chessState == 'playerWPick' && pickedPiece != null) {
                let row = pickedPiece[0];
                let col = pickedPiece[1];
                switch(chessPieces[row][col].piece){
                    case 'wp':
                        // Determine possible moves for the white pawn
                        // Check if there is a piece in the way
                        if(chessPieces[row - 1][col].piece === ' ') {
                            // Check if the pawn has moved two steps before
                            if(chessPieces[row][col].twoStepUsed == false) {
                                possibleMoves = [
                                    [row - 1, col], // Move forward
                                    [row - 2, col], // Move two steps forward
                                ]
                            }else {
                                possibleMoves = [
                                    [row - 1, col], // Move forward
                                ]
                            }
                        }

                        // Check if there is a piece in diagonal way
                        if(chessPieces[row - 1][col - 1] !== undefined && chessPieces[row - 1][col - 1]?.piece !== ' ') {
                            possibleMoves.push([row - 1, col - 1, 'eat']); // Move diagonal left
                        }
                        if(chessPieces[row - 1][col + 1] !== undefined && chessPieces[row - 1][col + 1]?.piece !== ' ') {
                            possibleMoves.push([row - 1, col + 1, 'eat']); // Move diagonal right
                        }
            
                        for (let i = 0; i < possibleMoves.length; i++) {
                            // If eat, fill with red
                            console.log(possibleMoves[i][2]);
                            if(possibleMoves[i][2] == 'eat') {
                                ctx.fillStyle = "rgba(171 25 12 / 2%)";
                            }else{
                                ctx.fillStyle = "rgba(36 227 182 / 7%)";
                            }
                            ctx.fillRect(startX + possibleMoves[i][1] * tileSize, startY + possibleMoves[i][0] * tileSize, tileSize, tileSize);
                        }

                }
            }else if(chessState == 'playerBPick' && pickedPiece != null) {
                let row = pickedPiece[0];
                let col = pickedPiece[1];
                switch(chessPieces[row][col].piece){
                    case 'bp':
                        ctx.fillStyle = "rgba(36 227 182 / 10%)";

                        // Determine possible moves for the black pawn
                        // Check if the pawn has moved two steps before
                        if(chessPieces[row][col].twoStepUsed == false) {
                            possibleMoves = [
                                [row + 1, col], // Move forward
                                [row + 2, col], // Move two steps forward
                            ]
                        }else {
                            possibleMoves = [
                                [row + 1, col], // Move forward
                            ]
                        }
            
                        for (let i = 0; i < possibleMoves.length; i++) {
                            ctx.fillRect(startX + possibleMoves[i][1] * tileSize, startY + possibleMoves[i][0] * tileSize, tileSize, tileSize);
                        }

                }
            }

            switch(chessPieces[i][j].piece) {
                case 'bp':
                    ctx.fillStyle = 'black';
                    ctx.font = '40px Arial';
                    ctx.fillText('♟', startX + j * tileSize + 5, startY + i * tileSize + 40);
                    break;
                case 'wp':
                    ctx.fillStyle = 'white';
                    ctx.font = '40px Arial';
                    ctx.fillText('♙', startX + j * tileSize + 5, startY + i * tileSize + 40);
                    break;
            }

        }
    }
}


function playerMoveListener (event) {
    let x = event.clientX - startX;
    let y = event.clientY - startY;
    let row = Math.floor(y / tileSize);
    let col = Math.floor(x / tileSize);
    console.log(`Row: ${row}, Col: ${col}`);

    if(chessState === 'playerWTurn') {
        let clickedPiece = chessPieces[row][col].piece;

        // Check if the clicked thing is not a white piece
        if(clickedPiece !== 'wp' && clickedPiece !== 'wr' && clickedPiece !== 'wn' && clickedPiece !== 'wb' && clickedPiece !== 'wq' && clickedPiece !== 'wk') {
            console.log('Not a white piece!');
            chessState = 'playerWTurn';
            return;
        }

        chessState = 'playerWPick';
        pickedPiece = [row, col];
    }else if(chessState === 'playerBTurn'){
        let clickedPiece = chessPieces[row][col].piece;

        // Check if the clicked thing is not a black piece
        if(clickedPiece !== 'bp' && clickedPiece !== 'br' && clickedPiece !== 'bn' && clickedPiece !== 'bb' && clickedPiece !== 'bq' && clickedPiece !== 'bk') {
            console.log('Not a black piece!');
            chessState = 'playerBTurn';
            return;
        }

        chessState = 'playerBPick';
        pickedPiece = [row, col];
    }else if(chessState == 'playerWPick') {
        // Check if the clicked thing is not a possible move
        const clickedIsPossibleMove = possibleMoves.some(move => move[0] === row && move[1] === col);
        
        if(!clickedIsPossibleMove) {
            chessState = 'playerWTurn';
            pickedPiece = null;
            possibleMoves = [];
            return;    
        }

        let fromRow = pickedPiece[0];
        let fromCol = pickedPiece[1];
        // Check if the piece is a pawn and if it moved two steps
        if(chessPieces[fromRow][fromCol].piece == 'wp' && Math.abs(row - fromRow) == 2){
            chessPieces[fromRow][fromCol].twoStepUsed = true;
        }

        // Move the piece
        chessPieces[row][col] = chessPieces[fromRow][fromCol];
        chessPieces[fromRow][fromCol] = {piece: ' '};
        pickedPiece = null;
        possibleMoves = [];
        chessState = 'playerBTurn';
    }else if(chessState == 'playerBPick') {
        // Check if the clicked thing is not a possible move
        const clickedIsPossibleMove = possibleMoves.some(move => move[0] === row && move[1] === col);
        
        if(!clickedIsPossibleMove) {
            chessState = 'playerBTurn';
            pickedPiece = null;
            possibleMoves = [];
            return;    
        }

        let fromRow = pickedPiece[0];
        let fromCol = pickedPiece[1];
        // Check if the piece is a pawn and if it moved two steps
        if(chessPieces[fromRow][fromCol].piece == 'bp' && Math.abs(row - fromRow) == 2){
            chessPieces[fromRow][fromCol].twoStepUsed = true;
        }

        // Move the piece
        chessPieces[row][col].piece = chessPieces[fromRow][fromCol].piece;
        chessPieces[fromRow][fromCol].piece = ' ';
        

        pickedPiece = null;
        possibleMoves = [];
        chessState = 'playerWTurn';
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