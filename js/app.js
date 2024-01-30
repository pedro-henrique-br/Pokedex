const pokemonCardContainer = document.getElementById("card-container")

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

const pokemonCount = 10

const getPokemons = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const response = await fetch(url)
  const data = await response.json()
  createPokemonCard(data)
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
  
  const pokemonType = poke.types.map(type => type.type.name)
  
  const type = mainTypes.find(type => pokemonType.indexOf(type) > -1)
  
  const color = typeColors[type]
  
  let pokemonInnerHtml = `
  <div class="pokemon-card">
  <img src="${pokemonImg}" alt="Pokemon Imagem" id="poke-img">
  <p>N° ${poke.id}</p>
  <h4>${pokemonName}</h4>
  <div class="type">
  <p>${pokemonType[0]}</p>
  <p>${pokemonType[1]}</p>
  </div>
  `
  
  if(pokemonType[1]){
    pokemonInnerHtml = `
    <img src="${pokemonImg}" alt="Pokemon Imagem" id="poke-img">
    <p>N° ${poke.id}</p>
    <h4>${pokemonName}</h4>
    <div class="type">
    <p>${pokemonType[0]}</p>
    <p>${pokemonType[1]}</p>
    </div>`
    
  } else {
    pokemonInnerHtml = `
    <img src="${pokemonImg}" alt="Pokemon Imagem" id="poke-img">
    <p>N° ${poke.id}</p>
    <h4>${pokemonName}</h4>
    <div class="type">
    <p>${pokemonType[0]}</p>
    </div>
    </div>`
    
  }
  
  card.innerHTML = pokemonInnerHtml
  
  pokemonCardContainer.appendChild(card)


}


fetchPokemons()

createPokemonCard()

pokemonCardContainer.addEventListener("click", (e) => {
  console.log(e.target)
})


