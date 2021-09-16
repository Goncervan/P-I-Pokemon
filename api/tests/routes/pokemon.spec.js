const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);

const poke = {
  name: "Henrymon",
  weight: "200",
  height: "220",
  created: true
}

describe('pokemon routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to database:', err);
    }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(poke)));

  describe('GET /pokemons', function () {  // test /pokemons route
    it('should return the 40 pokemons', function () {
      agent.get('/pokemons')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.have.length.greaterThanOrEqual(40);
        })
    })
  });

  describe('GET /pokemons/:id', function () {
    it('should has the property name', () => {
      agent.get('/pokemons/1')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.haveOwnProperty("name");
        })
    });
  })
})