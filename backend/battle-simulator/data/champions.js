class Champion {
    constructor(name, cost, traitsList, statsByStarLevel, attackSpeed, abilityName, range, mana, manaPerAttack, abilityManaCost) {
        this.name = name;
        this.cost = cost;
        this.traitsList = traitsList;
        this.statsByStarLevel = statsByStarLevel;
        this.attackSpeed = attackSpeed;
        this.armor = 0;
        this.magicResist = 0;
        this.abilityName = abilityName;
        this.range = range;
        this.starLevel = 1;
        this.mana = mana;
        this.manaPerAttack = manaPerAttack;
        this.abilityManaCost = abilityManaCost;
        this.currentHp = this.statsByStarLevel[this.starLevel].hp; // Initialize current HP
    }

    getStats() {
        return this.statsByStarLevel[this.starLevel];
    }

    setStarLevel(starLevel) {
        if (this.statsByStarLevel[starLevel]) {
            this.starLevel = starLevel;
            this.currentHp = this.statsByStarLevel[starLevel].hp; // Update current HP
        } else {
            console.log(`Invalid star level: ${starLevel} for ${this.name}`);
        }
    }

    takeDamage(damage) {
        this.currentHp -= damage;
        if (this.currentHp <= 0) {
            this.currentHp = 0;
            console.log(`${this.name} has died.`);
        }
    }

    attack(target) {
        const ability = target.getStats().ability;
        const damageReduction = ability.reduction;
        const damage = this.getStats().attackDamage;

        if(damageReduction === 0){
            target.takeDamage(Math.round(damage));
        } else {
            target.takeDamage(Math.round(damage - (damage * damageReduction / 100)));
        }
        this.mana += this.manaPerAttack;
    }
    
    isAlive() {
        return this.currentHp > 0;
    }

    useAbility(target) {
        const ability = this.getStats().ability;
        const abilityReduction = this.getStats().ability;
        const damage = ability.damage;
        const magicDamage = ability.magicDamage;
        const damageReduction = abilityReduction.reduction
        const heal = ability.healing;
        const armor = target.armor;
        const magicResist = target.magicResist;
    

        // calculate armor/magic resist first then reduction

        if(this.mana >= this.abilityManaCost) {
            this.mana -= this.abilityManaCost;
            if(damageReduction === 0 ){
                if(armor > 0 || magicResist > 0){
                    let physicalDamage = damage - ((damage) * armor / 100);
                    let magicDamageTaken = magicDamage - ((magicDamage) * magicResist / 100);                    
                    target.takeDamage(Math.round(physicalDamage + magicDamageTaken));                    
                } else {
                    target.takeDamage(Math.round(damage + magicDamage));
                }
            } else {
                target.takeDamage(Math.round((damage + magicDamage) - ((damage + magicDamage) * damageReduction / 100)));
            }
            this.currentHp += heal; 
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
                Current HP: ${this.currentHp}
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
                ability: { reduction: 0, damage: 0, magicDamage: 10, healing: 0},
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
        10, // mana
        10, // mana per attack
        70 // ability mana cost
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
                ability: { reduction: 12, damage: 0, magicDamage: 10,  healing: 0 },
            },
            2: { 
                hp: 1100, 
                attackDamage: 83, 
                armor: 40,  
                magicResist: 40,  
                ability: { reduction: 15, damage: 120, magicDamage: 36, healing: 0 },
            },
            3: { 
                hp: 2100, 
                attackDamage: 124, 
                armor: 40,  
                magicResist: 40,
                ability: { reduction: 20, damage: 180, magicDamage: 540, healing: 0 },
            }
        },
        0.7, // attack speed
        'Obsolete Technology: Passive: Amumu reduces all incoming damage. Every second, emit sparks that deal magic damage to adjacent enemies. ', // ability name
        1, // range
        30, // mana
        10, // mana per attack
        70 // ability mana cost
    ), 
    new Champion(
        'Akali',
        1, // cost
        'Conqueror, Watcher', // traits 
        {
            1: { 
                hp: 600, 
                attackDamage: 55, 
                armor: 40, 
                magicResist: 40,  
                ability: { reduction: 12, damage: 0, magicDamage: 10, healing: 0 },
            },
            2: { 
                hp: 1100, 
                attackDamage: 83, 
                armor: 40,  
                magicResist: 40,  
                ability: { reduction: 15, damage: 120, magicDamage: 360, healing: 0 },
            },
            3: { 
                hp: 2100, 
                attackDamage: 124, 
                armor: 40,  
                magicResist: 40,
                ability: { reduction: 20, damage: 180, magicDamage: 540, healing: 0 },
            }
        },
        0.7, // attack speed
        'Obsolete Technology: Passive: Amumu reduces all incoming damage. Every second, emit sparks that deal magic damage to adjacent enemies. ', // ability name
        1, // range
        60, // mana
        10, // mana per attack
        70 // ability mana cost
    ), 
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

module.exports = { Champion, champions, getChampionByName };