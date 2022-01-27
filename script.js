const gameBoard = (() => {
  const gridItem = document.querySelectorAll(".grid-item");
  const winnerText = document.querySelector(".turn-text-container > p");
  const restartBtn = document.querySelector(".restart-btn");
  const restartOverlay = document.querySelector(".restart-overlay");
  const restartModal = document.querySelector(".restart-modal");
  let restartWinnerText = document.querySelector(".winner-text");
  let playerTurn = "X";
  let gameArray = [];

  const showRestartModal = (whoWonText) => {
    restartOverlay.style.display = "block";
    restartModal.style.display = "block";
    restartWinnerText.textContent = whoWonText;
  };

  const checkWinner = (player1, player2) => {
    console.log(gameArray);
    if (
      (gameArray[0] != undefined &&
        gameArray[0] === gameArray[1] &&
        gameArray[1] === gameArray[2]) ||
      (gameArray[3] != undefined &&
        gameArray[3] === gameArray[4] &&
        gameArray[4] === gameArray[5]) ||
      (gameArray[6] != undefined &&
        gameArray[6] === gameArray[7] &&
        gameArray[7] === gameArray[8]) ||
      (gameArray[0] != undefined &&
        gameArray[0] === gameArray[3] &&
        gameArray[3] === gameArray[6]) ||
      (gameArray[1] != undefined &&
        gameArray[1] === gameArray[4] &&
        gameArray[4] === gameArray[7]) ||
      (gameArray[2] != undefined &&
        gameArray[2] === gameArray[5] &&
        gameArray[5] === gameArray[8]) ||
      (gameArray[0] != undefined &&
        gameArray[0] === gameArray[4] &&
        gameArray[4] === gameArray[8]) ||
      (gameArray[2] != undefined &&
        gameArray[2] === gameArray[4] &&
        gameArray[4] === gameArray[6])
    ) {
      if (playerTurn === "X") {
        showRestartModal(`${player1.name} Won`);
      } else {
        showRestartModal(`${player2.name} Won`);
      }
    }
  };

  const DrawSymbol = (e, symbol, num) => {
    e.target.textContent = symbol;
    gameArray[num] = symbol;
  };

  // --------------------------------------EVENT LISTENER FUNCTIONS ----------------------------------------

  const handleGridItem = (player1, player2) => {
    return (e) => {
      console.log(player1, player2);
      let boxNumber = e.target.getAttribute("id");
      if (e.target.textContent === "" && playerTurn === "X") {
        winnerText.textContent = `${player2.name}'s Turn (${player2.sign})`;
        DrawSymbol(e, playerTurn, boxNumber);
        checkWinner(player1, player2);
        playerTurn = "O";
      } else if (e.target.textContent === "" && playerTurn === "O") {
        winnerText.textContent = `${player1.name}'s Turn (${player1.sign})`;
        DrawSymbol(e, playerTurn, boxNumber);
        checkWinner(player1, player2);
        playerTurn = "X";
      }
    };
  };

  const handleRestartBtn = () => {
    restartOverlay.style.display = "none";
    restartModal.style.display = "none";
    overlay.style.display = "block";
    gameArray.length = 0;
    playerTurn = "X";

    console.log("In restart");
    console.log("In restart");
    gridItem.forEach((item) => {
      item.textContent = "";
    });
  };

  // -------------------------------EVENT LISTENER------------------------------------

  const AddEvent = (player1, player2) => {
    console.log(player1, player2);
    winnerText.textContent = `${player1.name}'s Turn (${player1.sign})`;
    gridItem.forEach((item) => {
      item.addEventListener("click", handleGridItem(player1, player2));
    });
    restartBtn.addEventListener("click", handleRestartBtn);
  };

  return { AddEvent };
})();

const players = (name, sign) => {
  return { name, sign };
};

// ----------------------------------------------------------------------------------

const overlay = document.querySelector(".overlay");
const submitBtn = document.querySelector(".submit-btn");
const player1Name = document.querySelector(".player1-input");
const player2Name = document.querySelector(".player2-input");

const handleSubmit = () => {
  console.log("hello");
  overlay.style.display = "none";
  const player1 = players(player1Name.value, "X");
  const player2 = players(player2Name.value, "O");
  gameBoard.AddEvent(player1, player2);
};
submitBtn.addEventListener("click", handleSubmit);
