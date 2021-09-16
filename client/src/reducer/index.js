
// Declaro el estado que va a guardar los pokemones
const initialState = {
    pokemons: [],
    allPokemons: [],
    type: [],
    allTypes: [],
    detail: []
}


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }
        case 'GET_POKEMON_BY_NAME':
            return {
                ...state,
                allPokemons: action.payload
            }
        case 'POST_POKEMON':
            return {
                ...state,
            }
        case 'GET_TYPES':
            return {
                ...state,
                type: action.payload,
                allTypes: action.payload
            }
        case 'GET_DETAIL':
            return {
                ...state,
                detail: action.payload
            }
        case 'FILTER_POKE_TYPE':
            const allPokes = state.pokemons;
            const pokesFilter = action.payload === 'All' ? allPokes : allPokes.filter((el) => el.type.includes(action.payload))
            return {
                ...state,
                allPokemons: pokesFilter
            }
        case 'FILTER_CREATED':
            const allP = state.pokemons
            const createdFilter = action.payload === 'created'
                ? allP.filter((poke) => poke.created)
                : allP.filter((poke) => !poke.created)
            return {
                ...state,
                allPokemons:
                    action.payload === 'All' ? allP : createdFilter
            }
        case 'ORDER_BY_NAME':
            let arr = action.payload === 'ascA' ?
                state.pokemons.sort(function (a, b) {
                    if (a.name > b.name) { return 1; }
                    if (b.name > a.name) { return -1; }
                    return 0;
                }) :
                state.pokemons.sort(function (a, b) {
                    if (a.name > b.name) { return -1; }
                    if (b.name > a.name) { return 1; }
                    return 0;
                })
            return {
                ...state,
                pokemons: arr
            }
        case 'ORDER_BY_ATTACK':
            let arr2 = action.payload === 'ascF' ?
                state.pokemons.sort(function (a, b) {
                    if (a.attack > b.attack) { return -1; }
                    if (b.attack > a.attack) { return 1; }
                    return 0
                }) :
                state.pokemons.sort(function (a, b) {
                    if (a.attack > b.attack) { return 1; }
                    if (b.attack > a.attack) { return -1; }
                    return 0
                })
            return {
                ...state,
                pokemons: arr2
            }


        default: return state;
    }
}

export default rootReducer;

