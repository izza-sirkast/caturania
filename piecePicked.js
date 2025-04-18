// Functions to determine possible moves for each piece and also highlight them on the canvas
// These functions are called when a piece is picked and the possible moves are calculated based on the piece type and position

// All chess pieces variavble for comparison
export let allWhitePieces = ['wp', 'wr', 'wn', 'wb', 'wq', 'wk'];
export let allBlackPieces = ['bp', 'br', 'bn', 'bb', 'bq', 'bk'];

export function determinePossibleMoves(piece, isWhite, row, col, chessState) {
    switch(piece) {
        case 'wp':
        case 'bp':
            pawnPossibleMoves(isWhite, row, col, chessState);
            break;
        case 'wr':
        case 'br':
            rookPossibleMoves(isWhite, row, col, chessState);
            break;
        case 'wn':
        case 'bn':
            knightPossibleMoves(isWhite, row, col, chessState);
            break;
        case 'wb':
        case 'bb':
            bishopPossibleMoves(isWhite, row, col, chessState);
            break;
        case 'wq':
        case 'bq':
            queenPossibleMoves(isWhite, row, col, chessState);
            break;
        case 'wk':
        case 'bk':
            kingPossibleMoves(isWhite, row, col, chessState);
            break;
    }
}

function pawnPossibleMoves(isWhite, row, col, chessState) {
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

function rookPossibleMoves(isWhite, row, col, chessState) {
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

function knightPossibleMoves(isWhite, row, col, chessState) {
    // Determine possible moves for knight
    let knightMoves = [
        [row - 2, col - 1], [row - 2, col + 1],
        [row - 1, col - 2], [row - 1, col + 2],
        [row + 1, col - 2], [row + 1, col + 2],
        [row + 2, col - 1], [row + 2, col + 1]
    ];

    for(let i = 0; i < knightMoves.length; i++) {
        let move = knightMoves[i];
        let row = move[0];
        let col = move[1];
        if(row >= 0 && row <= 7 && col >= 0 && col <= 7) {
            if(chessState.chessPieces[row][col].piece === ' ') {
                chessState.chessPieces[row][col].boardState = 'move';
            }else if(isWhite && allBlackPieces.includes(chessState.chessPieces[row][col].piece)) {
                chessState.chessPieces[row][col].boardState = 'eat';
            }else if(!isWhite && allWhitePieces.includes(chessState.chessPieces[row][col].piece)) {
                chessState.chessPieces[row][col].boardState = 'eat';
            }
        }
    }

    console.log(chessState.chessPieces)
}

function bishopPossibleMoves(isWhite, row, col, chessState) {
    // Determine possible moves for bishop
    if(isWhite){
        // Determine possible up left moves
        for(let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if(chessState.chessPieces[i][j].piece === ' '){
                chessState.chessPieces[i][j].boardState = 'move';
            }else if(allBlackPieces.includes(chessState.chessPieces[i][j].piece)){
                chessState.chessPieces[i][j].boardState = 'eat';
                break;
            }else if(allWhitePieces.includes(chessState.chessPieces[i][j].piece)){
                break;
            }
        }
        // Determine possible up right moves
        for(let i = row - 1, j = col + 1; i >= 0 && j <= 7; i--, j++) {
            if(chessState.chessPieces[i][j].piece === ' '){
                chessState.chessPieces[i][j].boardState = 'move';
            }else if(allBlackPieces.includes(chessState.chessPieces[i][j].piece)){
                chessState.chessPieces[i][j].boardState = 'eat';
                break;
            }else if(allWhitePieces.includes(chessState.chessPieces[i][j].piece)){
                break;
            }
        }
        // Determine possible down left moves
        for(let i = row + 1, j = col - 1; i <= 7 && j >= 0; i++, j--) {
            if(chessState.chessPieces[i][j].piece === ' '){
                chessState.chessPieces[i][j].boardState = 'move';
            }else if(allBlackPieces.includes(chessState.chessPieces[i][j].piece)){
                chessState.chessPieces[i][j].boardState = 'eat';
                break;
            }else if(allWhitePieces.includes(chessState.chessPieces[i][j].piece)){
                break;
            }
        }
        // Determine possible down right moves
        for(let i = row + 1, j = col + 1; i <= 7 && j <= 7; i++, j++) {
            if(chessState.chessPieces[i][j].piece === ' '){
                chessState.chessPieces[i][j].boardState = 'move';
            }else if(allBlackPieces.includes(chessState.chessPieces[i][j].piece)){
                chessState.chessPieces[i][j].boardState = 'eat';
                break;
            }
            else if(allWhitePieces.includes(chessState.chessPieces[i][j].piece)){
                break;
            }
        }
    }else { // Determine possible moves for black bishop
        // Determine possible up left moves
        for(let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if(chessState.chessPieces[i][j].piece === ' '){
                chessState.chessPieces[i][j].boardState = 'move';
            }else if(allWhitePieces.includes(chessState.chessPieces[i][j].piece)){
                chessState.chessPieces[i][j].boardState = 'eat';
                break;
            }else if(allBlackPieces.includes(chessState.chessPieces[i][j].piece)){
                break;
            }
        }
        // Determine possible up right moves
        for(let i = row - 1, j = col + 1; i >= 0 && j <= 7; i--, j++) {
            if(chessState.chessPieces[i][j].piece === ' '){
                chessState.chessPieces[i][j].boardState = 'move';
            }else if(allWhitePieces.includes(chessState.chessPieces[i][j].piece)){
                chessState.chessPieces[i][j].boardState = 'eat';
                break;
            }else if(allBlackPieces.includes(chessState.chessPieces[i][j].piece)){
                break;
            }
        }
        // Determine possible down left moves
        for(let i = row + 1, j = col - 1; i <= 7 && j >= 0; i++, j--) {
            if(chessState.chessPieces[i][j].piece === ' '){
                chessState.chessPieces[i][j].boardState = 'move';
            }else if(allWhitePieces.includes(chessState.chessPieces[i][j].piece)){
                chessState.chessPieces[i][j].boardState = 'eat';
                break;
            }else if(allBlackPieces.includes(chessState.chessPieces[i][j].piece)){
                break;
            }
        }
        // Determine possible down right moves
        for(let i = row + 1, j = col + 1; i <= 7 && j <= 7; i++, j++) {
            if(chessState.chessPieces[i][j].piece === ' '){
                chessState.chessPieces[i][j].boardState = 'move';
            }else if(allWhitePieces.includes(chessState.chessPieces[i][j].piece)){
                chessState.chessPieces[i][j].boardState = 'eat';
                break;
            }else if(allBlackPieces.includes(chessState.chessPieces[i][j].piece)){
                break;
            }
        }
    }

}

function queenPossibleMoves(isWhite, row, col, chessState) {
    // Determine possible moves for queen
    rookPossibleMoves(isWhite, row, col, chessState);
    bishopPossibleMoves(isWhite, row, col, chessState);
}

function kingPossibleMoves(isWhite, row, col, chessState){
    // Determine possible moves for king
    let kingMoves = [
        [row - 1, col - 1], [row - 1, col], [row - 1, col + 1],
        [row, col - 1], [row, col + 1],
        [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]
    ];

    for(let i = 0; i < kingMoves.length; i++) {
        let move = kingMoves[i];
        let row = move[0];
        let col = move[1];
        if(row >= 0 && row <= 7 && col >= 0 && col <= 7) {
            if(chessState.chessPieces[row][col].piece === ' ') {
                chessState.chessPieces[row][col].boardState = 'move';
            }else if(isWhite && allBlackPieces.includes(chessState.chessPieces[row][col].piece)) {
                chessState.chessPieces[row][col].boardState = 'eat';
            }else if(!isWhite && allWhitePieces.includes(chessState.chessPieces[row][col].piece)) {
                chessState.chessPieces[row][col].boardState = 'eat';
            }
        }
    }
}