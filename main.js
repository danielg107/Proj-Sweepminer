'use strict'
const MINE = '💣'
var gBoard
const gGame = {
    isOn: false,
    shownCount: 0, markedCount: 0, secsPassed: 0
}


function onInit() {
    gBoard = buildBoard(4)
    renderBoard(gBoard)
    gGame.isOn = true
}
// gLevel = { SIZE: 4,
//     MINES: 2 }

function buildBoard(size) {
    const board = []
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

            if (i === 1 && j === 1 || i === 3 && j === 3) {
                board[i][j].isMine = true
                board[i][j].isShown = true
            }
            // else (board[i][j]=nextCell)

        }

    }
    // board[randNum][randNum1].isMine=true
    // board[randNum][randNum1].isShown=true
    // // board[1][1].isMine=true
    // // board[1][1].isShown=true

    return board
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var negsCount = 0
            for (var col = j - 1; col <= j + 1; col++) {
                if (row === i && col === j) continue
                if (row < 0 || row >= board.length || col < 0 || col >= board[i].length) continue

                if (board[row][col].isMine) {
                    negsCount++
                }
            }
        }
        board[i][j].minesAroundCount = negsCount
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
    if (!gGame.isOn || gBoard[i][j].isMarked) return
    const cell = gBoard[i][j]
    if(!cell.isShown){
        cell.isShown =true
        gGame.shownCount++}
    if (cell.isMine === false) {
        cell.isShown = true
    }
    renderBoard(gBoard)
}

function onCellMarked(elCell,i,j) {
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
    checkGameOver()
    renderBoard(gBoard)
}

function checkGameOver() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].lengt; j++) {
            if (gBoard[i][j].isMine === true){
                gGame.isOn=false
            }
    }
    }
}

function expandShown(board, elCell, i, j) {

}
const randNum = getRandomIntInclusive(0, 3)
const randNum1 = getRandomIntInclusive(0, 3)
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}