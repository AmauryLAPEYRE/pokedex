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
let limit = 50;
let offset = 0;
let pageNum = 1;

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

function getAllPokemon(limit, offset) {
    console.log(`${baseRequest}?limit=${limit}&offset=${offset}`);
    fetch(`${baseRequest}?limit=${limit}&offset=${offset}`)
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
        })
        .catch(err => console.log(err));
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
        let pokeInTeam = document.createElement('span');
        
        divPokemon.classList.add(items.name, "pokemon-card");
        pokeInTeam.classList.add('pokeball');
        name.innerHTML = items.name;

        createHTML([
            pokeInTeam,
            name
        ], divPokemon)

        createHTML([
            divPokemon
        ], document.querySelector('main'))

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
}

function modalDetails(datas) {
    
    // Création des éléments
    let modalDiv = document.createElement('div');
    let modalDetails = document.createElement('div');
    let modalHead = document.createElement('div');
    let modalMenu = document.createElement('div');
    let aboutMenu = document.createElement('a');
    let evolutionMenu = document.createElement('a');
    let appearanceMenu = document.createElement('a'); // menu item appearance
    let modalAbout = document.createElement('div');
    let modalEvolution = document.createElement('div');
    let modalAppearance = document.createElement('div'); // modal appearance zone 
    let pokeModalHead = document.createElement('div');
    let pokeModalHeadLeft = document.createElement('div');
    let pokeId = document.createElement('span');
    let pokeName = document.createElement('h2');
    let pokeImg = document.createElement('img');
    let pokeTypes = document.createElement('ul');
    let leaveModal = document.createElement('span');
    let addTeam = document.createElement('span');
    let teamStored = localStorage.getItem('team').length > 0 ? localStorage.getItem('team').split(',') : null;
   
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
    appearanceMenu.classList.add('tab')
    modalAbout.classList.add('menu-item', 'item-active')
    modalEvolution.classList.add('menu-item')
    modalAppearance.classList.add('menu-item');
    modalMenu.classList.add('modal-menu')
    modalDetails.classList.add('modal-details');
    pokeModalHead.classList.add('poke-head');
    leaveModal.classList.add('left-arrow');
    addTeam.classList.add('poke-add');
    modalDiv.classList.add('modal-container');
    datas.types.map(e => {modalDiv.classList.add(e.type.name)})
    if(teamStored !== null && teamStored.indexOf(datas.species.name) !== -1) {
        addTeam.classList.add('in-team')
    }
    
    // Set le contenu des éléments
    aboutMenu.innerHTML = 'About';
    aboutMenu.href = "#item-1";
    evolutionMenu.innerHTML = 'Base Stats';
    appearanceMenu.innerHTML = 'Appareance';
    evolutionMenu.href = '#item-2';
    appearanceMenu.href='#item-3';
    modalAbout.id = 'item-1';
    modalEvolution.id = 'item-2';
    modalAppearance.id = 'item-3';
    pokeName.innerHTML = datas.species.name;
    pokeId.innerHTML = `#${datas.id}`;
    pokeImg.setAttribute('src', `https://pokeres.bastionbot.org/images/pokemon/${datas.id}.png`);
  
    console.log(datas);
    /** PAGE ABOUT **/
    let pokeAbout = document.createElement('ul');
    let pokeHeight = document.createElement('li');
    let pokeWeight = document.createElement('li');
    let pokeAbilities = document.createElement('li');

    pokeAbout.classList.add('about-list');

    pokeHeight.innerHTML = `<span>Height</span> <p class="stat">${datas.height}</p>`;
    pokeWeight.innerHTML = `<span>Weight</span> <p class="stat">${datas.weight}</p>`;
    pokeAbilities.innerHTML = `<span>Abilities</span> <p class="stat">${datas.abilities.map(a => a.ability.name)}</p>`;
   
    createHTML([
        pokeHeight,
        pokeWeight,
        pokeAbilities
    ], pokeAbout);

    createHTML([
        pokeAbout
    ], modalAbout)
    /** END PAGE ABOUT **/

    /** PAGE BASE STATS **/
    let pokeStats = document.createElement('ul');

    datas.stats.map(e => {
        let itemList = document.createElement('li');
        itemList.innerHTML = `<span>${e.stat.name}</span> <p class="stat">${e.base_stat}</p>`;
    
        let progressBar = document.createElement('div');
        let action =document.createElement('div');
        progressBar.classList.add('progress-bar');
        action.classList.add('action');
        let percentToPixel = 150 * e.base_stat / 100;
        action.style.width = `${percentToPixel}px`;
        if (e.base_stat > 50 ) {
            action.classList.add('green');
        }

        createHTML([
            action
        ], progressBar)

        createHTML([
            progressBar
        ], itemList)

        createHTML([
            itemList
        ], pokeStats)
    })

    createHTML([
        pokeStats
    ], modalEvolution)
    
    /** END PAGE BASE STATS **/

    /** PAGE BASE APPAREANCE **/

    let corrArray = [
        'back_default',
        'back_female',
        'back_shiny',
        'back_shiny_female',
        'front_default',
        'front_female',
        'front_shiny', 
        'front_shiny_female'
    ]
    
    corrArray.map(imgName => {
        let itemList = document.createElement('img');
        if(datas.sprites[imgName] !== null) {
            itemList.setAttribute('src', datas.sprites[imgName]);
  
            createHTML([
                itemList
            ], modalAppearance)
        }
       
    });
    /** END PAGE BASE APPAREANCE **/

    // Gestion des events
    leaveModal.addEventListener('click', () => {
        modalDiv.remove();
    });

    addTeam.addEventListener('click', (e) => {
        
        if(!e.target.classList.contains('in-team')) {
            addTeam.classList.add('in-team');
            storeTeam(datas.species.name);
        } else {
            addTeam.classList.remove('in-team');
            unstoreTeam(datas.species.name);
        }
        
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
        modalEvolution,
        modalAppearance
    ], modalDetails)
    
    createHTML([
        aboutMenu,
        evolutionMenu,
        appearanceMenu
    ], modalMenu)

    document.querySelector('body')
        .insertBefore(modalDiv, document.querySelector('header'));

    switchTab();
}

