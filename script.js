/************/
/** HELPERS */
/************/
function createHTML(elements, container) {

    elements.map(el => {
        container.appendChild(el);
    })

    return container;
}

/**************/
/** VARIABLES */
/**************/
const baseRequest = 'https://pokeapi.co/api/v2/pokemon/';

/*************/
/** REQUESTS */
/*************/
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
                    console.log(err, 'Ce pokemon n\'existe pas');
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
                    console.log(err, 'Ce pokemon n\'existe pas');
                });
        });
}

function getTeamList(name) {
    fetch(baseRequest + name)
        .then( (response) => {
            response.json()
                .then( (data) => {
                    HTMLTeamList(data);
                })
                .catch(err => {
                    console.log(err, 'Ce pokemon n\'existe pas');
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

    createHTML([
        list,
        divImage
    ], divPokemon);

    createHTML([
        pokemonImage
    ], divImage);

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
function switchTab() {
    let tabs = document.querySelectorAll('.tab');
    tabs.forEach(element => {
        element.addEventListener('click', (event) => {
            let panel = document.querySelector(element.getAttribute('href'));
            tabs.forEach(element => {
                element.classList.remove('active');
            })
            document.querySelectorAll('.menu-item').forEach(element => {
                element.classList.remove('item-active');
            })
            panel.classList.add('item-active');
            element.classList.add('active');  
        })
    });
1}

function modalDetails(datas) {

    // Création des éléments
    let modalDiv = document.createElement('div');
    let modalDetails = document.createElement('div');
    let modalHead = document.createElement('div');
    let modalMenu = document.createElement('div');
    let aboutMenu = document.createElement('a');
    let evolutionMenu = document.createElement('a');
    let modalAbout = document.createElement('div');
    let modalEvolution = document.createElement('div');
    let pokeModalHead = document.createElement('div');
    let pokeModalHeadLeft = document.createElement('div');
    let pokeId = document.createElement('span');
    let pokeName = document.createElement('h2');
    let pokeImg = document.createElement('img');
    let pokeTypes = document.createElement('ul');
    let leaveModal = document.createElement('span');
    let addTeam = document.createElement('span');

    // Création des éléments types
    datas.types.map( (i) => {
        let typeItem =  document.createElement('li');
        typeItem.innerHTML = i.type.name;
        pokeTypes.appendChild(typeItem);
    })
   
    // Ajout des classes aux éléments
    modalHead.classList.add('modal-head');
    aboutMenu.classList.add('tab', 'active')
    evolutionMenu.classList.add('tab');
    modalAbout.classList.add('menu-item', 'item-active')
    modalEvolution.classList.add('menu-item')
    modalMenu.classList.add('modal-menu')
    modalDetails.classList.add('modal-details');
    pokeModalHead.classList.add('poke-head');
    leaveModal.classList.add('left-arrow');
    addTeam.classList.add('poke-add');
    modalDiv.classList.add('modal-container');
    
    // Set le contenu des éléments
    aboutMenu.innerHTML = 'About';
    aboutMenu.href = "#item-1";
    evolutionMenu.innerHTML = 'Evolution';
    evolutionMenu.href = '#item-2';
    modalAbout.id = 'item-1';
    modalEvolution.id = 'item-2';
    pokeName.innerHTML = datas.species.name;
    pokeId.innerHTML = `#${datas.id}`;
    pokeImg.setAttribute('src', datas.sprites.front_default);

    // Gestion des events
    leaveModal.addEventListener('click', () => {
        modalDiv.remove();
    });
    addTeam.addEventListener('click', () => {
        storeTeam(datas.species.name);
    });

    // Insertion du HTML
    createHTML([
        leaveModal, 
        addTeam     
    ],modalHead)

    createHTML([
        pokeName, 
        pokeTypes
    ], pokeModalHeadLeft)

    createHTML([
        pokeModalHeadLeft,
        pokeId
    ], pokeModalHead)

    createHTML([
        modalHead,
        pokeModalHead,
        pokeImg,
        modalDetails
    ], modalDiv)

    createHTML([
        modalMenu,
        modalAbout,
        modalEvolution
    ], modalDetails)
    
    createHTML([
        aboutMenu,
        evolutionMenu
    ], modalMenu)

    document.querySelector('body').insertBefore(modalDiv, document.querySelector('header'));
    switchTab();
}

function storeTeam(pokeName) {
    let team = localStorage.getItem('team');

    if (team.split(',').length <= 5 && localStorage.getItem('team').indexOf(pokeName) === -1) {
        if(team.length <= 0) {
            localStorage.setItem('team', pokeName);
            getTeamList(pokeName);
        } else {
            team = team + `,${pokeName}`;
            localStorage.setItem('team', team);
            getTeamList(pokeName);
        }
    }

    let currentTeam = localStorage.getItem('team');
    
}

function openNav() {
    console.log(document.querySelector('.team-list').classList);
    
    if(document.querySelector('.team-list').classList.contains('activ') ) {
        document.querySelector('.team-list').classList.remove('activ');
    } else {
        document.querySelector('.team-list').classList.add('activ');
        
    }
    
   /* let currentTeam = localStorage.getItem('team');
    

    currentTeam.split(',').map(teamMember => {
        getTeamList(teamMember);
    })*/
}

function HTMLTeamList(data) {
    
    let tmcard = document.createElement('div');
    let tmName = document.createElement('h2');
    let tmImg = document.createElement('img');

    tmName.innerHTML = data.name;
    tmImg.setAttribute('src', data.sprites.front_default);

    createHTML([
        tmName,
        tmImg
    ], tmcard)

    createHTML([
        tmcard
    ], document.querySelector('.team-list'))

}

function initApp() {
    getAllPokemon();
    localStorage.setItem('team', []);

    document.querySelector('.title').addEventListener('click', () => {
       /* if() {

        }*/
        openNav();
    });
}



initApp();


