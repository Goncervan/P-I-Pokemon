const { Router, response } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Pokemon, Type } = require('../db');
const { getPokemonApi } = require('../utils/getPokemons');
const e = require('express');
const router = Router();

// GET /Pokemons y /?name='...'
router.get('/pokemons', async (req, res) => {
    const { name } = req.query; //nos pueden mandar o no un name por query
    try {
        const resultadoApi = await getPokemonApi;
        const resultadoDb = await Pokemon.findAll(
            {
                include: {
                    model: Type,
                    attributes: ['name'],
                }
            })
        const pokemonesDb = resultadoDb.map(ob => {
            const pokemon = {
                id: ob.id,
                name: ob.name.toLowerCase(),
                hp: ob.hp,
                attack: ob.attack,
                defense: ob.defense,
                speed: ob.speed,
                height: ob.height,
                weight: ob.weight,
                img: ob.img,
                created: ob.created,
                type: ob.Types.map(obj => {
                    return (obj.name)
                })
            }
            return pokemon;
        })
        if (!name) {
            let resultadoFinal = pokemonesDb.concat(resultadoApi);
            res.json(resultadoFinal); 
        } else { 
            let resultadoFinal = pokemonesDb.concat(resultadoApi)
            let found = resultadoFinal.filter(obj => obj.name === name)
            if (found) {
                res.json(found);
            } else {
                res.json("Ese pokemon no existe")
            }
        }
    }
    catch (err) {
        console.log(err)
    }})



// GET /pokemons/?name="..."
router.get('/pokemons?name=', async (req, res) => {
    const { name } = req.query;
    try {
        const pokemonsApi = await getPokemonApi;
        const resultadoDb = await Pokemon.findAll(
            {
                include: {
                    model: Type,
                    attributes: ['name'],
                }
            })
        const result = pokemonsApi.concat(resultadoDb)
        const found = result.filter(obj => obj.name.includes(name))
        res.json(found)
    }catch(error){
        console.log(error)
    }}
    )



// GET /pokemons/{idPokemon}
router.get('/pokemons/:id', async (req, res) => {
    const id = (req.params.id)
    try {
        const poke = await Pokemon.findByPk(id, { include: [Type] })
        res.json(poke)
    } catch (error) {
        const resultadoApi = await getPokemonApi; 
        const result = resultadoApi.find(obj => obj.id === parseInt(id));
        res.json(result)
    }
});

// Post /pokemons
router.post('/pokemons', async (req, res) => {
    const { name, hp, attack, defense, speed, height, weight, type, img } = req.body

    const newPoke = { name, hp, attack, defense, speed, height, weight, img }
    try {
        const createPoke = await Pokemon.create(newPoke)
        const typesDB = await Type.findAll({
            where: { name: type }
        }) 
        await createPoke.addType(typesDB);
        res.send('Pokemon creado')
    } catch (err) {
        console.log(err)
    }
});

// GET /types
router.get('/types', (_req, res, next) => {
    Type.findAll()
        .then(response => {
            res.json(response)
        })
        .catch(error =>
            next(error)
        )
});



module.exports = router;
