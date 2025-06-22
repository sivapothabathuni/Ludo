
const canvas = document.getElementById("ludoBoard");
const ctx = canvas.getContext("2d");
let currentPlayer = 0;
const players = ["Red", "Green", "Yellow", "Blue"];
const colors = ["#ff0000", "#00cc00", "#ffff00", "#0000ff"];
let diceRoll = 0;

// Game board positions (simplified 1D path with 30 cells)
const path = [];
for (let i = 0; i < 30; i++) {
    path.push({ x: 60 + (i % 10) * 50, y: 250 + Math.floor(i / 10) * 50 });
}

// Tokens state
const tokens = [
    { position: 0, active: true }, // Red
    { position: 0, active: true }, // Green
    { position: 0, active: true }, // Yellow
    { position: 0, active: true }  // Blue
];

function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw path
    path.forEach((cell, index) => {
        ctx.strokeStyle = "#888";
        ctx.strokeRect(cell.x - 20, cell.y - 20, 40, 40);
        ctx.fillStyle = "#fafafa";
        ctx.fillRect(cell.x - 20, cell.y - 20, 40, 40);
        ctx.fillStyle = "#000";
        ctx.font = "10px Arial";
        ctx.fillText(index, cell.x - 5, cell.y + 3);
    });

    // Draw tokens
    tokens.forEach((token, i) => {
        const cell = path[token.position];
        ctx.beginPath();
        ctx.arc(cell.x, cell.y, 15, 0, 2 * Math.PI);
        ctx.fillStyle = colors[i];
        ctx.fill();
        ctx.stroke();
    });
}

function rollDice() {
    diceRoll = Math.floor(Math.random() * 6) + 1;
    document.getElementById("diceResult").innerText = players[currentPlayer] + " rolled: " + diceRoll;
}

canvas.addEventListener("click", () => {
    if (!tokens[currentPlayer].active) return;

    // Move token
    tokens[currentPlayer].position += diceRoll;

    // Win condition
    if (tokens[currentPlayer].position >= path.length - 1) {
        tokens[currentPlayer].position = path.length - 1;
        tokens[currentPlayer].active = false;
        alert(players[currentPlayer] + " wins!");
    }

    // Collision detection (reset collided tokens to start)
    tokens.forEach((token, i) => {
        if (i !== currentPlayer &&
            tokens[currentPlayer].position === token.position &&
            token.active) {
            token.position = 0;
            alert(players[i] + "'s token was cut by " + players[currentPlayer]);
        }
    });

    drawBoard();
    currentPlayer = (currentPlayer + 1) % players.length;
});

drawBoard();
