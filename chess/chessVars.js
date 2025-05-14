// All chess pieces variavble for comparison
export let allWhitePieces = ['wp', 'wr', 'wn', 'wb', 'wq', 'wk'];
export let allBlackPieces = ['bp', 'br', 'bn', 'bb', 'bq', 'bk'];

export let chessState = {
    state: 'playerWTurn', // playerBTurn, playerWTurn, playerBPick, playerWPick, end
    chessPieces: [
        [{piece:'br',possibleCastle:true}, {piece:'bn'}, {piece:'bb'}, {piece:'bq'}, {piece:'bk',possibleCastle:true}, {piece:'bb'}, {piece:'bn'}, {piece:'br',possibleCastle:true}],
        [{piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}],
        [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
        [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
        [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
        [{piece:' '}, {piece:'bp', twoStepUsed:false}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
        [{piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}],
        [{piece:'wr', possibleCastle:true}, {piece:'wn'}, {piece:'wb'}, {piece:'wq'}, {piece:'wk', possibleCastle:true}, {piece: 'wb'}, {piece:'wn'}, {piece:'wr',possibleCastle:true}]
    ],
    capturedWhitePieces: [], // structure: {piece, pos:{row,col}}
    capturedBlackPieces: [],
    // chessPieces: [
    //     [{piece:'br',possibleCastle:true},{piece:' '}, {piece:' '}, {piece:' '}, {piece:'bk',possibleCastle:true}, {piece:' '}, {piece:' '}, {piece:'br',possibleCastle:true}],
    //     [{piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}],
    //     [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
    //     [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
    //     [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
    //     [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
    //     [{piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}],
    //     [{piece:'wr', possibleCastle:true}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:'wk', possibleCastle:true}, {piece:' '}, {piece:' '}, {piece:'wr',possibleCastle:true}]
    // ],
    pickedPiece: null, // structure: [row, col],
    enPassant: {
        location: null, // structure: { row, col }
        signal: false, // true to tell if the player do en passant move
    }
}

export function restartChessState(chessState) {
    chessState.state = 'playerWTurn', // playerBTurn, playerWTurn, playerBPick, playerWPick, end
    chessState.chessPieces = [
        [{piece:'br'}, {piece:'bn'}, {piece:'bb'}, {piece:'bq'}, {piece:'bk'}, {piece:'bb'}, {piece:'bn'}, {piece:'br'}],
        [{piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}, {piece:'bp', twoStepUsed:false}],
        [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
        [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
        [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
        [{piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}, {piece:' '}],
        [{piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}, {piece:'wp', twoStepUsed:false}],
        [{piece:'wr'}, {piece:'wn'}, {piece:'wb'}, {piece:'wq'}, {piece:'wk'}, {piece:'wb'}, {piece:'wn'}, {piece:'wr'}]
    ],
    chessState.pickedPiece = null, // structure: [row, col],
    chessState.enPassant = {
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

    chessCanvasState.menuButton = {
        x: chessCanvasState.startX - 270,
        y: chessCanvasState.startY + 100,
        width: 200,
        height: 40,
        text: 'Menu',
        textSize: 30
    }

    chessCanvasState.restartButton = {
        x: chessCanvasState.startX - 270,
        y: chessCanvasState.startY + 160,
        width: 200,
        height: 40,
        text: 'Restart',
        textSize: 30
    }

    chessCanvasState.capturedWhitePieces = {
        x: chessCanvasState.startX + (chessCanvasState.tileSize * 8) + 70,
        y: chessCanvasState.startY,
        width: chessCanvasState.tileSize * 5,
        height: chessCanvasState.tileSize * 4
    }


    chessCanvasState.capturedBlackPieces = {
        x: chessCanvasState.startX + (chessCanvasState.tileSize * 8) + 70,
        y: chessCanvasState.startY + (chessCanvasState.tileSize * 4),
        width: chessCanvasState.tileSize * 5,
        height: chessCanvasState.tileSize * 4
    }

    return chessCanvasState;
}
