const request = require('request');


const getWeather = (lat,lng,callback) => {
    request({
        url : `https://api.darksky.net/forecast/efc9e931fd6141bfaef222a34357fb08/${lat},${lng}?units=si`,
        json: true
    },(error,response,body)=>{
       // console.log(JSON.stringify(response,undefined,2));
       if(!error && response.statusCode === 200){
           callback(undefined,{
               Temperature : body.currently.temperature,
               Apparent_Temperature : body.currently.apparentTemperature
           });
       }else {
           callback('Unable to fetch weather')
       }
    });
};

module.exports = {
    getWeather : getWeather
}
