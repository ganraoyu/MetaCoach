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

    placeChampion(champion, row, column) {

        const cell = this.grid[row][column];

        if(cell.champion) {
            throw new Error('Cell already occupied');
        }

        cell.champion = champion;

        return "Champion placed";
    }

    removeChampion(row, column) {

    }

    removeChampion(row, column) {
        const cell = this.grid[row][column];
        
        if(cell.champion === null) {
            throw new Error('No champion to remove');
        }

        cell.champion = null;
    }

}

module.exports = Board;