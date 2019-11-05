const baseRequest = 'https://pokeapi.co/api/v2/pokemon/';


/*****************/
/** API REQUESTS */
/*****************/


function searchPokemon() {
    let search = document.querySelector("#search").value;
    fetch(baseRequest + search)
        .then( (response) => {
            response.json()
                .then( (data) => {
                    console.log(`Ce pokemon s'appelle ${data.name}`);
                })
                .catch(err => {
                    console.log(err, 'Ce pokemon n\'existe pas');
                });
    });
}

function getAllPokemon() {
    fetch(baseRequest)
        .then( (response) => {
            response.json()
                .then((data) => { 
                    createPokeCard(data.results);
                })
                .catch(err => {
                    console.log(err);
                });
        });
}

function getPokemonByName(name) {
    fetch(baseRequest + name)
        .then( (response) => {
            response.json()
                .then( (data) => {
                    createListTypes(data, name);
                })
                .catch(err => {
                    console.log('Ce pokemon n\'existe pas');
                });
        });
}

function getPokemonDetails(name) {
    fetch(baseRequest + name)
        .then( (response) => {
            response.json()
                .then( (data) => {
                    debugger;
                })
                .catch(err => {
                    console.log('Ce pokemon n\'existe pas');
                });
        });
}


/**********************/
/** ELEMENTS CREATION */
/**********************/
function createListTypes(data, name) {
    let divPokemon = document.querySelector('.'+name);
    let list = document.createElement('ul');
    let pokemonImage = document.createElement('img');
    let divImage = document.createElement('div');

    pokemonImage.src = data.sprites.front_default;
    divPokemon.appendChild(list);
    divPokemon.appendChild(divImage);
    divImage.appendChild(pokemonImage);

    data.types.map(i => {
        
        let types = document.createElement('li');
        list.parentElement.classList.add(i.type.name);
        list.appendChild(types);
        types.innerHTML = i.type.name;
    })
}

function createPokeCard(data) {
    data.map(items => {
  
        let divPokemon = document.createElement('div');
        let name = document.createElement('h2');
        let imagePokemon = document.createElement('img');

        divPokemon.classList.add(items.name, "pokemon-card");
        name.innerHTML = items.name;

        document.querySelector('main').appendChild(divPokemon);
        divPokemon.appendChild(name);

        getPokemonByName(items.name);

        divPokemon.addEventListener('click', (e) => {

            modalDetails();
        })
    })
}

function modalDetails() {
    console.log(e);
    let modalDiv = document.createElement('div');

    modalDiv.classList.add('modal-container');

    document.querySelector('main').appendChild(modalDiv);
}


getAllPokemon();