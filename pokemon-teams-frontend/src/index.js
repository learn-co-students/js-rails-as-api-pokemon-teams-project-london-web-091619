const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetchTrainers()

function fetchTrainers() {
  fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(trainers => trainers.forEach(trainer => injectTrainer(trainer)))
}

function injectTrainer(trainer) {
  const div = document.createElement("div")
  div.classList.add("card")

  const p = document.createElement("p")
  p.textContent = trainer.name

  const button = document.createElement("button")
  button.setAttribute("data-trainer-id", trainer.id)
  button.textContent = "Add Pokemon"

  const ul = document.createElement("ul")
  trainer.pokemons.forEach(pokemon => injectPokemon(pokemon, ul))

  div.append(p, button, ul)
  document.querySelector("main").append(div)
}

function injectPokemon(pokemon, ul) {
  const li = document.createElement("li")
  li.textContent = `${pokemon.nickname} (${pokemon.species})`

  const button = document.createElement("button")
  button.textContent = "Release"
  button.classList.add("release")
  button.setAttribute("data-pokemon-id", pokemon.id)
  button.addEventListener("click", e => releasePokemon(e))

  li.append(button)
  ul.append(li)
}

function releasePokemon(e) {
  const pokemonId = e.target.dataset.pokemonId
  const URI = POKEMONS_URL + "/" + pokemonId
  const configObj = {
    method: "DELETE"
  }
  fetch(URI, configObj).then(() => {
    document.querySelector(`[data-pokemon-id="${pokemonId}"]`).parentElement.remove()
  })
}
