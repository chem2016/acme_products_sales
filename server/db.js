const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
})

const Product = conn.define('product',{
    name: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.FLOAT
    },
    discount: {
        type: Sequelize.FLOAT
    },
    availability: {
        type: Sequelize.ENUM('instock', 'backordered', 'discontinued'),
        defaultValue: 'instock',
    }
})

const products = [
    {name: 'foo', price: 50.0, discount: 0.8, availability: 'instock'},
    {name: 'bazz', price: 60.0, discount: 0.7, availability: 'backordered'},
    {name: 'tank', price: 70.0, discount: 0.5, availability: 'discontinued'},
    {name: 'bed', price: 70.0, availability: 'discontinued'},
];

const syncAndSeed = () => {
    return conn.sync({force: true})
        .then(()=>{
            return Promise.all([products.map(product=>Product.create({
                name: product.name, 
                price: product.price,
                discount: product.discount,
                availability: product.availability,
            }))])
        })
}

module.exports = {
    syncAndSeed,
    Product,
}