import { handlePlayerTurn, handlePlayerPick } from "./handlePlayerEvent.js";

export function renderChess(canvasState, chessState) {
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

export function playerMoveListener (event, canvasState, chessState) {
    let x = event.clientX - canvasState.startX;
    let y = event.clientY - canvasState.startY;
    let row = Math.floor(y / canvasState.tileSize);
    let col = Math.floor(x / canvasState.tileSize);
    console.log(`${chessState.state} cliked on Row: ${row}, Col: ${col}`);
    
    if(chessState.state === 'playerWTurn' || chessState.state === 'playerBTurn') {
        handlePlayerTurn(chessState, {row, col});
    }else if(chessState.state === 'playerWPick' || chessState.state === 'playerBPick') {
        handlePlayerPick(chessState, {row, col});
    }
}
