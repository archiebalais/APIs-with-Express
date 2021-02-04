const expressEjsLayouts = require('express-ejs-layouts')

require('dotenv').config()
// gives us access to variables in our .env
// see variables using provess.env
// console.log(process.env)
// console.log(process.env.API_KEY)

const express = require('express');
const app = express();
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


const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`listening on ${PORT}`))