import { allWhitePieces, allBlackPieces } from './constants/chessConstants.js';
import { determinePossibleMoves } from './determinePossibleMoves.js';

// Handle player mouse click when it's their turn (when player pick a piece but hasn't moved it yet)
export function handlePlayerTurn(chessState, move) {
    const { row, col } = move;
    let clickedPiece = chessState.chessPieces[row][col].piece;


    // == Check if the clicked thing is not a valid piece ==
    if(chessState.state === 'playerWTurn' && !allWhitePieces.includes(clickedPiece)) {
        console.log('Not a white piece!');
        chessState.state = 'playerWTurn';
        return;
    }else if(chessState.state === 'playerBTurn' && !allBlackPieces.includes(clickedPiece)) {
        console.log('Not a black piece!');
        chessState.state = 'playerBTurn';
        return;
    }

    
    // Change chess state to from turn to pick
    chessState.state = chessState.state === 'playerWTurn' ? 'playerWPick' : 'playerBPick';

    chessState.pickedPiece = [row, col];

    // Determine possible moves for the clicked piece
    determinePossibleMoves(chessState, {row, col});
}

export function handlePlayerPick(chessState, move) {
    const { row, col } = move;

    // == Check if the clicked thing is not a possible move ==
    const clickedIsPossibleMove = chessState.chessPieces[row][col].boardState !== undefined && (chessState.chessPieces[row][col].boardState === 'move' || chessState.chessPieces[row][col].boardState === 'eat')

    if(!clickedIsPossibleMove) {
        // Change state back to player turn
        chessState.state = chessState.state === 'playerWPick' ? 'playerWTurn' : 'playerBTurn';
        chessState.pickedPiece = null;

        // Neutralize the board state
        neutralizeBoardState(chessState);;
        return;    
    }


    // Neutralize the board state
    neutralizeBoardState(chessState);


    // == Special condition ==
    let fromRow = chessState.pickedPiece[0];
    let fromCol = chessState.pickedPiece[1];
    const piece = chessState.chessPieces[fromRow][fromCol].piece;

    // Check if the piece is a pawn and if it moved two steps
    if((piece === 'wp' || piece === 'bp') && Math.abs(row - fromRow) == 2){
        chessState.chessPieces[fromRow][fromCol].twoStepUsed = true;
        
        // Signalling that there is possible en passant
        chessState.enPassant.location = [row, col];
    }


    // == Move the piece ==
    chessState.chessPieces[row][col] = chessState.chessPieces[fromRow][fromCol];
    chessState.chessPieces[fromRow][fromCol] = {piece: ' '};
    chessState.pickedPiece = null;
    chessState.state = chessState.state === 'playerWPick' ? 'playerBTurn' : 'playerWTurn';
}

function neutralizeBoardState(chessState) {
    for (let i = 0; i < chessState.chessPieces.length; i++) {
        for (let j = 0; j < chessState.chessPieces[i].length; j++) {
            chessState.chessPieces[i][j].boardState = undefined;
        }
    }
}