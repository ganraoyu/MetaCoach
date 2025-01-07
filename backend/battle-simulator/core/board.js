const HexCell = require('../utils/HexCell.js');

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
        return row >= 0 && row < this.rows && column >= 0 && column < this.columns;
    }

    placeChampion(champion, row, column) {
        if (!this.isValidPosition(row, column)) {
            throw new Error('Invalid position');
        }

        const cell = this.grid[row][column];

        if (cell.champion) {
            throw new Error('Cell already occupied');
        }

        cell.champion = champion;

        return "Champion placed";
    }

    removeChampion(row, column) {
        if (!this.isValidPosition(row, column)) {
            throw new Error('Invalid position');
        }

        const cell = this.grid[row][column];

        if (cell.champion === null) {
            throw new Error('No champion to remove');
        }

        cell.champion = null;
    }

    getChampion(row, column) {
        if (!this.isValidPosition(row, column)) {
            return "Invalid position";
        }
        return this.grid[row][column].champion;
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

    placeChampions(champions, side) {
        const startRow = side === 'left' ? 0 : Math.floor(this.rows / 2);
        const endRow = side === 'left' ? Math.floor(this.rows / 2) : this.rows;

        let championIndex = 0;
        for (let row = startRow; row < endRow; row++) {
            for (let col = 0; col < this.columns; col++) {
                if (championIndex < champions.length) {
                    this.placeChampion(champions[championIndex], row, col);
                    championIndex++;
                }
            }
        }
    }
}

module.exports = Board;