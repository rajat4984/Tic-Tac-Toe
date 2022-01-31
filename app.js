// -------------------GLOBAL VARIABLES-------------------------------
let submitBtn = document.querySelector(".submit-btn");
let player1Input = document.querySelector(".player1-input");
let player2Input = document.querySelector(".player2-input");

const players = (name, sign) => {
  const getName = () => name;
  const getSign = () => sign;
  return { getName, getSign };
};

// ------------------------------HANDLE SUBMIT MODULE PATTERN-------------------------------------

const handleSubmitBtn = () => {
  let overlay = document.querySelector(".overlay");

  if (player1Input.value !== "" || player2Input.value !== "") {
    //CHECKS IF PLAYER NAME IS NOT ENTERED
    overlay.style.display = "none";
  } else {
    return;
  }
  let restartOverlay = document.querySelector(".restart-overlay");
  let winnerText = document.querySelector(".winner-text");
  let restartBtn = document.querySelector(".restart-btn");
  let cancelBtn = document.querySelector(".cancel-btn");

  cancelBtn.addEventListener(
    "click",
    () => (restartOverlay.style.display = "none")
  );

  const restartGame = (text) => {
    restartOverlay.style.display = "block";
    winnerText.textContent = text;
    restartBtn.addEventListener("click", () => {
      restartOverlay.style.display = "none";
      overlay.style.display = "block";
    });
  };

  const player1 = players(`${player1Input.value}`, "X");
  const player2 = players(`${player2Input.value}`, "O");

  const gameBoard = (() => {
    let gridItem = document.querySelectorAll(".grid-item");
    let gameArray = ["", "", "", "", "", "", "", "", ""];

    const makeGrid = () => {
      for (let i = 0; i < gameArray.length; i++) {
        gridItem[i].textContent = gameArray[i];
      }
    };

    const updateArray = (player, index) => {
      index = Number(index);
      gameArray[index] = player.getSign();
      makeGrid();
    };

    const checkWinner = (turn) => {
      if (
        (gameArray[0] != "" &&
          gameArray[0] === gameArray[1] &&
          gameArray[1] === gameArray[2]) ||
        (gameArray[3] != "" &&
          gameArray[3] === gameArray[4] &&
          gameArray[4] === gameArray[5]) ||
        (gameArray[6] != "" &&
          gameArray[6] === gameArray[7] &&
          gameArray[7] === gameArray[8]) ||
        (gameArray[0] != "" &&
          gameArray[0] === gameArray[3] &&
          gameArray[3] === gameArray[6]) ||
        (gameArray[1] != "" &&
          gameArray[1] === gameArray[4] &&
          gameArray[4] === gameArray[7]) ||
        (gameArray[2] != "" &&
          gameArray[2] === gameArray[5] &&
          gameArray[5] === gameArray[8]) ||
        (gameArray[0] != "" &&
          gameArray[0] === gameArray[4] &&
          gameArray[4] === gameArray[8]) ||
        (gameArray[2] != "" &&
          gameArray[2] === gameArray[4] &&
          gameArray[4] === gameArray[6])
      ) {
        if (turn === player1.getSign()) {
          return true;
        } else if (turn === player2.getSign()) {
          return true;
        }
      }
    };

    makeGrid();

    return { gameArray, gridItem, makeGrid, updateArray, checkWinner };
  })();

  // ----------------------DISPLAY CONTROL -------------------------

  const displayControl = (() => {
    let playerTurn = "X";
    let turnText = document.querySelector(".turn-text-container > p");

    const turnTextChanger = (player) => {
      turnText.textContent = `${player.getName()}'s Turn (${player.getSign()})`;
    };

    turnTextChanger(player1);

    const TurnChoser = (currentPlayer, otherPlayer, turnText, index) => {
      turnTextChanger(otherPlayer);
      gameBoard.updateArray(currentPlayer, index);
      if (gameBoard.checkWinner(playerTurn, turnText)) {
        turnText.textContent = `${currentPlayer.getName()} won the game!`;
        removeListener();
        restartGame(turnText.textContent);
      }
      playerTurn = otherPlayer.getSign();
    };

    const handleGrid = (e) => {
      if (e.target.textContent !== "") {
        return;
      } else {
        let index = e.target.getAttribute("data-index");
        if (playerTurn === player1.getSign()) {
          TurnChoser(player1, player2, turnText, index);
        } else {
          TurnChoser(player2, player1, turnText, index);
        }
      }
    };

    const removeListener = () => {
      gameBoard.gridItem.forEach((item) => {
        item.removeEventListener("click", handleGrid);
      });
    };

    gameBoard.gridItem.forEach((item) => {
      item.addEventListener("click", handleGrid);
    });
  })(gameBoard.gridItem, gameBoard.updateArray, gameBoard.checkWinner);
};

submitBtn.addEventListener("click", handleSubmitBtn);
