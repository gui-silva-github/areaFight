class Character{

    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;

    constructor(name){
        this.name = name;
    }

    get life(){
        return this._life;
    }

    set life(newLife){
        this._life = newLife < 0 ? 0 : newLife;
    }

}

class Knight extends Character{

    constructor(name){
        super(name);
        this.life = 100;
        this.attack = 10;
        this.defense = 8;
        this.maxLife = this.life;
        this.src = `../assets/imagens/cavaleiro.jpg`;
    }

}

class Sorcerer extends Character{

    constructor(name){
        super(name);
        this.life = 80;
        this.attack = 15;
        this.defense = 3;
        this.maxLife = this.life;
        this.src = `../assets/imagens/bruxo.png`;
    }

}

class LittleMonster extends Character{

    constructor(){
        super("Mr. OnyxClaw");
        this.life = 40;
        this.attack = 4;
        this.defense = 3;
        this.maxLife = this.life;
        this.src = `../assets/imagens/onca.jpg`;
    }

}

class BigMonster extends Character{

    constructor(){
        super("Sir Super GodZilla");
        this.life = 120;
        this.attack = 16;
        this.defense = 6;
        this.maxLife = this.life;
        this.src = `../assets/imagens/godzilla.jpeg`;
    }

}

class Stage{

    constructor(fighter1, fighter2, fighterEl1, fighterEl2, logObject){
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighterEl1 = fighterEl1;
        this.fighterEl2 = fighterEl2;
        this.log = logObject;
    }

    start(){
        this.update();

        this.fighterEl1.querySelector(".attackButton").addEventListener('click', ()=> this.doAttack(this.fighter1, this.fighter2));
        this.fighterEl2.querySelector(".attackButton").addEventListener('click', ()=> this.doAttack(this.fighter2, this.fighter1));
    }

    update(){

        this.fighterEl1.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`;

        this.fighterEl1.querySelector('#img').src = this.fighter1.src;

        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;

        this.fighterEl1.querySelector('.lifeBar .bar').style.width = `${f1Pct}%`;

        this.fighterEl2.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`;

        this.fighterEl2.querySelector('#img').src = this.fighter2.src;

        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;

        this.fighterEl2.querySelector(".lifeBar .bar").style.width = `${f2Pct}%`;
    }

    doAttack(attacking, attacked){

        if (attacking.life > 0 && attacked.life <= 0){
            this.log.fatality(attacking.name + " ganhou!");
            return;
        } else if (attacking.life <= 0){
            this.log.fatality(attacking.name + " não pode atacar, GAME OVER!");
            return;
        }

        let attackFactor = (Math.random() * 2).toFixed(2);
        let defenseFactor = (Math.random() * 2).toFixed(2);

        let actualAttack = attacking.attack * attackFactor;

        let actualDefense = attacked.defense * defenseFactor;

        if (actualAttack > actualDefense){
            attacked.life -= actualAttack;
            this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`);
        } else {
            this.log.addMessage(`${attacked.name} conseguiu defender...`);
        }

        this.update();
    }

}

class Log{

    list = [];

    constructor(listEl){
        this.listEl = listEl;
    }

    addMessage(msg){
        this.list.push(msg);

        this.render();
    }

    fatality(msg){
        alert(msg);
    }

    render(){
        this.listEl.innerHTML = '';

        for (let i in this.list){
            this.listEl.innerHTML = `<li>${this.list[i]}</li>`;
        }
    }

}

let nome = prompt("Qual seu nome?");

let fighterChoice = prompt("Deseja jogar com o 1 - Bruxo ou 2 - Cavaleiro? Digite 1 ou 2!");

let char = null;

if (fighterChoice == "1" || fighterChoice.toLowerCase() == "bruxo"){
    char = new Sorcerer(nome);
} else if (fighterChoice == "2" || fighterChoice.toLowerCase() == "cavaleiro"){
    char = new Knight(nome);
} else {
    char = new Knight(nome);
}

let opponentChoice = prompt("Deseja jogar contra o 1 - Little Monster ou 2 - Big Monster? Digite 1 ou 2!");

let monster = null;

if (opponentChoice == "1" || opponentChoice.toLowerCase() == "little monster"){
    monster = new LittleMonster();
} else if (opponentChoice == "2" || opponentChoice.toLowerCase() == "big monster"){
    monster = new BigMonster();
} else {
    monster = new LittleMonster();
}

let log = new Log(document.querySelector('.log'));

const stage = new Stage(
    char,
    monster,
    document.querySelector("#char"),
    document.querySelector("#monster"),
    log
);

stage.start();