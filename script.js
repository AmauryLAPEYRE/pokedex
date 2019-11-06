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
                  
                    modalDetails(data);
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

        divPokemon.addEventListener('click', () => {
        
            getPokemonDetails(items.name);
            
        })
    })
}

function modalDetails(datas) {
    console.log(datas);
    let modalDiv = document.createElement('div');
    let modalHead = document.createElement('div');
    let pokeModalHead = document.createElement('div');
    let pokeModalHeadLeft = document.createElement('div');

    let pokeId = document.createElement('span');
    let pokeName = document.createElement('h2');
    let pokeImg = document.createElement('img');
    let pokeTypes = document.createElement('ul');
    let leaveModal = document.createElement('span');
    let addTeam = document.createElement('span');
    /*const elements = [
        leaveModal,
        addTeam,
        pokeName,
        pokeImg,
        pokeTypes
    
    ]*/
       
    modalHead.classList.add('modal-head');
    pokeModalHead.classList.add('poke-head');
    leaveModal.classList.add('left-arrow');
    addTeam.classList.add('poke-add');
    
    datas.types.map( (i) => {

        let typeItem =  document.createElement('li');
        typeItem.innerHTML = i.type.name;

        pokeTypes.appendChild(typeItem);
    })

    pokeName.innerHTML = datas.species.name;
    pokeId.innerHTML = `#${datas.id}`;
    pokeImg.setAttribute('src', datas.sprites.front_default);


    modalHead.appendChild(leaveModal);
    modalHead.appendChild(addTeam);

    pokeModalHeadLeft.appendChild(pokeName);
    pokeModalHeadLeft.appendChild(pokeTypes);
    pokeModalHead.appendChild(pokeModalHeadLeft);
    pokeModalHead.appendChild(pokeId);

    modalDiv.appendChild(modalHead);
    modalDiv.appendChild(pokeModalHead);
    modalDiv.appendChild(pokeImg);


    /*elements.map(el => {
        console.log(el);
        modalDiv.appendChild(el);
    }) */
    modalDiv.classList.add('modal-container');

    document.querySelector('main').appendChild(modalDiv);
    
}

/** appendChild, object in parameter */
function createHTML() {

}


getAllPokemon();