require("dotenv").config();

const keys = require('./keys.js');
const Spotify = require('node-spotify-api');
const request = require('request');

const spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET,
});


const userCommand = process.argv[2];
let secondCommand = process.argv[3];

for (i = 4; i < process.argv.length; i++) {
    secondCommand += '+' + process.argv[i];
}

function mainSwitch() {
    //action statement, switch statement to declare what action to execute.
    switch (userCommand) {

        case 'concert-this':
            conertThis();
            break;

        case 'spotify-this-song':
            spotifyFind();
            break;

        case 'movie-this':
            movieThis();
            break;

        case 'do-what-it-says':
            doWhatItSays();
            break;

    }
};

function spotifyFind() {
    spotify.search({ type: 'track', query: `${secondCommand}` }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }



        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("Preview Here: " + data.tracks.items[0].preview_url);
    });
}

function conertThis() {
    const concertSearch = `https://rest.bandsintown.com/artists/${secondCommand}/events?app_id=codingbootcamp`

    request(concertSearch, function (err, response, data) {
        if (!err && response.statusCode === 200) {

            console.log(JSON.parse(data));
        }

    })
}

function movieThis() {
    var movieSearch = `http://www.omdbapi.com/?apikey=trilogy&t=${secondCommand}&r=json`;

    console.log(movieSearch);

    request(movieSearch, function(err, response, data) {
        if(!err && response.statusCode == 200){
        console.log("Title: " + JSON.parse(data)["Title"]);
        }
    })

}

mainSwitch()