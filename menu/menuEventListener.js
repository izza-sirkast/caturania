import { changeGameState } from '../script.js';

export function menuEventListener(event, menuCanvasState) {
    // Get mouse hover position


    const x = event.clientX;
    const y = event.clientY;

    // Check if the click is within the start button area
    if (x >= menuCanvasState.startButton.x && x <= menuCanvasState.startButton.x + menuCanvasState.startButton.width &&
        y >= menuCanvasState.startButton.y && y <= menuCanvasState.startButton.y + menuCanvasState.startButton.height) {
        // Start the game
        console.log('Start button clicked!');
        changeGameState('play');

    }
}