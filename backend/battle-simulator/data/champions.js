class Champion {
    constructor(name, statsByStarLevel, attackSpeed, ability, range) {
        this.name = name;
        this.statsByStarLevel = statsByStarLevel; 
        this.attackSpeed = attackSpeed; 
        this.ability = ability; 
        this.range = range;
        this.starLevel = 1; 
    }

    getStats() {
        return this.statsByStarLevel[this.starLevel];
    }


    setStarLevel(starLevel) {
        if (this.statsByStarLevel[starLevel]) {
            this.starLevel = starLevel;
        } else {
            console.log(`Invalid star level: ${starLevel} for ${this.name}`);
        }
    }
}

// Initialize champions
const champions = [
    new Champion(
        'Akali',
        {
            1: { hp: 700, attackDamage: 45, abilityDamage: { damage: 80, magicDamage: 240 } },
            2: { hp: 1260, attackDamage: 68, abilityDamage: { damage: 120, magicDamage: 360 } },
            3: { hp: 1890, attackDamage: 101, abilityDamage: { damage: 180, magicDamage: 540 } }
        },
        0.75,
        'Shuriken Flip',
        'Melee'
    )
];

champions[0].setStarLevel(2);


console.log(champions[0]);
