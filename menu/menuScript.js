export function renderMenu(menuCanvasState) {
        menuCanvasState.ctx.clearRect(0, 0, menuCanvasState.ctx.canvas.width, menuCanvasState.ctx.canvas.height);

        // Menu title
        menuCanvasState.ctx.fillStyle = 'black';
        menuCanvasState.ctx.font = '50px monospace';
        menuCanvasState.ctx.fillText('caturania', menuCanvasState.ctx.canvas.width / 2 - 123, menuCanvasState.ctx.canvas.height / 2 - 100);

        // Menu subtitle
        menuCanvasState.ctx.fillStyle = 'black';
        menuCanvasState.ctx.font = '18px monospace';
        menuCanvasState.ctx.fillText('lightweight web based chess game only using html canvas and plain javascript', menuCanvasState.ctx.canvas.width / 2 - 370, menuCanvasState.ctx.canvas.height / 2 - 70);
        menuCanvasState.ctx.fillText('classic - blitz - against computer - invites your friends', menuCanvasState.ctx.canvas.width / 2 - 280, menuCanvasState.ctx.canvas.height / 2 - 50);

        // Draw start button in rounded rectangle
        menuCanvasState.ctx.fillStyle = 'black';
        menuCanvasState.ctx.fillRect(menuCanvasState.startButton.x, menuCanvasState.startButton.y, menuCanvasState.startButton.width, menuCanvasState.startButton.height);
        menuCanvasState.ctx.fillStyle = 'white';
        menuCanvasState.ctx.font = `${menuCanvasState.startButton.textSize}px monospace`;
        menuCanvasState.ctx.fillText('Start', menuCanvasState.startButton.x + 62, menuCanvasState.startButton.y + 29);
}