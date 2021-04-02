const getO = () => {
  const O = document.createElement("img");
  O.src = "./O.svg";
  return O;
};

const getX = () => {
  const X = document.createElement("img");
  X.src = "./X.svg";
  return X;
};

const player1 = {
  name: "Player1",
  paint: getO,
  icon: "O",
};
const player2 = {
  name: "Player2",
  paint: getX,
  icon: "X",
};

const nextPlayer = () => {
  if (player === player1) {
    player = player2;
  } else {
    player = player1;
  }
  return player;
};

const gameMatrix = [];

const endGame = () => {
  const winningConditions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  for (let i = 0; i < 8; i++) {
    const winningCondition = winningConditions[i];
    const position1 = winningCondition[0] - 1;
    const position2 = winningCondition[1] - 1;
    const position3 = winningCondition[2] - 1;

    if (
      gameMatrix[position1] &&
      gameMatrix[position1] === gameMatrix[position2] &&
      gameMatrix[position1] === gameMatrix[position3]
    ) {
      return true;
    }
  }

  return false;
};

let player = player1;

const boxes = document.getElementsByClassName("box");

for (i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("click", function (e) {
    const box = e.target;

    if (!box.id || box.childNodes.length > 0) {
      return;
    }

    gameMatrix[parseInt(box.id) - 1] = player.icon;
    e.target.appendChild(player.paint());

    if (endGame()) {
      const modal = document.getElementById("winner");
      modal.style.display = "block";

      const span = document.getElementsByClassName("close")[0];
      span.onclick = function () {
        modal.style.display = "none";
      };

      const h2text = document.getElementById("winner_text");
      h2text.innerHTML = `${player.name} Won!!!!!!!!`;
    } else {
      player = nextPlayer();
    }
  });
}
