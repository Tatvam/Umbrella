const request = require('request');
const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

const argv = yargs
            .options({
                a : {
                    demand: true,
                    string: true,
                    alias: 'address',
                    describe: 'Address to fetch weather for'
                }
            })
            .help()
            .alias('help','h')
            .argv;

geocode.geocodeAddress(argv.address , (errorMessage,results) =>{
        if(errorMessage){
            console.log(errorMessage);
        }else{
            console.log(results.Address);
            weather.getWeather(results.Latitude,results.Longitude,(errorMessage,weatherresults) => {
                if(errorMessage){
                    console.log(errorMessage);
                }else{
                    console.log(JSON.stringify(weatherresults,undefined,2));
                }
            });
        }
});

//lat,lng
