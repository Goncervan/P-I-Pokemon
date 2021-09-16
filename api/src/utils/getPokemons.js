const axios = require('axios');


const getPokemonApi = new Promise(async (res, rej) => {
    try {
        const first = await axios.get('https://pokeapi.co/api/v2/pokemon')
        const last = await axios.get(first.data.next)

        const firstA = first.data.results
        const lastA = last.data.results

        const arrayData = [...firstA, ...lastA]

        const urls = arrayData.map(obj => (obj.url))
        const AProm = urls.map(url => axios.get(url))

        const resultado = await Promise.all(AProm)

        const pokemone = resultado.map(e => {
            const pokes = {
                id: e.data.id,
                name: e.data.name,
                type: e.data.types.map(obj => (obj.type.name)),
                height: e.data.height,
                weight: e.data.weight,
                hp: e.data.stats[0].base_stat,
                attack: e.data.stats[1].base_stat,
                defense: e.data.stats[2].base_stat,
                speed: e.data.stats[5].base_stat,
                img: e.data.sprites.other.dream_world.front_default,
            }
            return pokes
        })
        res(pokemone)
    }
    catch (e) {
        console.log(e)
    }
})

module.exports = { getPokemonApi }