// SELECT ELEMENTS

const cells = document.querySelectorAll(".cell");

const statusText =
    document.getElementById("status");

const restartBtn =
    document.getElementById("restartBtn");

const playerPopup =
    document.getElementById("playerPopup");

const startGameBtn =
    document.getElementById("startGameBtn");

const playerXInput =
    document.getElementById("playerXInput");

const playerOInput =
    document.getElementById("playerOInput");

const playerXNameText =
    document.getElementById("playerXName");

const playerONameText =
    document.getElementById("playerOName");

const playerXStats =
    document.getElementById("playerXStats");

const playerOStats =
    document.getElementById("playerOStats");

const totalMatchesText =
    document.getElementById("totalMatches");

// PLAYER DATA

let playerX = "Player X";
let playerO = "Player O";

// MATCH STATS

let xWins = 0;
let oWins = 0;

let xLosses = 0;
let oLosses = 0;

let totalMatches = 0;

// GAME VARIABLES

let currentPlayer = "X";

let gameActive = true;

let gameState =
    ["", "", "", "", "", "", "", "", ""];

// WINNING CONDITIONS

const winningConditions = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]
];

// START GAME

startGameBtn.addEventListener("click", () => {

    if(playerXInput.value.trim() !== ""){
        playerX = playerXInput.value;
    }

    if(playerOInput.value.trim() !== ""){
        playerO = playerOInput.value;
    }

    playerXNameText.textContent = playerX;

    playerONameText.textContent = playerO;

    statusText.textContent =
        `${playerX}'s Turn`;

    playerPopup.style.display = "none";
});

// HANDLE CELL CLICK

function handleCellClick(event){

    const clickedCell = event.target;

    const clickedIndex =
        clickedCell.getAttribute("data-index");

    if(gameState[clickedIndex] !== "" || !gameActive){
        return;
    }

    gameState[clickedIndex] = currentPlayer;

    clickedCell.textContent = currentPlayer;

    clickedCell.classList.add(
        currentPlayer.toLowerCase()
    );

    checkWinner();
}

// CHECK WINNER

function checkWinner(){

    let roundWon = false;

    for(let i=0; i<winningConditions.length; i++){

        const condition =
            winningConditions[i];

        const a =
            gameState[condition[0]];

        const b =
            gameState[condition[1]];

        const c =
            gameState[condition[2]];

        if(a === "" || b === "" || c === ""){
            continue;
        }

        if(a === b && b === c){

            roundWon = true;
            break;
        }
    }

    // WINNER

    if(roundWon){

        gameActive = false;

        totalMatches++;

        if(currentPlayer === "X"){

            xWins++;
            oLosses++;

            updateStats();

            showResultPopup(
                `🎉 ${playerX} Wins!`
            );
        }

        else{

            oWins++;
            xLosses++;

            updateStats();

            showResultPopup(
                `🎉 ${playerO} Wins!`
            );
        }

        return;
    }

    // DRAW

    if(!gameState.includes("")){

        gameActive = false;

        totalMatches++;

        updateStats();

        showResultPopup(
            "🤝 Match Draw!"
        );

        return;
    }

    // SWITCH PLAYER

    currentPlayer =
        currentPlayer === "X" ? "O" : "X";

    statusText.textContent =
        currentPlayer === "X"
        ? `${playerX}'s Turn`
        : `${playerO}'s Turn`;
}

// UPDATE STATS

function updateStats(){

    playerXStats.textContent =
        `Wins: ${xWins} | Losses: ${xLosses}`;

    playerOStats.textContent =
        `Wins: ${oWins} | Losses: ${oLosses}`;

    totalMatchesText.textContent =
        totalMatches;
}

// SHOW RESULT POPUP

function showResultPopup(message){

    const popup =
        document.createElement("div");

    popup.classList.add("result-popup");

    popup.innerHTML = `

        <div class="result-box">

            <h2>${message}</h2>

            <button id="playAgainBtn">
                Play Again
            </button>

        </div>

    `;

    document.body.appendChild(popup);

    document
        .getElementById("playAgainBtn")
        .addEventListener("click", () => {

            popup.remove();

            restartGame();
        });
}

// RESTART GAME

function restartGame(){

    currentPlayer = "X";

    gameActive = true;

    gameState =
        ["", "", "", "", "", "", "", "", ""];

    statusText.textContent =
        `${playerX}'s Turn`;

    cells.forEach(cell => {

        cell.textContent = "";

        cell.classList.remove("x");
        cell.classList.remove("o");
    });
}

// RESET BUTTON

restartBtn.addEventListener(
    "click",
    restartGame
);

// CELL EVENTS

cells.forEach(cell => {

    cell.addEventListener(
        "click",
        handleCellClick
    );
});