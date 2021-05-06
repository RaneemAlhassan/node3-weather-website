const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat +'&lon='+ lon +'&units=metric&appid=aa6a6458d300ccd968cdae56c7199065'

    request( {url, json: true}, (error,{body}) =>{

        if(error){
            callback('Unable to conect to the location services', undefined)
        } else if(body.message){
            callback('Unable to find location. Try another one.', undefined)
        }else{
            callback(undefined, 'It is currently '+ body.main.temp +' C. It is '+ body.weather[0].main + '.')
        }
    })
}

module.exports = forecast