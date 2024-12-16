class Champion {
    constructor(name, statsByStarLevel, attackSpeed, ability, range) {
        this.name = name;
        this.statsByStarLevel = statsByStarLevel; 
        this.attackSpeed = attackSpeed; 
        this.ability = ability; 
        this.range = range; 
        this.starLevel = 1; 
        this.updateStarLevel(); 
    }

    // Method to update stats based on star level
    updateStarLevel(starLevel = this.starLevel) {
        this.starLevel = starLevel;
        const stats = this.statsByStarLevel[starLevel];
        if (stats) {

            this.hp = stats.hp;
            this.attackDamage = stats.attackDamage;
            this.armor = stats.armor;
            this.manaResistant = stats.manaResistant;
            this.abilityDamage = stats.abilityDamage;
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
            1: { hp: 700, attackDamage: 45, attackSpeed: 0.75, armor: 45, manaResistant: 45, abilityDamage: 150 },
            2: { hp: 1260, attackDamage: 90, attackSpeed: 0.75, armor: 60, manaResistant: 60, abilityDamage: 300 },
            3: { hp: 1890, attackDamage: 135, attackSpeed: 0.75, armor: 75, manaResistant: 75, abilityDamage: 450 }
        },
        0.75,
        'Shuriken Flip',
        'Melee'
    )
];


champions[0].updateStarLevel(2);


console.log(champions[0]);
