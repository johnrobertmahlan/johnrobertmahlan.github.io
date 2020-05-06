// Constants




// Variables




// Cached Elements




// Event Listeners

$('form').on('submit', getBand);




// Functions

function getBand(evt) {
    evt.preventDefault();
    $.ajax({
        url: 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Radiohead&api_key=32f924ae8e17d58763e024385d61626d&format=json'
    }).then(function(data) {
        console.log(data);
    }, function(error) {
        console.log(error)
    })
};