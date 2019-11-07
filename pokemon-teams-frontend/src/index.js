const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function displayTrainers(){
    fetchTrainers()
        .then(function(trainers){
            trainers.forEach(function(trainer){
                displayTrainer(trainer)
            })
        })
}

function fetchTrainers(){
    return fetch(TRAINERS_URL)
        .then(function(response){
            return response.json()
        })
        
}

function displayTrainer(trainer){
    const card = document.createElement('div')
    const main = document.querySelector('main')
    card.id = `${trainer.id}`

    const newP = document.createElement('p')
    newP.innerText = trainer.name

    newButton = document.createElement('button')
    newButton.id = trainer.id
    newButton.innerText = "Add Pokemon"

    card.appendChild(newP)
    card.appendChild(newButton)

    
    const cardUl = document.createElement("ul")
    card.appendChild(cardUl)
    card.classList.add('card')

    main.appendChild(card)
    newButton.addEventListener("click", addPokemon)



    trainer.pokemons.forEach(function(pokemon){
        addPokemonToCard(pokemon, card)
    })
}

function addPokemonToCard(pokemon, card){
    cardUl = card.querySelector("ul")
    newLi = document.createElement('li')
    newLi.innerText = `${pokemon.nickname} (${pokemon.species})`

    newButton = document.createElement("button")
    newButton.classList.add("release")
    newButton.id = pokemon.id
    newButton.innerText = "Release"


    newLi.appendChild(newButton)
    newButton.addEventListener("click", deletePokemon)
    cardUl.appendChild(newLi)
}

function deletePokemon(e){
    destroyPokemon(e)
        .then(function(pokemon){
            console.log(pokemon)
            e.target.parentElement.remove()
        })
}

function destroyPokemon(e){
    return fetch(`${POKEMONS_URL}/${e.target.getAttribute("id")}`, {method: "DELETE"})
        .then(function(response){
            return response.json()
        })
}

function addPokemon(e){
    createPokemon(e)
        .then(function(pokemon){
            addPokemonToCard(pokemon, e.target.parentElement)
        })
}

function createPokemon(e){
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
}




(function init(){
    displayTrainers()
})()