class Champion {
    // Constructor accepts details for the champion
    constructor(name, cost, traitsList, statsByStarLevel, attackSpeed, abilityName, range, manaPerAttack, abilityManaCost) {
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
        this.mana = 0; // Current mana of the champion
        this.manaPerAttack = manaPerAttack; // Mana gained per attack
        this.abilityManaCost = abilityManaCost;
    }

    getStats() {
        if (!this.statsByStarLevel[this.starLevel]) {
            console.log(`Invalid star level: ${this.starLevel} for ${this.name}`);
        }
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
                    Healing: ${stats.ability.healing}
                    Damage: ${stats.ability.damage}
                    Magic Damage: ${stats.ability.magicDamage}
                    Mana: ${this.mana}
                    Mana per Attack: ${this.manaPerAttack}
                    Ability Mana Cost: ${this.abilityManaCost}
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
                ability: { reduction: 12, damage: 0, magicDamage: 10, healing: 0},
            },
            2: { 
                hp: 1080, 
                attackDamage: 68, 
                armor: 30,  
                magicResist: 40,  
                ability: { reduction: 15, damage: 0 , magicDamage: 15, healing: 0 },
            },
            3: { 
                hp: 1944, 
                attackDamage: 101, 
                armor: 50,  
                magicResist: 60,
                ability: { reduction: 25, damage: 0, magicDamage: 25, healing: 0 },
            }
        },
        0.6, // attack speed
        'Obsolete Technology: Passive: Amumu reduces all incoming damage. Every second, emit sparks that deal magic damage to adjacent enemies. ', // ability name
        1, // range
        0, // mana
        0, // mana per attack
        0 // ability mana cost
    ),
    new Champion(
        'Darius',
        1, // cost
        'Conqueror, Watcher', // traits 
        {
            1: { 
                hp: 600, 
                attackDamage: 55, 
                armor: 40, 
                magicResist: 40,  
                ability: { reduction: 12, damage: 0, magicDamage: 10 },
            },
            2: { 
                hp: 1100, 
                attackDamage: 83, 
                armor: 40,  
                magicResist: 40,  
                ability: { reduction: 15, damage: 120, magicDamage: 360 },
            },
            3: { 
                hp: 2100, 
                attackDamage: 124, 
                armor: 40,  
                magicResist: 40,
                ability: { reduction: 20, damage: 180, magicDamage: 540 },
            }
        },
        0.7, // attack speed
        'Obsolete Technology: Passive: Amumu reduces all incoming damage. Every second, emit sparks that deal magic damage to adjacent enemies. ', // ability name
        1, // range
        30, // mana
        10, // mana per attack
        70 // ability mana cost
    ), 
    new Champion()
];


function getChampionByName(name) {
    if (!name) {
        return 'Champion name cannot be empty';
    }
    const champion = champions.find(champion => champion.name === name);
    if (!champion) {
        return `Champion with name "${name}" not found`;
    }
    return champion;
}

const champion = getChampionByName('Amumu');

console.log(champion.displayStats());
