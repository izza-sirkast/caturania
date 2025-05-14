import { checkPossibleMovesOnATile } from "./determinePossibleMoves.js";

export function renderChess(canvasState, chessState) {
    // Clear the canvas
    canvasState.ctx.clearRect(0, 0, canvasState.ctx.canvas.width, canvasState.ctx.canvas.height);

    // Write whose turn it is
    renderTurnText(chessState, canvasState);

    renderCapturedPieces(chessState, canvasState);

    // Draw menu button
    canvasState.ctx.fillStyle = 'black';
    canvasState.ctx.fillRect(canvasState.menuButton.x, canvasState.menuButton.y, canvasState.menuButton.width, canvasState.menuButton.height);
    canvasState.ctx.fillStyle = 'white';
    canvasState.ctx.font = `${canvasState.menuButton.textSize}px monospace`;
    canvasState.ctx.fillText('menu', canvasState.menuButton.x + 67,  canvasState.menuButton.y + 29);

    // Draw restart button
    canvasState.ctx.fillStyle = 'black';
    canvasState.ctx.fillRect(canvasState.restartButton.x, canvasState.restartButton.y, canvasState.restartButton.width, canvasState.restartButton.height);
    canvasState.ctx.fillStyle = 'white';
    canvasState.ctx.font = `${canvasState.restartButton.textSize}px monospace`;
    canvasState.ctx.fillText('restart', canvasState.restartButton.x + 43,  canvasState.restartButton.y + 29);    

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            renderTile(i, j, canvasState);

            renderChessPieces(i, j, chessState, canvasState);

            renderBoardstate(i, j, chessState, canvasState);

        }
    }

    
    
    // Test for possible moves on a target tile
    // const tRow = 4;
    // const tCol = 2;;
    // let posMoves = checkPossibleMovesOnATile(true, chessState, tRow, tCol);

    // canvasState.ctx.fillStyle = 'rgba(36 40 200 / 40%)';
    // canvasState.ctx.fillRect(canvasState.startX + tCol * canvasState.tileSize, canvasState.startY + tRow * canvasState.tileSize, canvasState.tileSize, canvasState.tileSize); 

    // posMoves.forEach((move) => {
    //     canvasState.ctx.fillStyle = move.move === 'eat' ? 'rgba(200 100 182 / 60%)' : 'rgba(100 200 182 / 60%)';
    //     canvasState.ctx.fillRect(canvasState.startX + move.col  * canvasState.tileSize, canvasState.startY + move.row * canvasState.tileSize, canvasState.tileSize, canvasState.tileSize); 
    // })

}

function renderTurnText(chessState, canvasState) {
    canvasState.ctx.fillStyle = 'black';
    canvasState.ctx.font = '40px monospace';
    canvasState.ctx.fillText(chessState.state === 'playerWTurn' || chessState.state === 'playerWPick' ? 'White Turn' : 'Black Turn', canvasState.startX - 280, canvasState.startY + 20);
}

