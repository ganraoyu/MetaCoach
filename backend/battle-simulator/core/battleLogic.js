const HexCell = require('../utils/HexCell.js');
const Board = require('./board.js');
const { Champion, champions, getChampionByName } = require('../data/champions.js');

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

    let player = [];  //yourself
    let opponent = [];

    for(let row = 4; row < board.rows; row++) {
        for(let column = 3; column < board.columns; column++) {
            const champion = board.getChampion(row, column);
            if (champion) {
                player.push(champion);
            }
        }
    }
    
    for (let row = 0; row < 4; row++) {
        for (let column = 0; column < 4; column++) {
            const champion = board.getChampion(row, column);
            if (champion) {
                opponent.push(champion);
            }
        }
    }
    
    console.log(player.map(champion => champion.name));
    console.log(opponent.map(champion => champion.name));

    while(player.some(champion => champion.currentHp > 0) && opponent.some(champion => champion.currentHp > 0)) {

        player.forEach(champion => {
            if(champion.currentHp > 0) {
                const target = opponent.find(c => c.currentHp > 0);
                if (target) {
                    champion.attack(target);
                    console.log('Player attacks Opponent');
                }
            }
        });

        opponent.forEach(champion => {
            if(champion.currentHp > 0) {
                const target = player.find(c => c.currentHp > 0);
                if (target) {
                    champion.attack(target);
                    console.log('Opponent attacks Player');
                }
            }
        });

        player = player.filter(champion => champion.currentHp > 0);
        opponent = opponent.filter(champion => champion.currentHp > 0);

        console.log(player.map(champion => `${champion.name} (${champion.currentHp} HP)`));
        console.log(opponent.map(champion => `${champion.name} (${champion.currentHp} HP)`));
       if(player.length === 0) {
           console.log('Opponent wins!');
       } else if(opponent.length === 0) {
           console.log('Player wins!');
       }
    }

    console.log('Battle ended!');
}

placeChampionByName('Amumu', 3, 3, 1,);
placeChampionByName('Darius', 4, 3, 3,);

startBattle();

board.displayBoard();