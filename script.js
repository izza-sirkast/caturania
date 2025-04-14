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
    ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
    ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
    ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr']
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
                switch(chessPieces[row][col]){
                    case 'wp':
                        ctx.fillStyle = 'yellow';
                        possibleMoves = [
                            [row - 1, col], // Move forward
                        ]
            
                        for (let i = 0; i < possibleMoves.length; i++) {
                            ctx.fillRect(startX + possibleMoves[i][1] * tileSize, startY + possibleMoves[i][0] * tileSize, tileSize, tileSize);
                        }

                }
            }

            switch(chessPieces[i][j]) {
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


function playerTurnListener (event) {
    let x = event.clientX - startX;
    let y = event.clientY - startY;
    let row = Math.floor(y / tileSize);
    let col = Math.floor(x / tileSize);
    console.log(`Row: ${row}, Col: ${col}`);

    if(chessState === 'playerWTurn') {
        let clickedPiece = chessPieces[row][col];

        // Check if the clicked thing is not a white piece
        if(clickedPiece !== 'wp' && clickedPiece !== 'wr' && clickedPiece !== 'wn' && clickedPiece !== 'wb' && clickedPiece !== 'wq' && clickedPiece !== 'wk') {
            console.log('Not a white piece!');
            chessState = 'playerWTurn';
            return;
        }

        chessState = 'playerWPick';
        pickedPiece = [row, col];
    }else if(chessState == 'playerWPick') {
        // Check if the clicked thing is not a possible move
        const clickedIsPossibleMove = possibleMoves.some(move => move[0] === row && move[1] === col);
        
        if(!clickedIsPossibleMove) {
            chessState = 'playerWTurn';
            pickedPiece = null;
            possibleMoves = [];    
        }
    }
}

let gameLoopInterval;

function changeGameState(newState){
    if(newState === 'play'){
        canvas.addEventListener('click', playerTurnListener);

        gameLoopInterval = setInterval(() => {
            renderChess();
        }, 10)
    }
}

changeGameState('play');