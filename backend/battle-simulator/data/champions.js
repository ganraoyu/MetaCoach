class Champion {
    // Constructor accepts details for the champion
    constructor(name, cost, traitsList, statsByStarLevel, attackSpeed, abilityName, range, mana, manaPerAttack, abilityManaCost) {
        this.name = name;
        this.cost = cost;  // Cost to purchase the champion
        this.traitsList = traitsList;  // List of champion traits (e.g., 'Rebel, Ninja')
        this.statsByStarLevel = statsByStarLevel;  // Stats for each star level
        this.attackSpeed = attackSpeed;  // Champion's attack speed
        this.armor = 0;  // Default armor is 0
        this.magicResist = 0;  // Default magic resist is 0
        this.abilityName = abilityName;  // Name of the ability
        this.range = range;  // Range of the champion (e.g., 1, 2, 3, 4, 5)
        this.starLevel = 1;  // Default star level is 1
        this.mana = 0;
        this.manaPerAttack = manaPerAttack,
        this.abilityManaCost = abilityManaCost
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

    displayStats() {
        const stats = this.getStats();
        return `
            Name: ${this.name}
            Cost: ${this.cost}
            Traits: ${this.traitsList}
            Ability: ${this.abilityName}
            Range: ${this.range}
            Armor: ${stats.armor}
            Magic Resist: ${stats.magicResist}
            Attack Speed: ${this.attackSpeed}
            Star Level: ${this.starLevel}
            Stats:
                HP: ${stats.hp}
                Attack Damage: ${stats.attackDamage}
                Ability: 
                    Damage Reduction: ${stats.ability.reduction}
                    Damage: ${stats.ability.damage}
                    Magic Damage: ${stats.ability.magicDamage}
        `;
    }
}

const champions = [
    new Champion(
        'Amumu',
        1, // cost
        'Automata, Watcher', // traits 
        {
            1: { 
                hp: 600, 
                attackDamage: 45, 
                armor: 15, 
                magicResist: 20,  
                ability: { reduction: 12, damage: 0, magicDamage: 10 },
            },
            2: { 
                hp: 1080, 
                attackDamage: 68, 
                armor: 30,  
                magicResist: 40,  
                ability: { reduction: 15, damage: 120, magicDamage: 360 },
            },
            3: { 
                hp: 1944, 
                attackDamage: 101, 
                armor: 50,  
                magicResist: 60,
                ability: { reduction: 20, damage: 180, magicDamage: 540 },
            }
        },
        0.6, // attack speed
        'Obsolete Technology: Passive: Amumu reduces all incoming damage. Every second, emit sparks that deal magic damage to adjacent enemies. ', // ability name
        1 // range
    )
];  

champions[0].setStarLevel(1);  

console.log(champions[0].displayStats());
