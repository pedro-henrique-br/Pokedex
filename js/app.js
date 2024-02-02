const searchPokemonInput = document.getElementById("search-pokemon")
const searchPokemonButton = document.getElementById("lupa-img")
const pokemonCardContainer = document.getElementById("card-container")
const aside = document.getElementById("aside")
const closeBtn = document.getElementById("close-icon")
const asideInfo = document.getElementsByClassName("aside-info")
const body = document.getElementsByTagName("body")

const typeColors = {
  normal: '#BCBCAC',
  fighting: '#BC5442',
  flying: '#669AFF',
  poison: '#AB549A',
  grass: '#78CD54',
  ground: '#DEBC54',
  rock: '#BCAC66',
  bug: '#ABBC1C',
  ghost: '#6666BC',
  steel: '#ABACBC',
  fire: '#FF421C',
  water: '#2F9AFF',
  electric: '#FFCD30',
  psychic: '#FF549A',
  ice: '#78DEFF',
  dragon: '#7866EF',
  dark: '#785442',
  fairy: '#FFACFF',
  shadow: '#0E2E4C'
}

const mainTypes = Object.keys(typeColors)

const pokemonCount = 649

const getPokemons = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const response = await fetch(url)
  const data = await response.json()
  createPokemonCard(data)
  return data
}

const fetchPokemons = async () => {
  for(i = 1; pokemonCount >= i; i++){
    await getPokemons(i)
  }
}

