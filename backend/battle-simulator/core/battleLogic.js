const HexCell = require('../utils/HexCell.js');
const Board = require('./board.js');
const { Champion, champions, getChampionByName } = require('../data/champions.js');


/* 
cd backend/battle-simulator/core
nodemon battlelogic
*/

const board = new Board(8, 7);

function placeChampionByName(championName, row, column, starLevel, team) {
    const champion = getChampionByName(championName);
    if (typeof champion === 'string') {
        console.log(champion); 
    } else {
        champion.setStarLevel(starLevel);
        champion.team = team; // Assign the team to the champion
        board.placeChampion(champion, row, column);
    }
}

function startBattle() {
    console.log('Battle started!');

    let player = [];  //yourself
    let opponent = [];

    // Assign champions in the bottom 4 rows to the player
    for(let row = 4; row < board.rows; row++) {
        for(let column = 0; column < board.columns; column++) {
            const champion = board.getChampion(row, column);
            if (champion) {
                player.push(champion);
            }
        }
    }
    
    // Assign champions in the top 4 rows to the opponent
    for (let row = 0; row < 4; row++) {
        for (let column = 0; column < board.columns; column++) {
            const champion = board.getChampion(row, column);
            if (champion) {
                opponent.push(champion);
            }
        }
    }
    
    console.log('Player team:', player.map(champion => champion.name));
    console.log('Opponent team:', opponent.map(champion => champion.name));

    while(player.some(champion => champion.currentHp > 0) && opponent.some(champion => champion.currentHp > 0)) {

        player.forEach(champion => {
            if(champion.currentHp > 0) {
                const target = opponent.find(c => c.currentHp > 0);
                if (target) {
                    champion.attack(target);
                    champion.useAbility(target);
                    
                    console.log(`${champion.name} attacks ${target.name} for ${champion.getStats().attackDamage}`);
                    console.log(`${champion.name} gains ${champion.manaPerAttack} mana`);
                    console.log(`${champion.name} ability attacks for ${champion.getStats().ability.damage} damage`);
                    console.log(`${champion.name} ability attacks for ${champion.getStats().ability.magicDamage} magic damage`);
                    
                } 
            }
            player = player.filter(champion => champion.currentHp > 0);
        });

        opponent.forEach(champion => {
            if(champion.currentHp > 0) {
                const target = player.find(c => c.currentHp > 0);
                if (target) {
                    champion.attack(target);
                    champion.useAbility(target);
                    
                    console.log(`${champion.name} attacks ${target.name} for ${champion.getStats().attackDamage}`);
                    console.log(`${champion.name} gains ${champion.manaPerAttack} mana`);
                    console.log(`${champion.name} ability attacks for ${champion.getStats().ability.damage} damage`);
                    console.log(`${champion.name} ability attacks for ${champion.getStats().ability.magicDamage} magic damage`);
                    console.log(`${champion.manaPerAttack} mana`);
                }
            }
        });
        opponent = opponent.filter(champion => champion.currentHp > 0);
        console.log('Player team:', player.map(champion => `${champion.name} (${champion.currentHp} HP)`));
        console.log('Opponent team:', opponent.map(champion => `${champion.name} (${champion.currentHp} HP)`));
    }

    if (player.filter(champion => champion.currentHp > 0).length > 0) {
        console.log('Player team wins!');
    } else if (opponent.filter(champion => champion.currentHp > 0).length > 0) {
        console.log('Opponent team wins!');
    } else {
        console.log('No champions left standing.');
    }

    console.log(player.map(champion => champion.name))
    console.log('Battle ended!');
}

placeChampionByName('Amumu', 4, 2, 1, 'player');
placeChampionByName('Darius', 4, 3, 1, 'player');
placeChampionByName('Akali', 3, 3, 3, 'opponent');

startBattle();

board.displayBoard();