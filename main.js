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

function buildBoard() {
    var size = 4

    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
        var nextCell = board[i + 1][j + 1]
            board[i][j] = nextCell
            if (i === 1 && j === 1 || i === 3 && j === 3) {
                board[i][j] = MINE
            }
            else (board[i][j]=nextCell)
        }
    }
    return board
 }
// setMinesNegsCount(board)
function setMinesNegsCount(board) {
    var count = 0
    for (var i = 0; i < 4; i++) {
        if (board[i][j] = MINE) {
            count++
        }
        return count
    }
}
function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`

        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}
function onCellClicked(elCell, i, j) {
    var minesAroundCount = 0
    for (vari = 0; i < 4; i++) {
    
   }
}
function onCellMarked(elCell) {

}
function checkGameOver() {

}
function expandShown(board, elCell, i, j) {

}
