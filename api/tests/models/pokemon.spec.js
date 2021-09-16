const { Type, Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

const poke = {
  name: "Henrymon",
  weight: "200",
  height: "220",
  created: true
}

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));

    describe('Find Pokemons in database', function () {
      it('should have length 0 if theres any pokemon created', async function () {
        expect(await Pokemon.findAll()).to.have.length(0);
      });
    });
    describe('Create a new Pokemon', function () {
      it('should have length 1 if it has been created successfully', function () {
        Pokemon.create(poke)
          .then(function (res) {
            expect(res).to.have.length(1)
          })
      });
    });

    describe('Create a new Pokemon', () => {
      it('should throw an error if the pokemon is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('A valid name is required')))
          .catch(() => done());
      });
    })
    describe('Create a new Poke', function () {
      it('should have the property name', function () {
        Pokemon.create(poke)
          .then(function (res) {
            expect(res.body).to.be.haveOwnProperty(/name/i)
          });
      });
    });
  });
});

