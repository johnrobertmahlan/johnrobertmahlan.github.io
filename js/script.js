// Constants




// Variables

let userInput; // the user of this app should be able to enter any band to get information about that band

let name; // when the user searches for a band, I want its name displayed in the main content



// Cached Elements

const $input = $('input[type="text"]')

const mainEl = document.getElementById('main');


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
        let newH1El = document.createElement('h1');
        newH1El.innerHTML  = data.artist.name;
        mainEl.appendChild(newH1El);
        let newpEl = document.createElement('p');
        newpEl.innerHTML = data.artist.bio.summary;
        mainEl.appendChild(newpEl);
    }, function(error) {
        console.log(error) 
    })
};