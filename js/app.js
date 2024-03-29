const searchPokemonInput = document.getElementById("search-pokemon");
const pokemonCardContainer = document.getElementById("card-container");
const aside = document.getElementById("aside");
const closeBtn = document.querySelector("#close-icon img");
const asideInfo = document.getElementsByClassName("aside-info");
const body = document.getElementsByTagName("body");
const pokeballImg = document.getElementById("pokeball-img");

const typeColors = {
  normal: "#BCBCAC",
  fighting: "#BC5442",
  flying: "#669AFF",
  poison: "#AB549A",
  grass: "#78CD54",
  ground: "#DEBC54",
  rock: "#BCAC66",
  bug: "#ABBC1C",
  ghost: "#6666BC",
  steel: "#ABACBC",
  fire: "#FF421C",
  water: "#2F9AFF",
  electric: "#FFCD30",
  psychic: "#FF549A",
  ice: "#78DEFF",
  dragon: "#7866EF",
  dark: "#785442",
  fairy: "#FFACFF",
  shadow: "#0E2E4C",
};

const mainTypes = Object.keys(typeColors);

let maxIndex = 30;
let currentlyShowingAmount = 0;

async function getPokemons(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  createPokemonCard(data);
  return data;
}

async function fetchPokemons(index) {
  if (currentlyShowingAmount <= index) {
    currentlyShowingAmount += 1;
    await getPokemons(currentlyShowingAmount);
    updatePokemonList();
  } else {
    currentlyShowingAmount = currentlyShowingAmount;
    updatePokemonList();
  }
}

function updatePokemonList() {
  if (currentlyShowingAmount <= maxIndex) {
    fetchPokemons(currentlyShowingAmount);
  }
}

function increasesMaxBy(by) {
  if (maxIndex >= by) {
    maxIndex += by;
  } else {
    return maxIndex;
  }
}

// Scroll

window.addEventListener("scroll", function () {
  addNewScrollPokemon();
});

