const $select = document.querySelector('[data-js="habitat-select"]')
const $main = document.querySelector('[data-js="pokemon-result"]')

window.addEventListener('load', searchHabitats)

function searchHabitats() {
  const habitatPromise = fetch('https://pokeapi.co/api/v2/pokemon-habitat/')

  habitatPromise
  .then(data => data.json())
  .then(data => showHabitats(data.results))
}

function showHabitats(habitats) {
  const habitatsHTML = `
      ${habitats.map(habitat =>
        `<option data-js="">${habitat.name}</option>`
      ).join('')}
  `

  $select.insertAdjacentHTML('beforeend', habitatsHTML)
  $select.addEventListener('click', function() {
    if (this.value !== 'select') {
      searchPokemons(this.value)
    }
  })
}

function searchPokemons(habitat) {
  const pokemonPromise = fetch(`https://pokeapi.co/api/v2/pokemon-habitat/${habitat}`);

  pokemonPromise
  .then(data => data.json())
  .then(data => showPokemons(data.pokemon_species));
}

function showPokemons(allPokemons) {
  const markUp = `
    <ul class="pokemon-result__list">
      ${allPokemons.map(pokemon =>
        `<li class="pokemon-result__item">
            ${pokemon.name}
         </li>`
      ).join('')}
    </ul>
  `

  $main.innerHTML = markUp
}
