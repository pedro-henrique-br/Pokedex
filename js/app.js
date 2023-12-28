fetch(`https://pokeapi.co/api/v2/pokemon/1/`).then(resposta =>{
  return resposta.json()
}) .then( pokeInfo =>{
  console.log(pokeInfo)
  
  // mudar o src da imagem do pokemon
  const pokemonIcon = document.getElementById(`icon-pokemon`)
  pokemonIcon.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
})
