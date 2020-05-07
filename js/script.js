// Constants

const baseUrl =  'https://johnrobertmahlan.github.io/'


// Variables

let userInput; // the user of this app should be able to enter any band to get information about that band

let name, bio;

let aside = false;

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

//This is the basic function that my app should run: when a band is entered, we access the API to get info about that band
function getBand(evt) {
    evt.preventDefault();
    
    userInput = $input.val();
    $input.val(''); // this will clear the search menu after the user searches for a band

    $.ajax({
        url:  'https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + userInput +'&api_key=32f924ae8e17d58763e024385d61626d&format=json'
    }).then(function(data) {
        name = data.artist.name;
        bio = data.artist.bio.summary;
        h1El.innerHTML = name;
        pEl.innerHTML = bio;
        
        // Generate a button to allow the user to find artists similar to the one they searched for
        let firstButtonEl = document.createElement('button');
        firstButtonEl.textContent = 'Similar Artists'
        firstButtonEl.addEventListener('click', function() {
            h3El.textContent = "Similar Artists";
            ulEl.innerHTML = '';

            for(let i=0; i<data.artist.similar.artist.length; i++) {
                let newLiElement = document.createElement('li');
                let similarName = data.artist.similar.artist[i].name;
                let similarLink = data.artist.similar.artist[i].url;
                newLiElement.innerHTML = `<a href="${similarLink}" target="_blank">${similarName}</a>`;
                ulEl.appendChild(newLiElement);
            }
        })
        divEl.appendChild(firstButtonEl);


        // Generate a button to allow the user to find the top albums from the artist they searched for
        let secondButtonEl = document.createElement('button');
        secondButtonEl.textContent = 'Top Albums'
        secondButtonEl.addEventListener('click', function() {
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
        });
        divEl.appendChild(secondButtonEl);


        // Generate a button to allow the user to find the top songs from the artist they searched for
        let thirdButtonEl = document.createElement('button');
        thirdButtonEl.textContent = 'Top Songs'
        thirdButtonEl.addEventListener('click', function() {
            h3El.textContent = `Top Songs by ${name}`;
            ulEl.innerHTML = '';

            $.ajax({
                url: 'https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=' + userInput +'&api_key=32f924ae8e17d58763e024385d61626d&format=json'
            }).then(function(songData)  {
                for(let k=0; k<songData.toptracks.track.length && k<5; k++) {
                    let newLiElement = document.createElement('li');
                    let topSongName = songData.toptracks.track[k].name;
                    newLiElement.innerHTML = `"${topSongName}"`;
                    ulEl.appendChild(newLiElement);
                }
            }, function(error)  {
                console.log(error);
            });
        });
        divEl.appendChild(thirdButtonEl);
    }, function(error) {
        console.log(error) 
    })
};