import { allWhitePieces, allBlackPieces } from './chessVars.js'; // Import the constants for piece colors

// Functions to determine possible moves for each piece and also highlight them on the canvas
// These functions are called when a piece is picked and the possible moves are calculated based on the piece type and position

export function determinePossibleMoves(chessState, move) {
    const { row, col } = move; 
    const piece = chessState.chessPieces[row][col].piece; // Get the piece type from the chess state
    const isWhite = allWhitePieces.includes(piece); // Determine if the piece is white or black

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

        // Check if there possible en passant move
        let enPassantLeft = chessState.chessPieces[row][col - 1]
        if(enPassantLeft !== undefined && enPassantLeft.piece === 'bp' && chessState.enPassant.location?.row === row && chessState.enPassant.location?.col === col - 1) {
            chessState.chessPieces[row - 1][col - 1].boardState = 'enPassant';
        }
        // Check if there possible en passant move
        let enPassantRight = chessState.chessPieces[row][col + 1]
        if(enPassantRight !== undefined && enPassantRight.piece === 'bp' && chessState.enPassant.location?.row === row && chessState.enPassant.location?.col === col + 1) {
            chessState.chessPieces[row - 1][col + 1].boardState = 'enPassant';
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

        // Check if there possible en passant move
        let enPassantLeft = chessState.chessPieces[row][col - 1]
        if(enPassantLeft !== undefined && enPassantLeft.piece === 'wp' && chessState.enPassant.location?.row === row && chessState.enPassant.location?.col === col - 1) {
            chessState.chessPieces[row + 1][col - 1].boardState = 'enPassant';
        }
        // Check if there possible en passant move
        let enPassantRight = chessState.chessPieces[row][col + 1]
        if(enPassantRight !== undefined && enPassantRight.piece === 'wp' && chessState.enPassant.location?.row === row && chessState.enPassant.location?.col === col + 1) {
            chessState.chessPieces[row + 1][col + 1].boardState = 'enPassant';
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

    // Check if can right castle
    const rightCastleWayClear = chessState.chessPieces[row][col + 1].piece === ' ' && chessState.chessPieces[row][col + 2] === ' ';
    const rightKingAndRookHasntMoved = chessState.chessPieces[row][col].possibleCastle && chessState.chessPieces[row][col + 3].piece === 'wr' && chessState.chessPieces[row][col + 3].possibleCastle
    if(rightCastleWayClear && rightKingAndRookHasntMoved) {
        // Check if the king is not in check


    }

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

export function checkPossibleMovesOnATile(chessState, row, col) {
    let possibleMoves = [];
    
    // == Check for possible pawn moves ==
    if(row >= 1){
        // check for possible normal pawn moves
        if(chessState.chessPieces[row - 1][col].piece === 'bp') {
            possibleMoves.push({row: row - 1, col, move: 'move'});
        }
        if(row >= 2){
            if(chessState.chessPieces[row - 2][col].piece === 'bp' &&  row === 3) {
                possibleMoves.push({row: row - 2, col, move: 'move'});
            }
        }

        // check for possible pawn eats
        if(col >= 1){
            if(chessState.chessPieces[row - 1][col - 1].piece === 'bp') {
                possibleMoves.push({row: row - 1, col: col - 1, move: 'eat'});
            }
        }
        if(col <= 6){
            if(chessState.chessPieces[row - 1][col + 1].piece === 'bp') {
                possibleMoves.push({row: row - 1, col: col + 1, move: 'eat'});
            }
        }
    }


    // == Check for possible knight moves ==
    if(row >= 2){
        if(col >= 1){
            if(chessState.chessPieces[row - 2][col - 1].piece === 'bn'){
                possibleMoves.push({row: row - 2, col: col - 1, move: 'both'});
            }
        }
        
        if(col <= 6){
            if(chessState.chessPieces[row - 2][col + 1].piece === 'bn'){
                possibleMoves.push({row: row - 2, col: col + 1, move: 'both'});
            }
        }
    }
    if(row >= 1){
        if(col >= 2){
            if(chessState.chessPieces[row - 1][col - 2].piece === 'bn'){
                possibleMoves.push({row: row - 1, col: col - 2, move: 'both'});
            }
        }
        
        if(col <= 5){
            if(chessState.chessPieces[row - 1][col + 2].piece === 'bn'){
                possibleMoves.push({row: row - 1, col: col + 2, move: 'both'});
            }
        }
    }
    if(row <= 6){
        if(col >= 1){
            if(chessState.chessPieces[row + 2][col - 1].piece === 'bn'){
                possibleMoves.push({row: row + 2, col: col - 1, move: 'both'});
            }
        }
        
        if(col <= 6){
            if(chessState.chessPieces[row + 2][col + 1].piece === 'bn'){
                possibleMoves.push({row: row + 2, col: col + 1, move: 'both'});
            }
        }
    }
    if(row <= 7){
        if(col >= 2){
            if(chessState.chessPieces[row + 1][col - 2].piece === 'bn'){
                possibleMoves.push({row: row + 1, col: col - 2, move: 'both'});
            }
        }
        
        if(col <= 5){
            if(chessState.chessPieces[row + 1][col + 2].piece === 'bn'){
                possibleMoves.push({row: row + 1, col: col + 2, move: 'both'});
            }
        }
    }


    // == Check for possible other pieces moves ==
    chessState.chessPieces.forEach((rowBoard, i) => {
        rowBoard.forEach((tile, j) => {
            switch(tile.piece) {
                case 'bb': // Check for possible bishop moves
                    const possibleBishopMoves = checkPossibleBishopMoves(chessState, row, col, i, j);
                    if(possibleBishopMoves !== null) {
                        possibleMoves.push(possibleBishopMoves);
                    }
                    break;

                case 'br': // Check for possible rook moves
                    const possibleRookMoves = checkPossibleRookMoves(chessState, row, col, i, j);
                    if(possibleRookMoves !== null) {
                        possibleMoves.push(possibleRookMoves);
                    }
                    break;
                
                case 'bq': // Check for possible queen moves
                    const possibleDiagonalMoves = checkPossibleBishopMoves(chessState, row, col, i, j);
                    if(possibleDiagonalMoves !== null) {
                        possibleMoves.push(possibleDiagonalMoves);
                    }else{
                        const possibleStraightMoves = checkPossibleRookMoves(chessState, row, col, i, j);
                        if(possibleStraightMoves !== null) {
                            possibleMoves.push(possibleStraightMoves);
                        }
                    }
                    break;

                case 'bk': // Check for possible king moves
                    const possibleKingMoves = checkPossibleKingMoves(chessState, row, col, i, j);
                    if(possibleKingMoves !== null) {
                        possibleMoves.push(possibleKingMoves);
                    }
                    break;
            
                default:
                    break;
            }
        })
    })

    return possibleMoves;
}

// Check for possible bishop moves to a target tile
function checkPossibleBishopMoves(chessState, targetRow, targetCol, bishopRow, bishopCol) {
    // If bishop not in the possible bishop move location
    if(!(Math.abs(bishopRow - targetRow) === Math.abs(bishopCol - targetCol))){
        return null;
    }

    // Check if there is a piece in the way
    if(bishopRow < targetRow && bishopCol < targetCol) { // if bishop is in the upper left diagonal
        for(let k = bishopRow + 1, l = bishopCol + 1; k < targetRow && l < targetCol; k++, l++) {
            if(chessState.chessPieces[k][l].piece !== ' '){
                return null;
            }
        }
    }
    if(bishopRow < targetRow && bishopCol > targetCol) { // if bishop is in the upper right diagonal
        for(let k = bishopRow + 1, l = bishopCol - 1; k < targetRow && l > targetCol; k++, l--) {
            if(chessState.chessPieces[k][l].piece !== ' '){
                return null;
            }
        }
    }if(bishopRow > targetRow && bishopCol < targetCol) { // if bishop is in the lower left diagonal
        for(let k = bishopRow - 1, l = bishopCol + 1; k > targetRow && l < targetCol; k--, l++) {
            if(chessState.chessPieces[k][l].piece !== ' '){
                return null;
            }
        }
    }if(bishopRow > targetRow && bishopCol > targetCol) { // if bishop is in the lower right diagonal
        for(let k = bishopRow - 1, l = bishopCol - 1; k > targetRow && l > targetCol; k--, l--) {
            if(chessState.chessPieces[k][l].piece !== ' '){
                return null;
            }
        }
    }

    return {row: bishopRow, col: bishopCol, move: 'both'};
}

// Check for possible rook moves to a target tile
function checkPossibleRookMoves(chessState, targetRow, targetCol, rookRow, rookCol){
    // If rook not in the possible rook move location
    if(!(rookRow === targetRow || rookCol === targetCol)){
        return null;
    }

    if(targetRow > rookRow && targetCol === rookCol) { // if rook is in the upper row
        // Check if there is a piece in the way
        for(let i = rookRow + 1; i < targetRow; i++) {
            if(chessState.chessPieces[i][rookCol].piece !== ' '){
                return null;
            }
        }
    }
    if(targetRow < rookRow && targetCol === rookCol) { // if rook is in the lower row
        // Check if there is a piece in the way
        for(let i = rookRow - 1; i > targetRow; i--) {
            if(chessState.chessPieces[i][rookCol].piece !== ' '){
                return null;
            }
        }
    }
    if(targetRow === rookRow && targetCol > rookCol) { // if rook is in the right column
        // Check if there is a piece in the way
        for(let i = rookCol + 1; i < targetCol; i++) {
            if(chessState.chessPieces[rookRow][i].piece !== ' '){
                return null;
            }
        }
    }
    if(targetRow === rookRow && targetCol < rookCol) { // if rook is in the left column
        // Check if there is a piece in the way
        for(let i = rookCol - 1; i > targetCol; i--) {
            if(chessState.chessPieces[rookRow][i].piece !== ' '){
                return null;
            }
        }
    }

    return {row: rookRow, col: rookCol, move: 'both'};
}

// Check for possible king moves to a target tile
function checkPossibleKingMoves(chessState, targetRow, targetCol, kingRow, kingCol) {
    // If king not in the possible king move location
    if(Math.abs(kingRow - targetRow) > 1 || Math.abs(kingCol - targetCol) > 1){
        return null;
    }

    return {row: kingRow, col: kingCol, move: 'both'};
}
