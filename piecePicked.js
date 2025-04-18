// Functions to determine possible moves for each piece and also highlight them on the canvas
// These functions are called when a piece is picked and the possible moves are calculated based on the piece type and position

// All chess pieces variavble for comparison
export let allWhitePieces = ['wp', 'wr', 'wn', 'wb', 'wq', 'wk'];
export let allBlackPieces = ['bp', 'br', 'bn', 'bb', 'bq', 'bk'];

export function pawnPicked(isWhite, row, col, chessState, canvasState) {
    // Determine possible moves for pawn
    // Check if there is a piece in the way
    if(isWhite){
        if(chessState.chessPieces[row - 1][col].piece === ' ') {
            // Check if the pawn has moved two steps before
            if(chessState.chessPieces[row][col].twoStepUsed == false && chessState.chessPieces[row - 2][col].piece === ' ') {
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
            if(chessState.chessPieces[row][col].twoStepUsed == false && chessState.chessPieces[row + 2][col].piece === ' ') {
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

    // Highlight possible moves on the canvas
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

export function rookPicked(isWhite, row, col, chessState) {
    // Determine possible moves for rook
    if(isWhite){
        // Determine possible up moves
        for(let i = row - 1; i >= 0; i--) {
            if(chessState.chessPieces[i][col].piece === ' '){
                chessState.chessPieces[i][col].boardState = 'move';
            }else if(allBlackPieces.includes(chessState.chessPieces[i][col].piece)){
                chessState.chessPieces[i][col].boardState = 'eat';
                break;
            }else if(allWhitePieces.includes(chessState.chessPieces[i][col].piece)){
                break;
            }
        }
        // Determine possible down moves
        for(let i = row + 1; i <= 7; i++) {
            if(chessState.chessPieces[i][col].piece === ' '){
                chessState.chessPieces[i][col].boardState = 'move';
            }else if(allBlackPieces.includes(chessState.chessPieces[i][col].piece)){
                chessState.chessPieces[i][col].boardState = 'eat';
                break;
            }else if(allWhitePieces.includes(chessState.chessPieces[i][col].piece)){
                break;
            }
        }
        // Determine possible left moves
        for(let i = col - 1; i >= 0; i--) {
            if(chessState.chessPieces[row][i].piece === ' '){
                chessState.chessPieces[row][i].boardState = 'move';
            }else if(allBlackPieces.includes(chessState.chessPieces[row][i].piece)){
                chessState.chessPieces[row][i].boardState = 'eat';
                break;
            }else if(allWhitePieces.includes(chessState.chessPieces[row][i].piece)){
                break;
            }
        }
        // Determine possible right moves
        for(let i = col + 1; i <= 7; i++) {
            console.log(chessState.chessPieces[row][i].piece)
            if(chessState.chessPieces[row][i].piece === ' '){
                chessState.chessPieces[row][i].boardState = 'move';
            }else if(allBlackPieces.includes(chessState.chessPieces[row][i].piece)){
                chessState.chessPieces[row][i].boardState = 'eat';
                break;
            }else if(allWhitePieces.includes(chessState.chessPieces[row][i].piece)){
                break;
            }
        }

    
    }else { // Determine possible moves for black rook
        // Determine possible up moves
        for(let i = row - 1; i >= 0; i--) {
            if(chessState.chessPieces[i][col].piece === ' '){
                chessState.chessPieces[i][col].boardState = 'move';
            }else if(allWhitePieces.includes(chessState.chessPieces[i][col].piece)){
                chessState.chessPieces[i][col].boardState = 'eat';
                break;
            }else if(allBlackPieces.includes(chessState.chessPieces[i][col].piece)){
                break;
            }
        }

        // Determine possible down moves
        for(let i = row + 1; i <= 7; i++) {
            if(chessState.chessPieces[i][col].piece === ' '){
                chessState.chessPieces[i][col].boardState = 'move';
            }else if(allWhitePieces.includes(chessState.chessPieces[i][col].piece)){
                chessState.chessPieces[i][col].boardState = 'eat';
                break;
            }else if(allBlackPieces.includes(chessState.chessPieces[i][col].piece)){
                break;
            }
        }

        // Determine possible left moves
        for(let i = col - 1; i >= 0; i--) {
            if(chessState.chessPieces[row][i].piece === ' '){
                chessState.chessPieces[row][i].boardState = 'move';
            }else if(allWhitePieces.includes(chessState.chessPieces[row][i].piece)){
                chessState.chessPieces[row][i].boardState = 'eat';
                break;
            }else if(allBlackPieces.includes(chessState.chessPieces[row][i].piece)){
                break;
            }
        }

        // Determine possible right moves
        for(let i = col + 1; i <= 7; i++) {
            if(chessState.chessPieces[row][i].piece === ' '){
                chessState.chessPieces[row][i].boardState = 'move';
            }else if(allWhitePieces.includes(chessState.chessPieces[row][i].piece)){
                chessState.chessPieces[row][i].boardState = 'eat';
                break;
            }else if(allBlackPieces.includes(chessState.chessPieces[row][i].piece)){
                break;
            }
        }
    }

    console.log(chessState.chessPieces);
}