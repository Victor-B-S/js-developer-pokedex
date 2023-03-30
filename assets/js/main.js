const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const listFirstGen = document.getElementById('firstGen')
const listSecondGen = document.getElementById('secondGen')
const listThirdGen = document.getElementById('thirdGen')

let maxRecords = 386;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNextPage = offset + limit

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

listFirstGen.addEventListener('click', () => {
    offset = 0
    maxRecords = 151
    pokemonList.innerHTML = ""
    loadPokemonItens(offset, limit)
})

listSecondGen.addEventListener('click', () => {
    offset = 151
    maxRecords = 251
    pokemonList.innerHTML = ""
    loadPokemonItens(offset, limit)
})

listThirdGen.addEventListener('click', () => {
    offset = 251
    maxRecords = 386
    pokemonList.innerHTML = ""
    loadPokemonItens(offset, limit)
})