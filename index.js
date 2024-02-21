// Configuração Inicial
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();  // Importanto o pacote responsáivel pelas variáveis de ambiente.
const app = express()

const Person = require('./models/Person')
const Admin = require('./models/Admin')

// Forma de Ler JSON / Middlewares
// Configuração Inicial para permitir a leitura de JSON
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

// Rotas da API:

// Rota Inicial Get / EndPoint
app.get('/', (req, res) => {
    res.json({message: 'Hello World 3!'})
})

// Rota Post de Pessoa
app.post('/person/create', async (req, res) => {
    const { name, salary, approved } = req.body

    const person = {
        name,
        salary,
        approved
    }

    if (!name || !salary){
        res.status(422).json({ message: 'Todos os campos são obrigatórios' })
    }

    try{
        await Person.create(person);
        res.status(201).json({ message: 'Pessoa Criada com Sucesso.' })
    } catch(error){
        res.status(500).json({ error: error });
    }

})

// Rota Post de Admin
app.post('/admin/create', async (req, res) => {
    const { name, age, role } = req.body

    const admin = {
        name,
        age,
        role
    }

    if (!name || !age || !role){
        res.status(422).json({ message: "Todos os campos são necessários!" })
    }

    try{
        await Admin.create(admin);

        res.status(201).json({ message: 'Admin criado com sucesso!' })
    } catch(error){
        res.status(500).json({ error: error })
    }
})


// Entregar uma Porta
// Fazer a Conexão com o MongoDB
const DB_USER =  process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@firstdb.h7xha7y.mongodb.net/?retryWrites=true&w=majority&appName=FirstDB`
).then(() => {
    // Se tudo der certo.
    console.log('Conectamos ao MongoDB!')
    app.listen(3000)
}).catch((error) => {
    // Se algo der errado.
    console.log(error)
})
