'use strict'
//generic constants should be configured in seperate module usually and imported if you didnt learn that - ignore.
const MINE = '💣'
var gBoard
const gGame = {
    isOn: false,
    shownCount: 0, 
    markedCount: 0, 
    secsPassed: 0
}


//the Logic could be something like - on cell press activate function that open the cell,  adds one to shown count etc...
//if is mine - send to function that finishes game or for the beginning use console.log("game lost").
//after that you should consider sending the whole board to checkWinCondition() function.
//this is only one option to create valid data flow.

function onInit() {
    gBoard = buildBoard(4)
    renderBoard(gBoard)
    gGame.isOn = true
}

gLevel = { 
    SIZE: 4,
     MINES: 2 
    }
console.log(gLevel.SIZE, gLevel.MINES)
function buildBoard(size) {
    const board = [];
    const numberOfBombs = size / 2
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            // var nextCell = board[i + 1][j + 1]
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }
    var numberOfBombsPut = 0
    while (numberOfBombsPut < numberOfBombs) {
        let xNum = getRandomIntInclusive(0, size - 1)
        let yNum = getRandomIntInclusive(0, size - 1)
        console.log(xNum, yNum)
        if (!board[xNum][yNum].isMine) {
            board[xNum][yNum].isMine = true
            numberOfBombsPut++
        }
    }
    return board
}
function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var negsCount = 0
            for (var row = i - 1; row <= i + 1; row++) {
                if (row < 0 || row >= board.length) continue
                for (var col = j - 1; col <= j + 1; col++) {
                  if (col < 0 || col >= board[row].length) continue
                  if (row === i && col === j) continue
                  if (board[row][col].isMine) {
                    negsCount++
                }
            }
        }
        board[i][j].minesAroundCount = negsCount
    }
}
}
function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            const currCell = board[i][j]
            var cellToRender
            if (!currCell.isShown) cellToRender = ''
            else {
                if (currCell.isMine) cellToRender = MINE
                else cellToRender = currCell.minesAroundCount
            }
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cellToRender}</td>`
        }
        strHTML += '</tr>'
    }


    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}


function onCellClicked(elCell, i, j) {
    if (!gGame.isOn || gBoard[i][j].isMarked) { return }
    gBoard[i][j].isShown = true
    gGame.shownCount++
    if (gBoard[i][j].isMine) {
        console.log('Game lost')
    }
    renderBoard(gBoard)
    checkGameOver()
}


function onCellMarked(elCell, i, j) {
    const cell = gBoard[i][j]
    if (cell.isShown) return
    if (cell.isMarked) {
        cell.isMarked = false
        gGame.markedCount--
    }
    else {
        cell.isMarked = true
        gGame.markedCount++
    }
    //checkGameOver isnt relevant unless you want to allow game win only when user marks all bombs. i think you should put it in onCellClicked.
  
    renderBoard(gBoard)
}

//this renders only a winning position - you need to take care of losing position
function checkGameOver() {
    var gameWin = true
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (!board[i][j].isMine && !board[i][j].isShown) {
                gameWin = false
                continue
            }
        }
    }
    if (gameWin) {
        console.log("game won")
    }
}

function expandShown(board, elCell, i, j) {
  if (i < 0 || i >= board.length || j < 0 || j >= board[i].length) {
    return
  }

  var cell = board[i][j]

  if (cell.isShown || cell.isMarked) return

  cell.isShown = true
  gGame.shownCount++
}
//redundant
const randNum = getRandomIntInclusive(0, 3)
const randNum1 = getRandomIntInclusive(0, 3)


function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
