const request = require('request');

const weatherReport = (location, callback)=>{
    const baseUri = 'https://api.darksky.net/forecast/';
    const apikey = 'c6c32c28b7e947224c90788fb5749e4c';
    let requestparams = {
      uri:baseUri+ apikey + '/' + location.latitude + 
      ',' + location.longitute +'?units=auto',
      json:true, 
      };
      request(requestparams, (error,response,body={})=>{
        if(error){
          console.log('Facing issues while trying to connect wigh weather app');
          callback(error);
        } 
        else{
            callback(error,body);
        }});
  };

  module.exports = weatherReport;