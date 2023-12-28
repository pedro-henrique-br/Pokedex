fetch(`https://pokeapi.co/api/v2/pokemon/212`).then(resposta =>{
  return resposta.json()
}) .then( pokeInfo =>{
  console.log(pokeInfo)

  const pokeImg = pokeInfo.sprites.other.dream_world.front_default
  console.log(pokeImg)

  // mudar o src da imagem do pokemon
  const pokemonIcon = document.getElementById(`icon-pokemon`)
  pokemonIcon.src = pokeImg
})




function allPokemons () {
  for(let pokemonId = 0; pokemonId <= 649; pokemonId++ ){
    console.log(pokemonId)
  }
}

