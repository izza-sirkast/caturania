import { allWhitePieces, allBlackPieces, restartChessState } from './chessVars.js';
import { determinePossibleMoves } from './determinePossibleMoves.js';
import { changeGameState } from '../script.js';

export function playerMoveListener (event, canvasState, chessState) {
    let clientX = event.clientX
    let clientY = event.clientY
    let x = clientX - canvasState.startX;
    let y = clientY - canvasState.startY;

    // If user clicks outside the chess board
    if(x < 0 || x > canvasState.tileSize * 8 || y < 0 || y > canvasState.tileSize * 8) {
        // If user click menu button
        if(clientX >= canvasState.menuButton.x && clientX <= canvasState.menuButton.x + canvasState.menuButton.width && clientY >= canvasState.menuButton.y && clientY <= canvasState.menuButton.y + canvasState.menuButton.height) {
            changeGameState('menu');
        }

        // If user click restart button
        if(clientX >= canvasState.restartButton.x && clientX <= canvasState.restartButton.x + canvasState.restartButton.width && clientY >= canvasState.restartButton.y && clientY <= canvasState.restartButton.y + canvasState.restartButton.height) {
            restartChessState(chessState);
        }

        return;
    }

    let row = Math.floor(y / canvasState.tileSize);
    let col = Math.floor(x / canvasState.tileSize);
    console.log(`${chessState.state} cliked on Row: ${row}, Col: ${col}`);
    
    if(chessState.state === 'playerWTurn' || chessState.state === 'playerBTurn') {
        handlePlayerTurn(chessState, {row, col});
    }else if(chessState.state === 'playerWPick' || chessState.state === 'playerBPick') {
        handlePlayerPick(chessState, {row, col});
    }
}

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
    const clickedIsPossibleMove = chessState.chessPieces[row][col].boardState !== undefined && (chessState.chessPieces[row][col].boardState === 'move' || chessState.chessPieces[row][col].boardState === 'eat' || chessState.chessPieces[row][col].boardState === 'enPassant')

    if(!clickedIsPossibleMove) {
        // Change state back to player turn
        chessState.state = chessState.state === 'playerWPick' ? 'playerWTurn' : 'playerBTurn';
        chessState.pickedPiece = null;

        // Neutralize the board state
        neutralizeBoardState(chessState);;
        return;    
    }


    // == Special condition ==
    let fromRow = chessState.pickedPiece[0];
    let fromCol = chessState.pickedPiece[1];
    const piece = chessState.chessPieces[fromRow][fromCol].piece;

     // reset possible en passant to null
     chessState.enPassant.location = null;

    // Check if the piece is a pawn
    if(piece === 'wp' || piece === 'bp'){
        chessState.chessPieces[fromRow][fromCol].twoStepUsed = true;
       
        // Signalling that there is possible en passant if the pawn moved two steps
        if(Math.abs(row - fromRow) == 2) {
            chessState.enPassant.location = {row, col};
        }
    }

    // Check for en passant move
    if(chessState.chessPieces[row][col].boardState === 'enPassant') {
        if(chessState.state === 'playerWPick') {
            chessState.chessPieces[row + 1][col] = {piece: ' '};
        }else if(chessState.state === 'playerBPick') {
            chessState.chessPieces[row - 1][col] = {piece: ' '};
        }
    } 


    // Neutralize the board state
    neutralizeBoardState(chessState);


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