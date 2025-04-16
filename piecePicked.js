// All chess pieces variavble for comparison
let allWhitePieces = ['wp', 'wr', 'wn', 'wb', 'wq', 'wk'];
let allBlackPieces = ['bp', 'br', 'bn', 'bb', 'bq', 'bk'];

export function pawnPicked(isWhite, row, col, chessState, canvasState) {
    // Determine possible moves for pawn
    // Check if there is a piece in the way
    if(isWhite){
        if(chessState.chessPieces[row - 1][col].piece === ' ') {
            // Check if the pawn has moved two steps before
            if(chessState.chessPieces[row][col].twoStepUsed == false) {
                chessState.possibleMoves = [
                    [row - 1, col], // Move forward
                    [row - 2, col], // Move two steps forward
                ]
            }else {
                chessState.possibleMoves = [
                    [row - 1, col], // Move forward
                ]
            }
        }
    }else {
        if(chessState.chessPieces[row + 1][col].piece === ' ') {
            // Check if the pawn has moved two steps before
            if(chessState.chessPieces[row][col].twoStepUsed == false) {
                chessState.possibleMoves = [
                    [row + 1, col], // Move forward
                    [row + 2, col], // Move two steps forward
                ]
            }else {
                chessState.possibleMoves = [
                    [row + 1, col], // Move forward
                ]
            }
        }
    }

    // Check if there is a piece in diagonal way
    if(isWhite) {
        let diagonalLeft = chessState.chessPieces[row - 1][col - 1]
        if(diagonalLeft !== undefined && allBlackPieces.includes(diagonalLeft.piece)) {
            chessState.possibleMoves.push([row - 1, col - 1, 'eat']); // Move diagonal left
        }
        let diagonalRight = chessState.chessPieces[row - 1][col + 1]
        if(diagonalRight !== undefined && allBlackPieces.includes(diagonalRight.piece)) {
            chessState.possibleMoves.push([row - 1, col + 1, 'eat']); // Move diagonal right
        }
    }else{
        let diagonalLeft = chessState.chessPieces[row + 1][col - 1]
        if(diagonalLeft !== undefined && allWhitePieces.includes(diagonalLeft.piece)) {
            chessState.possibleMoves.push([row + 1, col - 1, 'eat']); // Move diagonal left
        }
        let diagonalRight = chessState.chessPieces[row + 1][col + 1]
        if(diagonalRight !== undefined && allWhitePieces.includes(diagonalRight.piece)) {
            chessState.possibleMoves.push([row + 1, col + 1, 'eat']); // Move diagonal right
        }
    }

    for (let i = 0; i < chessState.possibleMoves.length; i++) {
        // If eat, fill with red
        if(chessState.possibleMoves[i][2] == 'eat') {
            canvasState.ctx.fillStyle = "rgba(171 25 12 / 2%)";
        }else{
            canvasState.ctx.fillStyle = "rgba(36 227 182 / 7%)";
        }
        
        canvasState.ctx.fillRect(canvasState.startX + chessState.possibleMoves[i][1] * canvasState.tileSize, canvasState.startY + chessState.possibleMoves[i][0] * canvasState.tileSize, canvasState.tileSize, canvasState.tileSize);
    }
}