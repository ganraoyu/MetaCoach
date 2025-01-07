const HexCell = require('../utils/HexCell.js');
const Board = require('./board.js');
const { Champion, champions, getChampion, getChampionByName } = require('../data/champions.js');

const board = new Board(8, 7);

function placeChampionByName(championName, row, column, starLevel) {
    const champion = getChampionByName(championName);
    if (typeof champion === 'string') {
        console.log(champion); 
    } else {
        champion.setStarLevel(starLevel);
        board.placeChampion(champion, row, column);
    }
}

function startBattle() {
    console.log('Battle started!');

    let player1 = [];  //yourself
    let player2 = [];

    for(let row = 4; row < board.rows; row++) {
        for(let column = 3; column < board.columns; column++) {
            const champion = board.getChampion(row, column);
            if (champion) {
                player1.push(champion);
            }
        }
    }
    
    for (let row = 0; row < 4; row++) {
        for (let column = 0; column < 4; column++) {
            const champion = board.getChampion(row, column);
            if (champion) {
                player2.push(champion);
            }
        }
    }

    console.log(player1.map(champion => champion.name));
    console.log(player2.map(champion => champion.name));
    console.log('Battle ended!');
}

placeChampionByName('Darius', 3, 3, 1);
placeChampionByName('Amumu', 4, 3, 3);

startBattle();

board.displayBoard();