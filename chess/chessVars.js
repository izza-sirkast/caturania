// All chess pieces variavble for comparison
export let allWhitePieces = ['wp', 'wr', 'wn', 'wb', 'wq', 'wk'];
export let allBlackPieces = ['bp', 'br', 'bn', 'bb', 'bq', 'bk'];

export let chessState = {
    state: 'playerWTurn', // playerBTurn, playerWTurn, playerBPick, playerWPick, end
    chessPieces: [
        [{piece:'br'}, {piece:'bn'}, {piece:'bb'}, {piece:'bq'}, {piece:'bk'}, {piece:'bb'}, {piece:'bn'}, {piece:'br'}],
        [{piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}],
        [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
        [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
        [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
        [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
        [{piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}],
        [{piece:'wr'}, {piece:'wn'}, {piece:'wb'}, {piece:'wq'}, {piece:'wk'}, {piece:'wb'}, {piece:'wn'}, {piece:'wr'}]
    ],
    // chessPieces: [
    //     [{piece:' '},  {piece:' '}, {piece:' '}, {piece:'bq'}, {piece:'bk'}, {piece:' '}, {piece:' '}, {piece:' '}],
    //     [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
    //     [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
    //     [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
    //     [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
    //     [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
    //     [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
    //     [{piece:' '}, {piece:' '}, {piece:' '}, {piece:'wq'}, {piece:'wk'}, {piece:' '}, {piece:' '}, {piece:' '}]
    // ],
    pickedPiece: null, // structure: [row, col],
    enPassant: {
        location: null, // structure: { row, col }
        signal: false, // true to tell if the player do en passant move
    }
}

export function initChessCanvasState(ctx) {
    let chessCanvasState = {
        ctx,
        tileSize: 50
    }
    chessCanvasState.startX = window.innerWidth / 2 - (chessCanvasState.tileSize * 8) / 2;
    chessCanvasState.startY = window.innerHeight / 2 - (chessCanvasState.tileSize * 8) / 2;

    return chessCanvasState;
}