function addNewScrollPokemon() {
  if (
    window.scrollY + 100 >=
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight
    ) {
      increasesMaxBy(29);
      updatePokemonList();
    }
  }

  async function getAllPokemons(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

 // Search

  async function fetchAllPokemons () {
  for(x = 1; 1000 > x; x++){
    const pokemon = await getAllPokemons(x)
    const pokemonName = [pokemon.name]
  
    const pokeName = pokemonName.forEach((pokemonName) => {
      const name = [pokemonName]
      searchPokemonInput.addEventListener("input", async () => {
      const pokemonInputValue = searchPokemonInput.value
          .replace(/[^a-zA-Z0-9]/g, "")
          .toLowerCase();
          if(searchPokemonInput.value == ""){
            pokemonCardContainer.innerHTML = ""
            maxIndex = 29
          } 
          else if (pokemonName.includes(pokemonInputValue)){
            pokemonCardContainer.innerHTML = ""
            getPokemons(name)
          } else if (pokemonName.includes(pokemonInputValue) === false){
            pokemonCardContainer.innerHTML = ""
          } else {
            pokemonCardContainer.innerHTML = ""
          }
      })
    })
  }}

  searchPokemonInput.addEventListener("input", () => {
    const pokemonInputValue = searchPokemonInput.value
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase();
        if(searchPokemonInput.value == ""){
          pokemonCardContainer.innerHTML = ""
          maxIndex = 29
          currentlyShowingAmount = 0
          fetchPokemons()
        }}) 

  fetchAllPokemons()

  fetchPokemons();
  
  async function createPokemonCard(poke) {
  const card = document.createElement("div");

  card.classList.add("pokemon-card");

  const pokemonImg = poke["sprites"].front_default;

  const pokemonName = poke.forms[0].name;

  const pokemonId = poke.id;

  const pokemonType = poke.types.map((type) => type.type.name);

  const backgroundColor = typeColors[pokemonType[0]];

  const color_1 = typeColors[pokemonType[0]];
  const color_2 = typeColors[pokemonType[1]];

  let pokemonInnerHtml = `
  <div class="pokemon-card">
  <img src="${pokemonImg}" alt="Pokemon Imagem" id="poke-img">
  <p>N° ${pokemonId}</p>
  <h4>${pokemonName}</h4>
  <div class="type">
  <p style="opacity: background: ${color_1}">${pokemonType[0]}</p>
  <p style="background: ${color_2}">${pokemonType[1]}</p>
  </div>
  `;

  if (pokemonType[1]) {
    pokemonInnerHtml = `
    <img src="${pokemonImg}" alt="Pokemon Imagem" id="poke-img">
    <p>N° ${pokemonId}</p>
    <h4>${pokemonName}</h4>
    <div class="type">
    <p style="background: ${color_1}">${pokemonType[0]}</p>
    <p style="background: ${color_2}">${pokemonType[1]}</p>
    </div>
    `;
  } else {
    pokemonInnerHtml = `
    <img src="${pokemonImg}" alt="Pokemon Imagem" id="poke-img">
    <p>N° ${pokemonId}</p>
    <h4>${pokemonName}</h4>
    <div class="type">
    <p style="background: ${color_1}">${pokemonType[0]}</p>
    </div>
    </div>`;
  }

  card.innerHTML = pokemonInnerHtml;

  pokemonCardContainer.appendChild(card);

  card.addEventListener("click", () => {
    createAside(poke);

    return { name: pokemonName, element: card };
  });

  const getPokemonEntry = async (pokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`;
    const response = await fetch(url);
    const data = await response.json();
    return data["flavor_text_entries"][1]["flavor_text"]
      .toLowerCase()
      .replace(`\f`, " ");
  };

  const createAside = async (poke) => {
    const searchNav = document.getElementById("search-nav");
    aside.classList.add("active");

    const entry = await getPokemonEntry(pokemonId);

    let pokemonGif =
      poke["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];

    if (pokemonGif == undefined) {
      pokemonGif = pokemonImg;
    }

    const pokemonWeight = poke.weight / 10 + " " + "kg";

    const pokemonHeight = poke.height / 10 + " " + "m";

    const abilities = new Object(poke.abilities);

    const pokeStatsTotal =
      poke.stats[1].base_stat +
      poke.stats[2].base_stat +
      poke.stats[3].base_stat +
      poke.stats[4].base_stat +
      poke.stats[5].base_stat;

    setTimeout(() => {
      searchNav.style.display = "none";
      document.body.style.background = backgroundColor;
      pokemonCardContainer.style.visibility = "hidden";
      pokeballImg.style.display = "none";
    }, 100);

    const asideContainer = document.createElement("div");
    asideContainer.classList.add("aside-info");

    if (abilities[1] === undefined) {
      pokemonInnerHtml = `
      <img src="${pokemonGif}" alt="" id="poke-img">
      <p id="pokemon-id">N° ${pokemonId}</p>
      <h2 id="pokemon-name">${pokemonName}</h2>
        <div class="type">
        <p style="background: ${color_1}">${pokemonType[0]}</p>
        </div>
        <h4 id="pokedex-entry">Pokemon Entry</h4>
        <p id="pokemon-entry">${entry}</p>
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
        <p><span class="stat" id="hp-stat">HP</span><span>${poke.stats[1].base_stat}</span></p>
        <p><span class="stat" id="atk-stat">ATK</span><span>${poke.stats[2].base_stat}</span></p>
        <p><span class="stat" id="def-stat">DEF</span>${poke.stats[3].base_stat}</span></p>
        <p><span class="stat" id="spa-stat">SpA</span>${poke.stats[4].base_stat}</span></p>
        <p><span class="stat" id="spd-stat">SpD</span>${poke.stats[5].base_stat}</span></p>
        <p><span class="stat"id="tot-stat">TOT</span>${pokeStatsTotal}</span></p> 
        </div>
        </div>
        </div>`;
    } else if (pokemonType[1] === undefined) {
      pokemonInnerHtml = `
      <img src="${pokemonGif}" alt="" id="poke-img">
      <p id="pokemon-id">N° ${pokemonId}</p>
      <h2 id="pokemon-name">${pokemonName}</h2>
      <div class="type">
      <p style="background: ${color_1}">${pokemonType[0]}</p>
      </div>
      <h4 id="pokedex-entry">Pokemon Entry</h4>
      <p id="pokemon-entry">${entry}</p>
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
      <p><span class="stat" id="hp-stat">HP</span><span>${poke.stats[1].base_stat}</span></p>
      <p><span class="stat" id="atk-stat">ATK</span><span>${poke.stats[2].base_stat}</span></p>
      <p><span class="stat" id="def-stat">DEF</span>${poke.stats[3].base_stat}</span></p>
              <p><span class="stat" id="spa-stat">SpA</span>${poke.stats[4].base_stat}</span></p>
              <p><span class="stat" id="spd-stat">SpD</span>${poke.stats[5].base_stat}</span></p>
              <p><span class="stat" id="tot-stat">TOT</span>${pokeStatsTotal}</span></p> 
              </div>
              </div>`;
    } else {
      pokemonInnerHtml = `
      <img src="${pokemonGif}" alt="" id="poke-img">
      <p id="pokemon-id">N° ${pokemonId}</p>
      <h2 id="pokemon-name">${pokemonName}</h2>
      <div class="type">
      <p style="background: ${color_1}">${pokemonType[0]}</p>
      <p style="background: ${color_2}">${pokemonType[1]}</p>
      </div>
      <h4 id="pokedex-entry">Pokemon Entry</h4>
      <p id="pokemon-entry">${entry}</p>
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
      <p><span class="stat" id="hp-stat">HP</span><span>${poke.stats[1].base_stat}</span></p>
      <p><span class="stat" id="atk-stat">ATK</span><span>${poke.stats[2].base_stat}</span></p>
      <p><span class="stat" id="def-stat">DEF</span>${poke.stats[3].base_stat}</span></p>
      <p><span class="stat" id="spa-stat">SpA</span>${poke.stats[4].base_stat}</span></p>
      <p><span class="stat" id="spd-stat">SpD</span>${poke.stats[5].base_stat}</span></p>
      <p><span class="stat" id="tot-stat">TOT</span>${pokeStatsTotal}</span></p>  
      </div>
      </div>
      </div>`;
    }

    asideContainer.innerHTML = pokemonInnerHtml;

    aside.appendChild(asideContainer);

    closeBtn.addEventListener("click", () => {
      aside.classList.remove("active");
      asideContainer.innerHTML = "";
      document.body.style.background = "";
      searchNav.style.display = "flex";
      pokemonCardContainer.style.visibility = "visible";
      pokeballImg.style.display = "flex";
    });
  };
}


