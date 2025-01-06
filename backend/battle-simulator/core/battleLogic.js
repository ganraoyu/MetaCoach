const HexCell = require('../utils/HexCell.js');
const Board = require('./board.js');
const { Champion, champions, getChampionByName } = require('../data/champions.js');

const board = new Board(8, 7);

function placeChampionByName(championName, row, column) {
    const champion = getChampionByName(championName);
    if(typeof champion === 'string') {
        console.log(champion); 
    } else{
        board.placeChampion(champion, row, column);
    }
}

placeChampionByName('Amumu', 3, 3);
placeChampionByName('Amumu', 3, 3);

board.displayBoard();