function renderCapturedPieces(chessState, canvasState) {
    canvasState.ctx.fillStyle = 'black';
    canvasState.ctx.fillRect(canvasState.capturedWhitePieces.x, canvasState.capturedWhitePieces.y, canvasState.capturedWhitePieces.width, canvasState.capturedWhitePieces.height)

    canvasState.ctx.fillStyle = 'white';
    canvasState.ctx.fillRect(canvasState.capturedBlackPieces.x, canvasState.capturedBlackPieces.y, canvasState.capturedBlackPieces.width, canvasState.capturedBlackPieces.height)

    // render captured white pieces
    canvasState.ctx.fillStyle = 'white';
    canvasState.ctx.font = '40px Arial';
    for(let i = 0; i < chessState.capturedWhitePieces.length; i++){
        let col = i % 5;
        let row = Math.floor(i / 5);
        
        canvasState.ctx.fillStyle = 'white';
        canvasState.ctx.font = '40px Arial';
        switch(chessState.capturedWhitePieces[i].piece){
            case 'wp':
                canvasState.ctx.fillText('♙', canvasState.capturedWhitePieces.x + col * canvasState.tileSize + 5, canvasState.capturedWhitePieces.y + row * canvasState.tileSize + 40);
                break;
            case 'wr':
                canvasState.ctx.fillText('♖',  canvasState.capturedWhitePieces.x + col * canvasState.tileSize + 5, canvasState.capturedWhitePieces.y + row * canvasState.tileSize + 40);
                break;
            case 'wn':
                canvasState.ctx.fillText('♘',  canvasState.capturedWhitePieces.x + col * canvasState.tileSize + 5, canvasState.capturedWhitePieces.y + row * canvasState.tileSize + 40);
                break;
            case 'wb':
                canvasState.ctx.fillText('♗',  canvasState.capturedWhitePieces.x + col * canvasState.tileSize + 5, canvasState.capturedWhitePieces.y + row * canvasState.tileSize + 40);
                break;
            case 'wq':
                canvasState.ctx.fillText('♕',  canvasState.capturedWhitePieces.x + col * canvasState.tileSize + 5, canvasState.capturedWhitePieces.y + row * canvasState.tileSize + 40);
                break;
            case 'wk':
                canvasState.ctx.fillText('♔',  canvasState.capturedWhitePieces.x + col * canvasState.tileSize + 5, canvasState.capturedWhitePieces.y + row * canvasState.tileSize + 40);
                break;
        }
    }

    // render captured black pieces
    canvasState.ctx.fillStyle = 'black';
    canvasState.ctx.font = '40px Arial';
    for(let i = 0; i < chessState.capturedBlackPieces.length; i++){
        let col = i % 5;
        let row = 3 - Math.floor(i / 5);
       
        switch(chessState.capturedBlackPieces[i].piece){
            case 'bp':
                canvasState.ctx.fillText('♙', canvasState.capturedBlackPieces.x + col * canvasState.tileSize + 5, canvasState.capturedBlackPieces.y + row * canvasState.tileSize + 40);
                break;
            case 'br':
                canvasState.ctx.fillText('♖',  canvasState.capturedBlackPieces.x + col * canvasState.tileSize + 5, canvasState.capturedBlackPieces.y + row * canvasState.tileSize + 40);
                break;
            case 'bn':
                canvasState.ctx.fillText('♘',  canvasState.capturedBlackPieces.x + col * canvasState.tileSize + 5, canvasState.capturedBlackPieces.y + row * canvasState.tileSize + 40);
                break;
            case 'bb':
                canvasState.ctx.fillText('♗',  canvasState.capturedBlackPieces.x + col * canvasState.tileSize + 5, canvasState.capturedBlackPieces.y + row * canvasState.tileSize + 40);
                break;
            case 'bq':
                canvasState.ctx.fillText('♕',  canvasState.capturedBlackPieces.x + col * canvasState.tileSize + 5, canvasState.capturedBlackPieces.y + row * canvasState.tileSize + 40);
                break;
            case 'bk':
                canvasState.ctx.fillText('♔',  canvasState.capturedBlackPieces.x + col * canvasState.tileSize + 5, canvasState.capturedBlackPieces.y + row * canvasState.tileSize + 40);
                break;
        }
    }
}

function renderTile(i, j, canvasState) {
    canvasState.ctx.fillStyle = (i + j) % 2 === 0 ? 'gray' : 'peru';
    canvasState.ctx.fillRect(canvasState.startX + j * canvasState.tileSize, canvasState.startY + i * canvasState.tileSize, canvasState.tileSize, canvasState.tileSize); 
}

function renderBoardstate(i, j, chessState, canvasState) {
    if(chessState.chessPieces[i][j].boardState !== undefined) {
        // Render only once
        if(chessState.chessPieces[i][j].boardState == 'move'){
            canvasState.ctx.fillStyle = "rgba(36 227 182 / 60%)";
        }else if(chessState.chessPieces[i][j].boardState == 'eat' || chessState.chessPieces[i][j].boardState == 'enPassant'){
            canvasState.ctx.fillStyle = "rgba(171 25 12 / 60%)";
        }

        // Draw Circle
        canvasState.ctx.beginPath();
        canvasState.ctx.arc((canvasState.startX + j * canvasState.tileSize) + canvasState.tileSize / 2, (canvasState.startY + i * canvasState.tileSize) + canvasState.tileSize / 2, canvasState.tileSize / 5, 0, Math.PI * 2); // x, y, radius, startAngle, endAngle
        canvasState.ctx.fill();
        canvasState.ctx.closePath();
    }
}

function renderChessPieces(i, j, chessState, canvasState){
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
