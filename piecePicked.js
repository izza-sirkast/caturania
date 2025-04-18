// Functions to determine possible moves for each piece and also highlight them on the canvas
// These functions are called when a piece is picked and the possible moves are calculated based on the piece type and position

// All chess pieces variavble for comparison
export let allWhitePieces = ['wp', 'wr', 'wn', 'wb', 'wq', 'wk'];
export let allBlackPieces = ['bp', 'br', 'bn', 'bb', 'bq', 'bk'];

export function determinePossibleMoves(piece, isWhite, row, col, chessState) {
    switch(piece) {
        case 'wp':
        case 'bp':
            pawnPicked(isWhite, row, col, chessState);
            break;
        case 'wr':
        case 'br':
            rookPicked(isWhite, row, col, chessState);
            break;
    }
}

function pawnPicked(isWhite, row, col, chessState) {
    if(isWhite){ // Determine possible moves for white pawn
        // Check if there is a piece in the way
        if(chessState.chessPieces[row - 1][col].piece === ' ') {
            chessState.chessPieces[row - 1][col].boardState = 'move' // Move up

            // Check if the pawn has moved two steps before
            if(chessState.chessPieces[row][col].twoStepUsed == false && chessState.chessPieces[row - 2][col].piece === ' ') {
                chessState.chessPieces[row - 2][col].boardState = 'move' // Move two steps up
            }
        }

        // Check if there is a piece in diagonal way
        let diagonalLeft = chessState.chessPieces[row - 1][col - 1]
        if(diagonalLeft !== undefined && allBlackPieces.includes(diagonalLeft.piece)) {
            chessState.chessPieces[row - 1][col - 1].boardState = 'eat'; // Move diagonal up left
        }
        let diagonalRight = chessState.chessPieces[row - 1][col + 1]
        if(diagonalRight !== undefined && allBlackPieces.includes(diagonalRight.piece)) {
            chessState.chessPieces[row - 1][col + 1].boardState = 'eat'; // Move diagonal up right
        }

    }else { // Determine possible moves for black pawn
        // Check if there is a piece in the way 
        if(chessState.chessPieces[row + 1][col].piece === ' ') {
            chessState.chessPieces[row + 1][col].boardState = 'move' // Move down

            // Check if the pawn has moved two steps before
            if(chessState.chessPieces[row][col].twoStepUsed == false && chessState.chessPieces[row + 2][col].piece === ' ') {
                chessState.chessPieces[row + 2][col].boardState = 'move' // Move two steps down
            }
        }

        // Check if there is a piece in diagonal way
        let diagonalLeft = chessState.chessPieces[row + 1][col - 1]
        if(diagonalLeft !== undefined && allWhitePieces.includes(diagonalLeft.piece)) {
            chessState.chessPieces[row + 1][col - 1].boardState = 'eat'; // Move diagonal down left
        }
        let diagonalRight = chessState.chessPieces[row + 1][col + 1]
        if(diagonalRight !== undefined && allWhitePieces.includes(diagonalRight.piece)) {
            chessState.chessPieces[row + 1][col + 1].boardState = 'eat'; // Move diagonal down right
        }
    }    
}

function rookPicked(isWhite, row, col, chessState) {
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
}