const createPokemonCard = (poke) => {
  const card = document.createElement("div")
  card.classList.add("pokemon-card")
  
  const pokemonImg = poke.sprites.front_default
  
  const pokemonName = poke.forms[0].name
  
  const pokemonId = poke.id
  
  const pokemonType = poke.types.map(type => type.type.name)
  
  const backgroundColor = typeColors[pokemonType[0]]
  
  const color_1 = typeColors[pokemonType[0]]   
  const color_2 = typeColors[pokemonType[1]]   
  
  if(pokemonId == 649) {
    console.log("oi")
  }


 
  
  if(pokemonType[1]){
    pokemonInnerHtml = `
    <img src="${pokemonImg}" alt="Pokemon Imagem" id="poke-img">
    <p>N° ${pokemonId}</p>
    <h4>${pokemonName}</h4>
    <div class="type">
    <p style="background: ${color_1}">${pokemonType[0]}</p>
    <p style="background: ${color_2}">${pokemonType[1]}</p>
    </div>
    `
    
  } else {
    pokemonInnerHtml = `
    <img src="${pokemonImg}" alt="Pokemon Imagem" id="poke-img">
    <p>N° ${pokemonId}</p>
    <h4>${pokemonName}</h4>
    <div class="type">
    <p style="background: ${color_1}">${pokemonType[0]}</p>
    </div>
    </div>`
  }
  
  card.innerHTML = pokemonInnerHtml
  
  pokemonCardContainer.appendChild(card)
  
  const getEntry = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`
    const response = await fetch(url)
    const entry = await response.json()
    return entry ["flavor_text_entries"][2]["flavor_text"]
  }
  
  const fetchPokemonsAside = async (pokemon) => {
    const data = await getPokemons(pokemon)
    return data
  }
  
  const getAsideInfo = async (poke) => {
    aside.classList.add("active")
    fetchPokemonsAside(pokemonId)
    const pokemonEntry = await getEntry(pokemonId)

    const pokemonGif = poke["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]
    
    const pokemonWeight = poke.weight / 10 + "kg"
    
    const pokemonHeight = poke.height / 10 + "m"
    
    const abilities = new Object(poke.abilities)
    
    const statsData = new Object (poke.stats)

      console.log(poke.stats[0].base_stat)     
      console.log(poke.stats[0].stat.name)     
      
    const searchNav = document.getElementById("search-nav")
    
    setTimeout( () => {
      searchNav.style.display = "none"
      document.body.style.background = backgroundColor
      pokemonCardContainer.style.opacity = "0"
    }, 100)
    
    const asideContainer = document.createElement("div")
    asideContainer.classList.add("aside-info")
    
    let pokemonAsideInnerHtml = `
    <img src="${pokemonGif}" alt="" id="poke-img">
      <p id="pokemon-id">N° ${pokemonId}</p>
      <h2 id="pokemon-name">${pokemonName}</h2>
      <div class="type">
      <p style="background: ${color_1}">${pokemonType[0]}</p>
      <p style="background: ${color_2}">${pokemonType[1]}</p>
      </div>
      <h4 id="pokedex-entry">Pokemon Entry</h4>
      <p id="pokemon-entry">${pokemonEntry}</p>
      <div class="height-and-Weight">
      <div class="Height"><h4>Height</h4><p>${pokemonHeight}</p></div>
          <div class="weight"><h4>Weight</h4><p>${pokemonWeight}</p></div>
        </div>
        <h4>Abilities</h4>
        <div class="Abilities-container">
          <div class="abilities">
            <p id="abilities">${abilities[0].ability.name}</p>
            <p id="abilities">${abilities[1].ability.name}</p>
          </div>
        </div>
        <div class="stats-title"><h4>Stats</h4>
          <div class="stats">
            <p>49</p>
            <p>49</p>
            <p>49</p>
            <p>49</p> 
            <p>49</p>
            <p>49</p>
            <p>49</p>
          </div>
        </div>
        </div>`
        

    if(abilities[1] === undefined){
        pokemonAsideInnerHtml = `
      <img src="${pokemonGif}" alt="" id="poke-img">
      <p id="pokemon-id">N° ${pokemonId}</p>
      <h2 id="pokemon-name">${pokemonName}</h2>
      <div class="type">
      <p style="background: ${color_1}">${pokemonType[0]}</p>
        </div>
        <h4 id="pokedex-entry">Pokemon Entry</h4>
        <p id="pokemon-entry">${pokemonEntry}</p>
        <div class="height-and-Weight">
        <div class="Height"><h4>Height</h4><p>${pokemonHeight}</p></div>
        <div class="weight"><h4>Weight</h4><p>${pokemonWeight}</p></div>
        </div>
        <h4>Abilities</h4>
      <div class="Abilities-container">
      <div class="abilities">
          <p id="abilities">${abilities[0].ability.name}</p>
          </div>
      </div>
      <div class="stats-title"><h4>Stats</h4>
      <div class="stats">
            <p></p>
            <p>49</p>
            <p>49</p>
            <p>49</p>
            <p>49</p>
            <p>49</p>
            <p>49</p>
            </div>
        </div>
        </div>`
        } else if (pokemonType[1] === undefined){
          pokemonAsideInnerHtml = `
      <img src="${pokemonGif}" alt="" id="poke-img">
      <p id="pokemon-id">N° ${pokemonId}</p>
      <h2 id="pokemon-name">${pokemonName}</h2>
      <div class="type">
        <p style="background: ${color_1}">${pokemonType[0]}</p>
        </div>
        <h4 id="pokedex-entry">Pokemon Entry</h4>
        <p id="pokemon-entry">${pokemonEntry}</p>
      <div class="height-and-Weight">
        <div class="Height"><h4>Height</h4><p>${pokemonHeight}</p></div>
        <div class="weight"><h4>Weight</h4><p>${pokemonWeight}</p></div>
      </div>
        <h4>Abilities</h4>
      <div class="Abilities-container">
        <div class="abilities">
          <p id="abilities">${abilities[0].ability.name}</p>
          <p id="abilities">${abilities[1].ability.name}</p>
        </div>
      </div>
      <div class="stats-title"><h4>Stats</h4>
        <div class="stats">
            <p>49</p>
            <p>49</p>
            <p>49</p>
            <p>49</p>
            <p>49</p>
            <p>49</p>
            <p>49</p>
          </div>
        </div>
        </div>`
        } else {
          pokemonAsideInnerHtml = `
    <img src="${pokemonGif}" alt="" id="poke-img">
      <p id="pokemon-id">N° ${pokemonId}</p>
      <h2 id="pokemon-name">${pokemonName}</h2>
      <div class="type">
      <p style="background: ${color_1}">${pokemonType[0]}</p>
      <p style="background: ${color_2}">${pokemonType[1]}</p>
      </div>
      <h4 id="pokedex-entry">Pokemon Entry</h4>
      <p id="pokemon-entry">${pokemonEntry}</p>
      <div class="height-and-Weight">
      <div class="Height"><h4>Height</h4><p>${pokemonHeight}</p></div>
          <div class="weight"><h4>Weight</h4><p>${pokemonWeight}</p></div>
        </div>
        <h4>Abilities</h4>
        <div class="Abilities-container">
          <div class="abilities">
            <p id="abilities">${abilities[0].ability.name}</p>
            <p id="abilities">${abilities[1].ability.name}</p>
          </div>
        </div>
        <div class="stats-title"><h4>Stats</h4>
          <div class="stats">
            <p>49</p>
            <p>49</p>
            <p>49</p>
            <p>49</p> 
            <p>49</p>
            <p>49</p>
            <p>49</p>
          </div>
        </div>
        </div>`
        }

        closeBtn.addEventListener("click", () => {
          aside.classList.remove("active")
          asideContainer.innerHTML = ``
          document.body.style.background = ``
          searchNav.style.display = "flex"
          pokemonCardContainer.style.opacity= "1" 
        })
        
        asideContainer.innerHTML = pokemonAsideInnerHtml
    
        aside.appendChild(asideContainer)
    
        
      }

  card.addEventListener("click", () => {
    getAsideInfo(poke)
    }
  )

}

fetchPokemons()

searchPokemonButton.addEventListener("click", () => {
  const searchPokemonInputValue = searchPokemonInput.value
})

