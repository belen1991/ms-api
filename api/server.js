const express = require('express')
const body_parser = require('body-parser')

const config = require('./config')
const routes = require('./network/routes')
const db = require('./db')

const server = require('http').Server(app)
const io = require('socket.io')(server)

var app = express()
db( config.DB_URL )

app.use( body_parser.json() )
app.use( body_parser.urlencoded({extended: false}) )
app.use('/', express.static('public'))

routes( app )

io.on('connection', function(socket){
    console.log('Nuevo cliente conectado.')
    socket.emit('mensaje', 'Bienvenido')
})

app.listen( config.PORT )
console.log(`La aplicacion se encuentra arriba en http://localhost:${config.PORT}/`)