// Constants

const baseUrl =  'https://johnrobertmahlan.github.io/'


// Variables

let userInput;

let name, bio, bandData;


// Cached Elements

const $input = $('input[type="text"]')

const mainEl = document.getElementById('main');

const h1El = document.getElementById('greeting');

const pEl = document.getElementById('bio');

const divEl = document.getElementById('buttons');

const h3El = document.getElementById('extra');

const ulEl = document.getElementById('display');


// Event Listeners

$('form').on('submit', getBand);



// Functions

// This is what I want to be displayed when a user first navigates to the site
function init() {
    h1El.innerHTML = "Welcome to NextMusic!";
    pEl.innerHTML = "Search for an artist above and learn more about them!"
};

init();

//This is the basic function that my app runs: a user enters a musician and the app accesses the API for information about that musician
function getBand(evt) {
    evt.preventDefault();
    
    userInput = $input.val();
    $input.val(''); // this will clear the search menu after the user searches for a band

    $.ajax({
        url:  'https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + userInput +'&api_key=32f924ae8e17d58763e024385d61626d&format=json'
    }).then(function(data) {
        bandData = data; // assign data to a global variable for access in the render function
        render();
    }, function(error) {
        console.log(error);
    })
};

// When the API is accessed, this function is called - it displays biographical information about the musician the user searched for
// This function also generates three buttons with event listeners attached so the user can learn more about the artist they selected
function render() {
    name = bandData.artist.name;
    bio = bandData.artist.bio.summary;
    h1El.innerHTML = name;
    pEl.innerHTML = bio;
    divEl.innerHTML = '';
    h3El.textContent = '';
    ulEl.innerHTML = '';

    // Generate a button to allow the user to find artists similar to the one they searched for
    firstButtonEl = document.createElement('button');
    firstButtonEl.textContent = 'Similar Artists';
    firstButtonEl.addEventListener('click', findSimilarArtists);
    divEl.appendChild(firstButtonEl);

    // Generate a button to allow the user to find the top albums from the artist they searched for
    secondButtonEl = document.createElement('button');
    secondButtonEl.textContent = 'Top Albums';
    secondButtonEl.addEventListener('click', findTopAlbums);
    divEl.appendChild(secondButtonEl);

    // Generate a button to allow the user to find the top songs from the artist they searched for
    thirdButtonEl = document.createElement('button');
    thirdButtonEl.textContent = 'Top Songs';
    thirdButtonEl.addEventListener('click', findTopSongs);
    divEl.appendChild(thirdButtonEl);
};

// This function searches the API database and generates a list of 5 artists similar to the artist the user searched for
function findSimilarArtists() {
    h3El.textContent = "Similar Artists";
    ulEl.innerHTML = '';
    for(let i=0; i<bandData.artist.similar.artist.length; i++) {
        let newLiElement = document.createElement('li');
        let similarName = bandData.artist.similar.artist[i].name;
        let similarLink = bandData.artist.similar.artist[i].url;
        newLiElement.innerHTML = `<a href="${similarLink}" target="_blank">${similarName}</a>`;
        //newLiElement.addEventListener('click', updateSearch); I wanted to set a new listener here that would basically update the value of userInput to whichever artist the user clicked, thereby keeping them on my site instead of sending them to last.fm, but it broke my app
        ulEl.appendChild(newLiElement);
    }
};


// This function runs a new AJAX request to find the top 5 albums in the API's database associated with the artist entered by the user
function findTopAlbums() {
    h3El.textContent = `Top Albums by ${name}`;
    ulEl.innerHTML = '';
    $.ajax({
        url: 'https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=' + userInput +'&api_key=32f924ae8e17d58763e024385d61626d&format=json'
    }).then(function(albumData) {
        for(let j=0; j<albumData.topalbums.album.length && j<5; j++) {
            let newLiElement = document.createElement('li');
            let topAlbumName = albumData.topalbums.album[j].name;
            let topAlbumLink = albumData.topalbums.album[j].url;
            newLiElement.innerHTML =  `<a href="${topAlbumLink}" target="_blank">${topAlbumName}</a>`;
            ulEl.appendChild(newLiElement);
        }
    }, function(error) {
        console.log(error);
    });
};


// This function runs a new AJAX request to find the top 5 songs in the API's database associated with the artist entered by the user
function findTopSongs() {
    h3El.textContent = `Top Songs by ${name}`;
    ulEl.innerHTML = '';
    $.ajax({
        url: 'https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=' + userInput +'&api_key=32f924ae8e17d58763e024385d61626d&format=json'
    }).then(function(songData)  {
        for(let k=0; k<songData.toptracks.track.length && k<5; k++) {
            let newLiElement = document.createElement('li');
            let topSongName = songData.toptracks.track[k].name;
            newLiElement.innerHTML = `"<a href="https://www.youtube.com/results?search_query=${userInput}${topSongName}" target="_blank">${topSongName}</a>"`;
            ulEl.appendChild(newLiElement);
        }
    }, function(error)  {
        console.log(error);
    });
};