// const {Pokemon,Type} = require("../db")
const axios = require('axios');
const { Type } = require('../db');
const getTypes = function () {
    axios.get('https://pokeapi.co/api/v2/type')
        .then(response => {
            const types = response.data.results
            const names = types.map(type => (type.name))

            const namesP = names.map(name => (Type.create({ name: name })))
            
            Promise.all(namesP)
                .then(() => console.log('Types cargados en la Db'))
                .catch(err => console.log(err))
        })
}

module.exports = {
    getTypes,
}
