class Champion {
    constructor(name, traits, statsByStarLevel, attackSpeed, abilityName, range) {
        this.name = name;
        this.traits = traits;
        this.statsByStarLevel = statsByStarLevel; 
        this.attackSpeed = attackSpeed; 
        this.abilityName = abilityName; 
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

const champions = [
    new Champion(
        'Akali', 
        'Rebel, Ninja',
        {
            1: { hp: 700, attackDamage: 45, abilityDamage: { damage: 80, magicDamage: 240 } },
            2: { hp: 1260, attackDamage: 68, abilityDamage: { damage: 120, magicDamage: 360 } },
            3: { hp: 1890, attackDamage: 101, abilityDamage: { damage: 180, magicDamage: 540 } }
        },
        0.75,
        'Shuriken Flip',
        1
    )
];

champions[0].getStats();

console.log(champions[0]);
