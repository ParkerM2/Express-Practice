const express = require('express');
const mongojs = require('mongojs');
const app = express();

const databaseUrl = "zoo";
const collections = ["animals"];

const db = mongojs(databaseUrl, collections);

app.use(logger);

//app.use is expecting a function that calls
// (req,res,*next*)


app.get('/', (req, res, next) => {
    next()
    res.send("Home Page")
});

app.get('/users', (req, res) => {
    res.send('Users Page')
});

function logger(req ,res ,next) {
    db.animals.find({}, (err, data) => {
        let response = {
            data : data
        }
        
        response.data.map(animals => console.log(animals.name + ' Weighs ' + animals.weight + 'lbs '))
    })
    
    next();
}





app.listen(3000);