const express = require('express');
const app = express();
const path = require('path');
const { syncAndSeed, Product } = require('./db')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000;

// app.use(bodyParser.urlencoded( { extended: true } ))
app.use(bodyParser.json())
app.get('/app.js', (req, res, next)=> res.sendFile(path.join(__dirname, '../dist', 'main.js')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, '../index.html')));

app.get('/api/products',(req, res, next)=>{
    Product.findAll({
    })
    .then( products => res.send(products))
    .catch(next)
})

// need work
app.post('/api/products',(req, res, next)=>{
    //console.log("req.body.name", req.body.name)
    Product.create(
        {
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            availability: req.body.availability,
        }
    )
    .then(product=> res.send(product))
    .catch(next)
})

app.delete('/api/products/:id',(req, res, next)=>{
    console.log('delete', req.params.id)
    Product.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => res.status(204).end()) // ??HY why end()?
    // .then(()=> console.log('hELLO'))
    .catch(next)
})

syncAndSeed()
    .then(()=>{app.listen(port, ()=> console.log(`listening on port ${port}`))})

