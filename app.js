const players = (name, sign) => {
  const getName = () => {
    return name;
  };

  const getSign = () => {
    return sign;
  };
  return { getName, getSign };
};

const player1 = players("Rajat", "X");
const player2 = players("Manu", "O");

const gameBoard = (() => {
  let gridItem = document.querySelectorAll(".grid-item");
  let gameArray = ["", "", "", "", "", "", "", "", ""];

  const makeGrid = () => {
    for (let i = 0; i < gameArray.length; i++) {
      gridItem[i].textContent = gameArray[i];
    }
  };

  const updateArray = (player, index, checkArray) => {
    index = Number(index);
    gameArray[index] = player.getSign();
    checkArray.push([index]);
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

const displayControl = (() => {
  let playerTurn = "X";
  let checkFirst = [];
  let checkSecond = [];
  let turnText = document.querySelector(".turn-text-container > p");
  turnText.textContent = `${player1.getName()}'s Turn (${player1.getSign()})`;

  const handleGrid = (e) => {
    if (e.target.textContent !== "") {
      return;
    } else {
      let index = e.target.getAttribute("data-index");
      if (playerTurn === player1.getSign()) {
        turnText.textContent = `${player2.getName()}'s Turn (${player2.getSign()})`;
        gameBoard.updateArray(player1, index, checkFirst);
        if (gameBoard.checkWinner(playerTurn, turnText)) {
          turnText.textContent = `${player1.getName()} won the game`;
          removeListener();
        }
        playerTurn = player2.getSign();
      } else {
        turnText.textContent = `${player1.getName()}'s Turn (${player1.getSign()})`;
        gameBoard.updateArray(player2, index, checkSecond);
        if (gameBoard.checkWinner(playerTurn, turnText)) {
          turnText.textContent = `${player2.getName()} won the game`;
          removeListener();
        }

        playerTurn = player1.getSign();
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
