class champion {
    constructor(name, hp, attackDamage, attackSpeed, ability, abilityDamage){
        this.name = name;
        this.hp = hp
        this.attackDamage =  attackDamage;
        this.attackSpeed = attackSpeed;
        this.ability = ability;
        this.abilityDamage = abilityDamage;
        this.starLevel = 1;
        updateStarLevel();
    }

    updateStarLevel(){
        this.starLevel = startLevel;
        const stats = this.statsByStarLevel[this.starLevel];
        if(stats){
            this.hp = stats.hp;
            this.attackDamage = stats.attackDamage;
            this.attackSpeed = stats.attackSpeed;
            this.abilityDamage = stats.abilityDamage;
        } else {
            console.log('Invalid star level');
        }
    }
}

const champions = [
    new champion('Aatrox', 580, 60, 0.651, 'The Darkin Blade', 200),
    new champion('Ahri', 526, 53, 0.668, 'Orb of Deception', 300),
    new champion('Akali', 700, 1260, 0.625, 'Shuriken Flip', 200),
]