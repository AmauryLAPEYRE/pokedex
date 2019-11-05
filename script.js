
function searchPokemon() {
    let search = document.querySelector("#search").value;
    fetch('https://pokeapi.co/api/v2/pokemon/'+search)
    .then( (response) => {
        response.json()
            .then( (data) => {
            console.log(`Ce pokemon s'appelle ${data.name}`);
        })
        .catch(err => {
            console.log('Ce pokemon n\'existe pas');
    });
});
}

function getAllPokemon() {
    
    fetch('https://pokeapi.co/api/v2/pokemon/')
    .then( (response) => {
        response.json()
            .then((data) => {
                console.log(data);
                data.results.map(items => {
                   // Créer div avec class nom du pokemon
         
                    let divPokemon = document.createElement('div');
                    let name = document.createElement('h2');
                    let imagePokemon = document.createElement('img');

                    divPokemon.classList.add(items.name, "pokemon-card");
                    name.innerHTML = items.name;

                    document.querySelector('main').appendChild(divPokemon);
                    divPokemon.appendChild(name);
                    getPokemonByName(items.name);
                })

        })
        .catch(err => {
            console.log(err);
        });
    });
}

function getPokemonByName(name) {
    fetch('https://pokeapi.co/api/v2/pokemon/'+name)
    .then( (response) => {
        response.json()
            .then( (data) => {
 
                let divPokemon = document.querySelector('.'+name);
                let list = document.createElement('ul');
                let pokemonImage = document.createElement('img');
                let divDetails = document.createElement('div');
                let divImage = document.createElement('div');

                pokemonImage.src = data.sprites.front_default;
                divPokemon.appendChild(list);
                divPokemon.appendChild(divImage);
                divImage.appendChild(pokemonImage);

                data.types.map(i => {

                    let types = document.createElement('li');
                    list.appendChild(types);
                    types.innerHTML = i.type.name;

                })
        })
        .catch(err => {
            console.log('Ce pokemon n\'existe pas');
    });
});
}

getAllPokemon();