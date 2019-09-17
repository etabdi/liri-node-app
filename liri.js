require('dotenv').config();

var fs = require('fs');

const keys = require("./keys.js");

const Spotify = require('node-spotify-api'); 

const spotify = new Spotify(keys.spotify);

const chalk = require('chalk')

const util = require('util');

const axios = require('axios'); 

var moment = require('moment');
        moment().format();

            var command = process.argv[2]; 

            var value = process.argv[3]; 

    var logFile = fs.createWriteStream('log.txt', { flags: 'a' });
    
        var logStdout = process.stdout;

            console.log = function () {
                
                    logFile.write(util.format.apply(null, arguments) + '\n');
                
                     logStdout.write(util.format.apply(null, arguments) + '\n');
                    
                }

                
if (command==="concert-this") {
   
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
  
     .then(function(result) {   
         
        for (var i = 0; i < result.data.length; i++) {

     var concert ="\nName of the venue: " + result.data[i].venue.name + "\nVenue Location: " + result.data[i].venue.city +"\nDate of the Event: " +result.data[i].datetime; 
                    
                    console.log(chalk.yellow("....................................................................................................................."));
           
                    console.log(concert);
        }
    })

}


if (command==="spotify-this-song") {
   
    if(!value){
             value = "The Sign";
       }
   
    spotify.search(
       
        { 
            type: 'track', 
            query: value 
       
        })
   
            .then(function(result) {

                     for (var i = 0; i < 3; i++) {

                          var spotify= "\nArtist(s): " + result.tracks.items[i].artists[0].name + "\nThe Song's Name: " + result.tracks.items[i].name +  "\n A Preview Link of the song from spotify: " + result.tracks.items[i].preview_url + "\nAlbum Name: " + result.tracks.items[i].album.name ;                      
                            
                                    console.log(chalk.red("....................................................................................................................."));           
                            
                                    console.log(spotify);
        }
    })

}

if (command==="movie-this") {


    if(!value){

         value = "mr nobody"; 
        
        }

      axios.get("https://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy")
           
            .then(function(result) {
        
                    var movieResults = "\nMovie Title: " + result.data.Title + "\nYear of Release: " + result.data.Year +"\nIMDB Rating: " + result.data.imdbRating +
                                    "\nRotten Tomatoes Rating: " + result.data.Ratings[1].Value +"\nCountry where the movie Produced: " + result.data.Country +
                                    "\nLanguage of the movie: " + result.data.Language +"\nPlot of the movie: " + result.data.Plot +"\nActors in the movie: " + result.data.Actors;
                           
                    
        console.log(chalk.blue("....................................................................................................................."));
        console.log(movieResults)

    })
     
}

if (command==="do-what-it-says"){
    var random=fs.readFileSync('random.txt', 'utf8');   
        console.log(random);
    
}
  

