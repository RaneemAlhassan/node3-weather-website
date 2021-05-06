const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { captureRejectionSymbol } = require('events')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialesPath = path.join(__dirname, '../templates/partiales')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirPath))
hbs.registerPartials(partialesPath)

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Raneem Alhassan'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Raneem Alhassan'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        message: 'Help message',
        name: 'Raneem Alhassan'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provid an adress.'
        })
    }

    geocode(req.query.address, (error,{latitude,longitude,location} = {}) =>{
        if(error){
            return res.send({
                error: error
            })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    
    })
})

app.get('/help/*', (req, res) => {
    res.render('page404',{
        title: 'Help/404 page',
        name: 'Raneem Alhassan',
        error: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('page404', {
        title: '404 page',
        name: 'Raneem Alhassan',
        error: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})