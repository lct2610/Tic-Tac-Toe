console.log("Tic Tac Toe Started")

// Game State
let currentPlayer = "X"
let gameOver = false;

let scoreX = 0;
let scoreO = 0;

// DOM Elements
const boxes = document.querySelectorAll(".box");
const boxTexts = document.querySelectorAll(".boxtext");
const info = document.querySelector(".info");
const line = document.querySelector(".line");
const resetBtn = document.getElementById("reset");
const resetScoreBtn = document.getElementById("resetScore");
const scoreX_Element = document.getElementById("scoreX");
const scoreO_Element = document.getElementById("scoreO");

// Wining Combinations
const winningPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Function to change turn
function changeTurn() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Function to check Win
function checkWin() {
    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;

        if (
            boxTexts[a].innerText !== "" &&
            boxTexts[a].innerText === boxTexts[b].innerText &&
            boxTexts[b].innerText === boxTexts[c].innerText
        ) {
            gameOver = true;
            const winner = boxTexts[a].innerText;

            info.innerText = `${winner} Won!`;

            // Update Score
             if (winner === "X") {
                scoreX++;
                scoreX_Element.innerText = scoreX;
            } else {
                scoreO++;
                scoreO_Element.innerText = scoreO;
            }

            drawWinningLine(pattern);
            return;
        }
    }

    // Check Draw
    const allFilled = [...boxTexts].every(box => box.innerText !== "");
    if (allFilled && !gameOver) {
        info.innerText = "It's a Draw!";
        gameOver = true;
    }
}
  
// Wining Line
function drawWinningLine(pattern) {
    const linePositions = {
        "0,1,2": "translate(5vw, 5vw) rotate(0deg)",
        "3,4,5": "translate(5vw, 15vw) rotate(0deg)",
        "6,7,8": "translate(5vw, 25vw) rotate(0deg)",
        "0,3,6": "translate(-5vw, 15vw) rotate(90deg)",
        "1,4,7": "translate(5vw, 15vw) rotate(90deg)",
        "2,5,8": "translate(15vw, 15vw) rotate(90deg)",
        "0,4,8": "translate(5vw, 15vw) rotate(45deg)",
        "2,4,6": "translate(5vw, 15vw) rotate(135deg)"
    };

    const key = pattern.join(",");
    line.style.transform = linePositions[key];
    line.style.width = "20vw";
}

// Box Click Logic
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (!gameOver && boxTexts[index].innerText === "") {
            boxTexts[index].innerText = currentPlayer;
            checkWin();

            if (!gameOver) {
                changeTurn();
                info.innerText = `Turn for ${currentPlayer}`;
            }
        }
    });
});

// Reset Board
resetBtn.addEventListener("click", () => {
    boxTexts.forEach(box => box.innerText = "");

    currentPlayer = "X";
    gameOver = false;

    info.innerText = `Turn for ${currentPlayer}`;

    line.style.width = "0";
    line.style.transform = "translate(0,0) rotate(0deg)";
});

// Reset Score
resetScoreBtn.addEventListener("click", () => {
    scoreX = 0;
    scoreO = 0;

    scoreX_Element.innerText = "0";
    scoreO_Element.innerText = "0";
});