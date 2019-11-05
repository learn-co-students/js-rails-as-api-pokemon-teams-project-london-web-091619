const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded',function(){
  return fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(function(data){
    for(const trainer of data){
      const main = document.querySelector("main")
      const divCard = document.createElement("div")
      const pName = document.createElement("p")
      const ulPoke = document.createElement("ul")
      const addButton = document.createElement("button")

      addButton.id = trainer.id
      addButton.textContent = "Add Pokemon"
      divCard.className = "card"
      pName.textContent = trainer.name


      main.appendChild(divCard)
      divCard.appendChild(pName)
      divCard.appendChild(addButton)
      divCard.appendChild(ulPoke)

      addButton.addEventListener('click', (e) =>{
        const configurationObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({id: e.target.id})
    }

    return fetch(POKEMONS_URL, configurationObject)
        .then(function(response){
            return response.json()

        })
      })

      let trainerPokemons = trainer.pokemons
      for(const pokemon of trainerPokemons){
        const pokeNickName = pokemon.nickname
        const pokeSpecies = pokemon.species
        const liPoke = document.createElement("li")
        const liButton = document.createElement("button")


        liButton.addEventListener('click', function(e){
          return fetch(`${POKEMONS_URL}/${e.target.getAttribute("id")}`, {method: "DELETE"})
          .then(res => res.json())
          .then(function(pokemon){
          e.target.parentElement.remove()})
        })

        liButton.className = "release"
        liButton.textContent = "Release"
        liButton.id = pokemon.id;
        liPoke.textContent = `${pokeNickName} (${pokeSpecies})`;
        ulPoke.appendChild(liPoke)
        liPoke.appendChild(liButton)

        }
      }
    })
  })
