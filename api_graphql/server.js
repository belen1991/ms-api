const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const { MongoClient } = require('mongodb');
const config = require('./config');

const mongoClient = new MongoClient(config.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoClient.connect().then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

let schema = buildSchema(`
    type Cliente {
        id: Int
        nombre: String
        telefono: String
    }
    type Query{
        clientes: [Cliente]
        cliente(id: Int): Cliente
    }
    type Mutation {
        addCliente(nombre: String, telefono: String): Cliente
    }
`)

let clientes = []
let counter = 1

let root = {
    clientes: async () => {
        const client = mongoClient.db('ups');
        const collection = client.collection('clientes');
        const result = await collection.find({}).toArray();
        return result;
    },
    cliente: async (data) => {
        const client = mongoClient.db('ups');
        const collection = client.collection('clientes');
        const result = await collection.findOne({id: data.id});
        return result;
    },
    addCliente: async (data) => {
        const client = mongoClient.db('ups');
        const collection = client.collection('clientes');
        const newCliente = {
            id: counter,
            nombre: data.nombre,
            telefono: data.telefono,
        };
    
        const result = await collection.insertOne(newCliente);
        counter ++;
        return newCliente;
    }
}

process.on('exit', () => {
    mongoClient.close();
});

let app = express()

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

let port = 4001
app.listen(port, ()=>{
    console.log(`Server started at http://localhost:${port}`)
})
    