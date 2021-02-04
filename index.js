const expressEjsLayouts = require('express-ejs-layouts')

require('dotenv').config()
// gives us access to variables in our .env
// see variables using provess.env
// console.log(process.env)
// console.log(process.env.API_KEY)


// REQUIRE STATEMENTS
const express = require('express');
const app = express();
const axios = require('axios');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

// MIDDLEWARE 
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

// ROUTES
app.get('/', (req, res) => {
    res.send('hi');
})

app.get('/omdb', (req, res)=> {
    const qs= {
        params: {
            s: 'star wars',
            apikey: process.env.API_KEY
        }
    }
    // http://www.omdbapi.com/?s=star+wars&apikey=OUR+key
    axios.get('http://www.omdbapi.com', qs)
    .then((response)=> {
        console.log(response.data)
    })
})

// with SWAPI api
app.get('/swapi/search', (req, res) => {
    res.render('search')
})

app.get('/swapi/show', (req, res) => {
    console.log('made it here')

    console.log('query', req.query)
    // basic api call to get a person
    axios.get(`https://swapi.dev/api/people/${req.query.personId}`)
    .then((response) => {
        // response.data is where our data lives
        console.log(response.data)
        const person = {
            name: response.data.name,
            birth: response.data['birth_year'],
            home: response.data.homeworld
        }
        res.render('show', person)
    })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`listening on ${PORT}`))