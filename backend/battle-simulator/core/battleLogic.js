const HexCell = require('../utils/HexCell.js');
const Board = require('./board.js');
const { Champion, champions, getChampion, getChampionByName } = require('../data/champions.js');

const board = new Board(8, 7);

function placeChampionByName(championName, row, column) {
    const champion = getChampionByName(championName);
    if (typeof champion === 'string') {
        console.log(champion); 
    } else {
        board.placeChampion(champion, row, column);
    }
}

function startBattle(champion1, row1, column1, champion2, row2, column2) {
    console.log("Battle started!");

    while (champion1.isAlive() && champion2.isAlive()) {
        champion1.attack(champion2);
        if (champion2.isAlive()) {
            champion2.attack(champion1);
        }
    }

    if (champion1.isAlive()) {
        console.log(`${champion1.name} wins!`);
    } if(champion2.isAlive()) {
        console.log(`${champion2.name} wins!`);
    } if(!champion1.isAlive() && !champion2.isAlive()) {
        console.log("It's a draw!");
    }

    console.log("Battle ended!");
}

placeChampionByName('Amumu', 3, 3);
placeChampionByName('Amumu', 4, 3);

const champion1 = board.getChampion(3, 3);
const champion2 = board.getChampion(4, 3);

startBattle(champion1, 3, 3, champion2, 4, 3);

board.displayBoard();
