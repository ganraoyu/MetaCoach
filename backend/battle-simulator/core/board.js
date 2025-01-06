const HexCell = require('.././utils/HexCell.js');

class Board {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.grid = this.createGrid(rows, columns);
    }

    createGrid(rows, columns) {
        const grid = [];
        for (let row = 0; row < rows; row++) {
            const rowArray = [];
            for (let col = 0; col < columns; col++) {
                rowArray.push(new HexCell(row, col));
            }
            grid.push(rowArray);
        }
        return grid;
    }

    isValidPosition(row, column) {
        if (row < 0 || row >= this.rows || column < 0 || column >= this.columns) {
            return false;
        }
        return true;
    }
    placeChampion(champion, row, column) {

        const cell = this.grid[row][column];
        if(cell.champion) {
            console.log(`Cell at row ${row}, column ${column} is already occupied`);
        }

        cell.champion = champion;

        return "Champion placed";
    }

    removeChampion(row, column) {
        const cell = this.grid[row][column];
        
        if(cell.champion === null) {
            throw new Error('No champion to remove');
        }

        cell.champion = null;
    }

    getChampion(row, column) {
        if(this.isValidPosition(row, column)) {
            console.log(this.grid[row][column].champion)
        } else {
            return "Invalid position";
        }
        // return this.grid[row][column].champion; 
    }

    displayBoard() {
        for (let row = 0; row < this.rows; row++) {
            let rowDisplay = '';
            for (let col = 0; col < this.columns; col++) {
                const cell = this.grid[row][col];
                rowDisplay += cell.champion ? `[${cell.champion.name.charAt(0)}]` : '[ ]';
            }
            console.log(rowDisplay);
        }
    }
}

/* TESTING
const board = new Board(8, 7);
board.placeChampion({name: 'Aatrox'}, 0, 0);
board.removeChampion(0, 0);
board.placeChampion({name: 'Aatrox'}, 0, 1);
board.displayBoard();
board.getChampion(0, 1);
*/


module.exports = Board;