function storeTeam(pokeName) {
    let team = localStorage.getItem('team');

    if (team.split(',').length <= 5 && localStorage.getItem('team').indexOf(pokeName) === - 1) {
        if(team.length <= 0) {
            localStorage.setItem('team', pokeName);
            getTeamList(pokeName);
        } else {
            team = team + `,${pokeName}`;
            localStorage.setItem('team', team);
            getTeamList(pokeName);
        }

        document.querySelector(`.pokemon-card.${pokeName} span.pokeball`).classList.add('in-team');
    }
}

function unstoreTeam(pokeName) {
    let currentTeam = localStorage.getItem('team').split(',');
    let pokeInTeam = document.querySelector(`.pokemon-container .${pokeName}`);

    currentTeam.splice(currentTeam.indexOf(pokeName), 1);
    document.querySelector(`.pokemon-card.${pokeName} span.pokeball`).classList.remove('in-team');
    pokeInTeam.remove();
    localStorage.setItem('team', currentTeam);

}

function openNav() {
    
    if(document.querySelector('.team-list').classList.contains('activ') ) {
        document.querySelector('.team-list').classList.remove('activ');
        document.querySelector('.container-team').classList.remove('activ-container-team');
    } else {
        document.querySelector('.team-list').classList.add('activ');
        document.querySelector('.container-team').classList.add('activ-container-team');
    }
 
}

function HTMLTeamList(data) {
    let tmCard = document.createElement('div');
    let tmName = document.createElement('h2');
    let tmImg = document.createElement('img');

    data.types.map(e => tmCard.classList.add(e.type.name));
    tmCard.classList.add('pokemon-card');
    tmCard.classList.add(data.species.name);
    tmName.innerHTML = data.name;
    tmImg.setAttribute('src', data.sprites.front_default);

    createHTML([
        tmName,
        tmImg
    ], tmCard)

    createHTML([
        tmCard
    ], document.querySelector('.pokemon-container'))

}

function nextPage() {
    
    let newOffset = 50*pageNum;
    pageNum = pageNum + 1;

    getAllPokemon(limit, newOffset);
}

function initApp() {

    getAllPokemon();

    localStorage.setItem('team', []);

    document.querySelector('.title').addEventListener('click', () => {
        openNav();
    });
}

initApp();

