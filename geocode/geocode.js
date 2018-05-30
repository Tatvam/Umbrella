const request = require('request');

const geocodeAddress = (address,callback) => {
    const encodeaddress = encodeURIComponent(address);
//console.log(argv);

request({
    url : `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeaddress}&key=AIzaSyA5Ik7ozBLKQddCRHjS3Lrj4r1z2B4dk9c`,
    json: true
},(error,response,body)=>{
   // console.log(JSON.stringify(response,undefined,2));
   if(error){
       callback('Unable to connect to Google Servers');
   }
   else if(body.status ==='ZERO_RESULTS'){
       callback('Enter correct address or zipCode');
   }
   else if(body.status === 'OK'){
       callback(undefined,{
            Address : body.results[0].formatted_address,
            Latitude : body.results[0].geometry.location.lat,
            Longitude : body.results[0].geometry.location.lng
       });
   }
});
}



module.exports = {
    geocodeAddress: geocodeAddress
}
// efc9e931fd6141bfaef222a34357fb08 