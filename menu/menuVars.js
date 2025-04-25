export function initMenuCanvasState(ctx) {
    let menuCanvasState = {
        ctx,
    }
    menuCanvasState.startButton = {
        x: window.innerWidth / 2 - 100,
        y: window.innerHeight / 2 - 20,
        width: 200,
        height: 40,
        text: 'Start'
    }

    return menuCanvasState;
}