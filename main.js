const clear = document.querySelector('.info-button-clear')
const play = document.querySelector('.info-button-play')
const boxes = document.querySelectorAll('.game-box')

let board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
]

let gameOver = false

// ===== GAME OVER ELEMENTY =====

const gameOverScreen = document.createElement('div')
const gameOverTitle = document.createElement('h2')
const restartButton = document.createElement('button')

gameOverScreen.classList.add('game-over')
gameOverTitle.textContent = 'GAME OVER'
restartButton.textContent = 'спробуй ще раз'

gameOverScreen.appendChild(gameOverTitle)
gameOverScreen.appendChild(restartButton)

document.body.appendChild(gameOverScreen)

restartButton.addEventListener('click', startGame)

// ===== START GRY =====

play.addEventListener('click', startGame)

function startGame() {
  gameOver = false

  gameOverScreen.style.display = 'none'

  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]

  addRandomTile()
  addRandomTile()

  updateBoard()
}

// ===== CLEAR =====

clear.addEventListener('click', clearBoard)

function clearBoard() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]

  updateBoard()
}

// ===== DODAWANIE LICZBY =====

function addRandomTile() {
  let empty = []

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col] === 0) {
        empty.push([row, col])
      }
    }
  }

  if (empty.length === 0) return

  let random = empty[Math.floor(Math.random() * empty.length)]

  board[random[0]][random[1]] = 2
}

// ===== UPDATE HTML =====

function updateBoard() {
  boxes.forEach((box, index) => {
    let row = Math.floor(index / 4)
    let col = index % 4

    let value = board[row][col]

    box.textContent = value === 0 ? '' : value

    box.className = 'game-box'

    if (value !== 0) {
      box.classList.add(`number-${value}`)
    }
  })
}

// ===== KLAWIATURA =====

document.addEventListener('keydown', (e) => {
  if (gameOver) return

  if (e.key === 'ArrowLeft') {
    moveLeft()
  }

  if (e.key === 'ArrowRight') {
    moveRight()
  }

  if (e.key === 'ArrowUp') {
    moveUp()
  }

  if (e.key === 'ArrowDown') {
    moveDown()
  }
})

// ===== ŁĄCZENIE =====

function slide(row) {
  row = row.filter((num) => num !== 0)

  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] === row[i + 1]) {
      row[i] *= 2
      row[i + 1] = 0
    }
  }

  row = row.filter((num) => num !== 0)

  while (row.length < 4) {
    row.push(0)
  }

  return row
}

// ===== PO RUCHU =====

function afterMove() {
  if (checkGameOver()) {
    gameOver = true

    gameOverScreen.style.display = 'flex'

    return
  }

  addRandomTile()

  updateBoard()
}

// ===== LEWO =====

function moveLeft() {
  for (let i = 0; i < 4; i++) {
    board[i] = slide(board[i])
  }

  afterMove()
}

// ===== PRAWO =====

function moveRight() {
  for (let i = 0; i < 4; i++) {
    board[i].reverse()

    board[i] = slide(board[i])

    board[i].reverse()
  }

  afterMove()
}

// ===== GÓRA =====

function moveUp() {
  for (let col = 0; col < 4; col++) {
    let column = []

    for (let row = 0; row < 4; row++) {
      column.push(board[row][col])
    }

    column = slide(column)

    for (let row = 0; row < 4; row++) {
      board[row][col] = column[row]
    }
  }

  afterMove()
}

// ===== DÓŁ =====

function moveDown() {
  for (let col = 0; col < 4; col++) {
    let column = []

    for (let row = 0; row < 4; row++) {
      column.push(board[row][col])
    }

    column.reverse()

    column = slide(column)

    column.reverse()

    for (let row = 0; row < 4; row++) {
      board[row][col] = column[row]
    }
  }

  afterMove()
}

// ===== SPRAWDZANIE PRZEGRANEJ =====

function checkGameOver() {
  // wolne miejsca

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col] === 0) {
        return false
      }
    }
  }

  // poziomo

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === board[row][col + 1]) {
        return false
      }
    }
  }

  // pionowo

  for (let col = 0; col < 4; col++) {
    for (let row = 0; row < 3; row++) {
      if (board[row][col] === board[row + 1][col]) {
        return false
      }
    }
  }

  return true
}
