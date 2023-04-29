const pokeApi={}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number=pokeDetail.id
    pokemon.name=pokeDetail.name

    const types =pokeDetail.types.map((typeSlot)=>typeSlot.type.name)
    const[type]=types

    pokemon.types=types
    pokemon.type=type

    pokemon.photo=pokeDetail.sprites.other.dream_world.front_default

    const stats=pokeDetail.stats.map((slotName)=>slotName.stat.name)
    const[statName]=stats

    pokemon.stats=stats
    pokemon.statName=statName

    const statsNum=pokeDetail.stats.map((slotNumber)=>slotNumber.base_stat)
    const [statNumber]=statsNum

    pokemon.statsNum=statsNum
    pokemon.statNum=statNumber

    return pokemon
}

pokeApi.getPokemonDetail=(pokemon)=>{
    return fetch(pokemon.url)
    .then((response)=>response.json())
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit=10)=>{
    const url = `http://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response)=> response.json())
        .then((jsonBody)=>jsonBody.results)
        .then((pokemons)=> pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests)=> Promise.all(detailRequests))
        .then((pokemonsDetails)=>pokemonsDetails)
}