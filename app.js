const Gameboard = (function () {
  let gameboard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const print_gameBoard = () => {
    for (let line of gameboard) {
      console.log(line);
    }
  };
  const set_marker = (row, col, marker) => {
    gameboard[row][col] = marker;
  };
  const return_gameBoard = () => gameboard;

  return { print_gameBoard, set_marker, return_gameBoard };
})();

function Player(name, marker, initialTurn) {
  let score = 0;
  let turn = initialTurn;
  const displayName = () => {
    return name;
  };
  const isTurn = () => {
    return turn;
  };
  const displayScore = () => {
    return score;
  };
  const incrementScore = () => {
    score++;
  };
  const setTurn = () => {
    if (turn == true) {
      turn = false;
    } else {
      turn = true;
    }
  };
  const addMark = (row, col) => {
    Gameboard.set_marker(row, col, marker);
  };

  return {
    marker,
    addMark,
    isTurn,
    setTurn,
    displayName,
    displayScore,
    incrementScore,
  };
}

const checkForWin = () => {
  const gameboard = Gameboard.return_gameBoard();
  const get_player = (cell) => {
    if (cell == player1.marker) {
      return player1;
    } else {
      return player2;
    }
  };
  const checkDiagnols = () => {
    if (gameboard[1][1] !== "") {
      if (
        gameboard[0][0] == gameboard[1][1] &&
        gameboard[1][1] == gameboard[2][2]
      ) {
        return get_player(gameboard[1][1]);
      } else if (
        gameboard[2][0] == gameboard[1][1] &&
        gameboard[1][1] == gameboard[0][2]
      ) {
        return get_player(gameboard[1][1]);
      }
    }
    return false;
  };
  const checkRows = () => {
    for (let i = 0; i < gameboard.length; i++) {
      if (checkRow(gameboard[i])) {
        return checkRow(gameboard[i]);
      }
    }
    return false;
  };
  const checkCols = () => {
    for (let i = 0; i < gameboard.length; i++) {
      if (checkCol(i)) {
        return checkCol(i);
      }
    }
    return false;
  };
  const checkRow = (row) => {
    if (row[0] !== "" && row[0] == row[1] && row[1] == row[2]) {
      return get_player(row[0]);
    }
    return false;
  };
  const checkCol = (col) => {
    if (
      gameboard[0][col] !== "" &&
      gameboard[0][col] == gameboard[1][col] &&
      gameboard[1][col] == gameboard[2][col]
    ) {
      return get_player(gameboard[0][col]);
    }
    return false;
  };
  if (checkRows()) {
    return checkRows();
  } else if (checkCols()) {
    return checkCols();
  } else if (checkDiagnols()) {
    return checkDiagnols();
  } else {
    return false;
  }
};

const checkForTies = () => {
  for (let row of Gameboard.return_gameBoard()) {
    for (let cell of row) {
      if (cell == "") {
        return false;
      }
    }
  }
  return true;
};

const displayController = (function () {
  const gameboardContainer = document.querySelector("#gameboard_container");
  const mark = (i, j) => {
    if (player1.isTurn()) {
      player1.addMark(i, j);
    } else {
      player2.addMark(i, j);
    }
    player1.setTurn();
    player2.setTurn();
    displayGameboard();
    winner = checkForWin();
    if (winner !== false) {
      winner.incrementScore();
      console.log(
        `${winner.displayName()} wins! Score: ${winner.displayScore()}`
      );
    }
    if (checkForTies()) {
      console.log("No one wins");
    }
  };

  const gameOver = () => {
    // freeze the game, show win, remove event listeners...
  };

  const displayGameboard = () => {
    while (gameboardContainer.firstChild) {
      gameboardContainer.firstChild.remove();
    }
    gameboard = Gameboard.return_gameBoard();
    for (let i = 0; i < gameboard.length; i++) {
      rowDiv = document.createElement("div");
      rowDiv.classList.add("row");
      for (let j = 0; j < gameboard[i].length; j++) {
        cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        if (gameboard[i][j] == "") {
          cellDiv.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            mark(i, j);
          });
        }
        cellDiv.innerText = gameboard[i][j];
        rowDiv.append(cellDiv);
      }
      gameboardContainer.append(rowDiv);
    }
  };
  return { displayGameboard };
})();

player1 = Player("Steve", "X", true);
player2 = Player("Dave", "O", false);

displayController.displayGameboard();
