// Constants




// Variables

let userInput; // the user of this app should be able to enter any band to get information about that band

let name, bio;

// Cached Elements

const $input = $('input[type="text"]')

const mainEl = document.getElementById('main');

const h1El = document.getElementById('greeting');

const pEl = document.getElementById('bio');

const divEl = document.getElementById('buttons');


// Event Listeners

$('form').on('submit', getBand);




// Functions

//This is the basic function that my app should run: when a band is entered, we access the API to get info about that band
function getBand(evt) {
    evt.preventDefault();
    
    userInput = $input.val();
    $input.val(''); // this will clear the search menu after the user searches for a band

    $.ajax({
        url:  'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + userInput +'&api_key=32f924ae8e17d58763e024385d61626d&format=json'
    }).then(function(data) {
        name = data.artist.name;
        bio = data.artist.bio.summary;
        h1El.innerHTML = name;
        pEl.innerHTML = bio;
        

        let firstButtonEl = document.createElement('button');
        firstButtonEl.textContent = 'Find Similar Artists!'
        divEl.appendChild(firstButtonEl);
        let secondButtonEl = document.createElement('button');
        secondButtonEl.textContent = `Find  ${name}'s  Top Albums!`
        divEl.appendChild(secondButtonEl);
        let thirdButtonEl = document.createElement('button');
        thirdButtonEl.textContent = `Find ${name}'s Top Tracks!`
        divEl.appendChild(thirdButtonEl);
    }, function(error) {
        console.log(error) 
    })
};