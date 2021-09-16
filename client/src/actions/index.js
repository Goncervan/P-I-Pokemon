    import axios from 'axios';
// import allPokemons from '../reducer';
export function getPokemons() {
    return async function (dispatch) {
        var result = await axios.get('http://localhost:3001/pokemons', {
        });
        return dispatch({
            type: 'GET_POKEMONS',
            payload: result.data
        });
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        try {
            var result = await axios.get('http://localhost:3001/pokemons/' + id);
            return dispatch({
                type: 'GET_DETAIL',
                payload: result.data
            })
        }catch(err){
            console.log(err)
        }
    };
};

export function getPokemonByName(name) {
    return async function (dispatch) {
        try {
            console.log(name)
            var result = await axios.get("http://localhost:3001/pokemons?name=" + name)
            return dispatch({
                type: 'GET_POKEMON_BY_NAME',
                payload: result.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export function getType() {
    return async function (dispatch) {
        const result = await axios.get('http://localhost:3001/types');
        return dispatch({ type: 'GET_TYPES', payload: result.data })
    }
};
export function postPokemon(payload) {
    return async function (dispatch) {
        var result = await axios.post('http://localhost:3001/pokemons', payload)
        return result;
    }
}
export function orderByName(payload){
    return{
        type:'ORDER_BY_NAME',
        payload
    }
}
export function filterPokeType(payload){
    return{
        type: 'FILTER_POKE_TYPE',
        payload
    }
}

export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }
}

export function orderByAttack(payload){
    return{
        type:'ORDER_BY_ATTACK',
        payload
    }
}