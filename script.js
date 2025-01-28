const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const restartButton = document.querySelector('.restart');

let currentPlayer = 'X';
let gameActive = true;
const boardState = Array(9).fill(null);

// Winning combinations
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (!gameActive || boardState[index]) return;

  boardState[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWinner()) {
    message.textContent = Jogador ${currentPlayer} venceu!;
    gameActive = false;
    return;
  }

  if (!boardState.includes(null)) {
    message.textContent = 'Empate!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.textContent = Vez do jogador ${currentPlayer};
}

function checkWinner() {
  return winningCombinations.some(combination => 
    combination.every(index => boardState[index] === currentPlayer)
  );
}

function restartGame() {
  boardState.fill(null);
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  gameActive = true;
  message.textContent = 'Vez do jogador X';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
