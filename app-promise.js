
const yargs = require('yargs');
const axios = require('axios');

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

var encodeaddress = encodeURIComponent(argv.address);
var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeaddress}&key=AIzaSyA5Ik7ozBLKQddCRHjS3Lrj4r1z2B4dk9c`

axios.get(url).then((response) => {
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that address');  
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherurl =`https://api.darksky.net/forecast/efc9e931fd6141bfaef222a34357fb08/${lat},${lng}?units=si`;
    console.log(response.data.results[0].formatted_address);

    return axios.get(weatherurl);

    }).then((response) => {
        let temperature = response.data.currently.temperature;
        let apptemperature = response.data.currently.apparentTemperature;
        console.log('Temperature :',temperature);
        console.log('Apparent Temperature :', apptemperature);

    }).catch((e) =>{
    if(e.code === 'ENOTFOUND'){
        console.log('Unable to connect to API server')
    }else{
        console.log(e.message);
    }
});