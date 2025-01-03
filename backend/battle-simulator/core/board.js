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

}

module.exports = Board;