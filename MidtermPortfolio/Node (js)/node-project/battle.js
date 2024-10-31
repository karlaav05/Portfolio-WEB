const superheroes = require('superheroes');
const supervillains = require('supervillains');

const hero = superheroes.randomSuperhero();
const villain = supervillains.randomSupervillain();

const battleMessage = `${hero} vs. ${villain}! An epic battle begins!`;

console.log(battleMessage);

