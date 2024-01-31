const searchPokemonInput = document.getElementById("search-pokemon")
const searchPokemonButton = document.getElementById("lupa-img")
const pokemonCardContainer = document.getElementById("card-container")
const aside = document.getElementById("aside")
const closeBtn = document.getElementById("close-icon")
const asideInfo = document.getElementsByClassName("aside-info")
const body = document.getElementsByTagName("body")

const typeColors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5'
}

const mainTypes = Object.keys(typeColors)

const pokemonCount = 1025 

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
  
  const type = mainTypes.find(type => pokemonType.indexOf(type) > -1)
  
  const color = typeColors[type]
  
  card.style.background = color
  
  let pokemonInnerHtml = `
  <div class="pokemon-card">
  <img src="${pokemonImg}" alt="Pokemon Imagem" id="poke-img">
  <p>N° ${pokemonId}</p>
  <h4>${pokemonName}</h4>
  <div class="type">
  <p>${pokemonType[0]}</p>
  <p>${pokemonType[1]}</p>
  </div>
  `
  
  if(pokemonType[1]){
    pokemonInnerHtml = `
    <img src="${pokemonImg}" alt="Pokemon Imagem" id="poke-img">
    <p>N° ${pokemonId}</p>
    <h4>${pokemonName}</h4>
    <div class="type">
    <p>${pokemonType[0]}</p>
    <p>${pokemonType[1]}</p>
    </div>`
    
  } else {
    pokemonInnerHtml = `
    <img src="${pokemonImg}" alt="Pokemon Imagem" id="poke-img">
    <p>N° ${pokemonId}</p>
    <h4>${pokemonName}</h4>
    <div class="type">
    <p>${pokemonType[0]}</p>
    </div>
    </div>`
    
  }
  
  card.innerHTML = pokemonInnerHtml
  
  pokemonCardContainer.appendChild(card)

  const getPokemonsAside = async (pokemon) => {
    const data = await getPokemons(pokemon)
    return data()
  }
  
  const createAside = (poke) => {
    aside.classList.add("active")
    getPokemonsAside(pokemonId)

    const pokemonGif = poke["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]

    const searchNav = document.getElementById("search-nav")

    setTimeout( () => {
      const backgroundColor = color
      searchNav.style.display = "none"
      document.body.style.background = backgroundColor
      pokemonCardContainer.style.opacity = "0"
    }, 100)
    
    const asideContainer = document.createElement("div")
    asideContainer.classList.add("aside-info")

    pokemonInnerHtml = `
    <img src="${pokemonGif}" alt="" id="poke-img">
      <p id="pokemon-id">N° ${pokemonId}</p>
      <h2 id="pokemon-name">${pokemonName}</h2>
      <div class="type">
        <p>${pokemonType[0]}</p>
        <p>${pokemonType[1]}</p>
        </div>
        <h4 id="pokedex-entry">Pokemon Entry</h4>
        <p id="pokemon-entry">A strange seed was planted on its back at birth. the plant sprouts and grows with this pokémon.</p>
        <div class="height-and-Weight">
          <div class="Height"><h4>Height</h4><p>0.7m</p></div>
          <div class="weight"><h4>Weight</h4><p>6.9kg</p></div>
        </div>
        <h4>Abilities</h4>
        <div class="Abilities-container">
          <div class="abilities">
            <p id="abilities">Overgrow</p>
            <p id="abilities">Chlorophyll</p>
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

    asideContainer.innerHTML = pokemonInnerHtml

    aside.appendChild(asideContainer)

    closeBtn.addEventListener("click", () => {
      aside.classList.remove("active")
      asideContainer.innerHTML = ``
      document.body.style.background = ``
      searchNav.style.display = "flex"
      pokemonCardContainer.style.opacity= "1" 
    })
  }

  card.addEventListener("click", (e) => {
     createAside(poke)
    }
  )

}

fetchPokemons()

searchPokemonButton.addEventListener("click", () => {
  const searchPokemonInputValue = searchPokemonInput.value
})

