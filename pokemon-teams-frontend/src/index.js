const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function() {
    trainerIndex()
    
  })

  function pokemonIndex(){
    fetch(POKEMONS_URL)
    .then(resp => resp.json())
    .then(json => console.log(json))
  }

  
  
  function trainerIndex(){
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => renderTrainers(json))
  }

  function renderTrainers(json){

    json.forEach(trainerObj => {
       
        const tc = document.createElement("div")
        const tn = document.createElement("p")

        tc.id = trainerObj.id
        tn.innerText = `trainer: ${trainerObj.name}`
        
        document.body.appendChild(tc)
        tc.appendChild(tn)

        

        const newForm = document.createElement("form")
                newForm.innerHTML = 'species: '
                newForm.innerHTML += '<input type="text" name="species" value=""><br>'
                newForm.innerHTML += 'nickname:'
                newForm.innerHTML +=' <input type="text" name="nickname">'
                newForm.innerHTML += ' new pokimon '
                newForm.innerHTML += ' <input type="submit" id="add"> '

                
                tc.appendChild(newForm)

                newForm.addEventListener("submit", addPokemon)

        

        trainerObj.pokemons.forEach(pokObj => {
            const myPok = document.createElement("p")
            myPok.innerHTML = pokObj.species
            tc.appendChild(myPok)
            myPok.id=`p ${pokObj.id}`

            const btn = document.createElement("button")
             btn.innerText= "delete poke"
             myPok.appendChild(btn)

             btn.addEventListener("click", deletePok)
            
        })
        
  
        
    });
  }

        function deletePok(e){
          const pid = parseInt( e.target.parentElement.id.split(" ")[1])
            fetch(`${POKEMONS_URL}/${pid}`,{method: "DELETE"})

             console.log(e.target.parentElement)
             e.target.parentElement.remove()
        }


        function addPokemon(e){

          e.preventDefault()
          
            if (e.target.parentElement.children.length < 8){
              const spece = e.target.species.value
              const nickname = e.target.nickname.value
              const id = e.target.parentElement.id
              

              const configutationObject = 
               { method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                  },
                
                  body: JSON.stringify({
                    "species": spece,
                    "nickname": nickname,
                    "trainer_id": id
                })
               }
              

              fetch (POKEMONS_URL,configutationObject)
                .then (resp => resp.json())
                .then (json => appendNewPok(json))
              
              function appendNewPok(json){
                const mydiv = document.getElementById(id)
                const np = document.createElement("p")
                np.innerText = json.species
                mydiv.appendChild(np)
              }     
        }
        else{alert("too many poks")} 
      }
// }
        //make the poken button the submit for a form that taies what poks they want
        //make the add pokemon button fo every trainer giving it trainer id
        //if the trainer has<6 poks make a post request to pokemon controller and in the controller create new pokemon with that trainers id...otherwise aler
        

 


//   fetch(POKEMONS_URL)
//             .then(resp => resp.json())
//             .then(function P(json){
//                   return const pokemons = json
//             )
          