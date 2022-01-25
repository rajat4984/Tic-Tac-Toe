const gameBoard = (() => {
  let gameArray = [];
  let gridItem = document.querySelectorAll(".grid-item");
  let winnerText = document.querySelector(".turn-text-container > p");
  let playerTurn = "X";

  const checkWinner = (player1, player2) => {
    console.log(player1);
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
        winnerText.textContent = `${player1.name} Won`;
      } else {
        winnerText.textContent = `${player2.name} Won`;
      }
    }
  };

  const handleGridItem = (player1, player2) => {
    return (e) => {
      let boxNumber = e.target.getAttribute("id");
      if (e.target.textContent === "" && playerTurn === "X") {
        winnerText.textContent = `${player2.name}'s Turn`;
        DrawSymbol(e, playerTurn, boxNumber);
        checkWinner(player1, player2);
        playerTurn = "O";
      } else if (e.target.textContent === "" && playerTurn === "O") {
        winnerText.textContent = `${player1.name}'s Turn`;
        DrawSymbol(e, playerTurn, boxNumber);
        checkWinner(player1, player2);
        playerTurn = "X";
      }
    };
  };

  const DrawSymbol = (e, symbol, num) => {
    e.target.textContent = symbol;
    gameArray[num] = symbol;
  };

  let showBoard = (player1, player2) => {
    winnerText.textContent = `${player1.name}'s Turn`;
    gridItem.forEach((item) => {
      item.addEventListener("click", handleGridItem(player1, player2));
    });
  };

  return { showBoard };
})();


const players = (name, sign) => {
  return { name, sign };
};

const rajat = players("Rajat", "X");
const manu = players("Manu", "O");
gameBoard.showBoard(rajat, manu);
