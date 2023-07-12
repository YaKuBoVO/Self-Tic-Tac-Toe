"use strict";

const boardSize = 3;
let currentPlayers = "X";
let moves = ["", "", "", "", "", "", "", "", "",];
function createBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.setAttribute("data-index", i * boardSize + j);
      cell.addEventListener("click", makeMove);
      board.appendChild(cell);
    }
  }
}

function makeMove(event) {
   const index = event.target.getAttribute("data-index");
   if(moves[index] === "") {
      moves[index] = currentPlayers;
      event.target.innerText = currentPlayers;
      if(checkWin(currentPlayers)) {
         showModal(`${currentPlayers} Wins!`);
         createBoard()
      } else if (moves.every(move => move !== "")) {
         showModal("It's a tia");
         createBoard()
      } else {
         currentPlayers = currentPlayers === "X" ? "O" : "X";
      }
   }
}

function checkWin(player) {
   const winningCombinations = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
   ];

   return winningCombinations.some((combination) => {
      return (
         moves[combination[0]] === player &&
         moves[combination[1]] === player &&
         moves[combination[2]] === player
      );
   });
}

function showModal(massage) {
   const modal = document.getElementById("modal");
   const modalMassage = document.getElementById("modal-massage");

   modalMassage.innerHTML = massage;
   modal.style.display = "block";

   modal.addEventListener("click", () => {
      modal.style.display = "none";
   });
}

function resetBoard() {
   currentPlayers = "X";
   moves = ["", "", "", "", "", "", "", "", "",];
   createBoard()
}


createBoard();
