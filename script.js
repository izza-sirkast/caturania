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

let gameState = 'neutral'; // neutral, pick

function renderChess() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            ctx.fillStyle = (i + j) % 2 === 0 ? 'papayawhip' : 'peru';
            ctx.fillRect(startX + j * tileSize, startY + i * tileSize, tileSize, tileSize); 
    
            switch(chessPieces[i][j]) {
                case 'bp':
                    ctx.fillStyle = 'black';
                    ctx.font = '40px Arial';
                    ctx.fillText('♟', startX + j * tileSize + 5, startY + i * tileSize + 40);
                    break;
            }
        }
    }
}


renderChess();


// Get cursor location value on every mouse move
canvas.addEventListener('click', function(event) {
    let x = event.clientX - startX;
    let y = event.clientY - startY;
    let row = Math.floor(y / tileSize);
    let col = Math.floor(x / tileSize);
    console.log(`Row: ${row}, Col: ${col}`);

    if(gameState === 'neutral') {
        if(chessPieces[row][col] === ' ') {
            console.log('Empty tile clicked!');
            return;
        }

        gameState = 'pick';
    
        switch(chessPieces[row][col]){
            case 'bp':
                ctx.fillStyle = 'yellow';
                let allPossibleMoves = [
                    [row + 1, col], // Move forward
                ]

                for (let i = 0; i < allPossibleMoves.length; i++) {
                    console.log('tes')
                    ctx.fillRect(startX + allPossibleMoves[i][1] * tileSize, startY + allPossibleMoves[i][0] * tileSize, tileSize, tileSize);
                }
        }
    
    }
});

