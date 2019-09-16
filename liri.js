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

if (command==="spotify-this-song") {
   
    if(!value){
             value = "The Sign";
       }
   
    spotify.search(
       
        { 
            type: 'track', 
            query: value 
       
        })
   
            .then(function(response) {

                     for (var i = 0; i < 5; i++) {

                          var spotify= 
                                           
                                    "\nArtist(s): " + response.tracks.items[i].artists[0].name + "\nThe Song's Name: " + response.tracks.items[i].name +  "\n A Preview Link of the song from spotify: " + response.tracks.items[i].preview_url + "\nAlbum Name: " + response.tracks.items[i].album.name ;                      
                            
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
           
            .then(function(response) {
        
                    var movieResults = 
                                    "\nMovie Title: " + response.data.Title + "\nYear of Release: " + response.data.Year +"\nIMDB Rating: " + response.data.imdbRating +
                                    "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +"\nCountry where the movie Produced: " + response.data.Country +
                                    "\nLanguage of the movie: " + response.data.Language +"\nPlot of the movie: " + response.data.Plot +"\nActors in the movie: " + response.data.Actors;
                           
                    
        console.log(chalk.blue("....................................................................................................................."));
        console.log(movieResults)

    })
     
}

if (command==="concert-this") {
   
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
  
     .then(function(response) {   
         
        for (var i = 0; i < response.data.length; i++) {

            var date = response.data[i].datetime;

            var dateArr = date.split('T'); 
            
                var concert =   

                    "\nName of the venue: " + response.data[i].venue.name + "\nVenue Location: " + response.data[i].venue.city +"\nDate of the Event: " + moment(dateArr[0], "MM-DD-YYYY"); 
                    
                    console.log(chalk.yellow("....................................................................................................................."));
           
                    console.log(concert);
        }
    })

}

if (command==="do-what-it-says"){
    var random=fs.readFileSync('random.txt', 'utf8');   
        console.log(random);
    
}
  

