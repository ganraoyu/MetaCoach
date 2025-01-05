const HexCell = require('../utils/HexCell.js');
const Board = require('./board.js');

const board = new Board(8, 7);

function printGrid(board) {
    for (let row = 0; row < board.rows; row++) {
        let rowDisplay = '';
        for (let col = 0; col < board.columns; col++) {
            const cell = board.grid[row][col];
            rowDisplay += cell instanceof HexCell ? '[H]' : '[ ]';
        }
        console.log(rowDisplay);
    }
}

printGrid(board);