import React, {Component} from 'react'
import {Switch, Redirect, HashRouter as Router, Route } from 'react-router-dom'
import Nav from './Nav'
import CreateProduct from './CreateProduct'
import Products from './Products'
import Home from './Home'
import axios from 'axios'

class App extends Component{
    constructor(){
        super()
        this.state = {
            products: [],
            err: '',
        }
    }

    componentDidMount(){
        axios.get('/api/products')
            .then((response)=>{return response.data})
            .then((products)=>{this.setState({products})})
            .catch(err=>this.setState({err}))
    }


    // only need this function when the form and listing are on the same page using different states
    // addProduct = (product) => {
    //     this.setState( prevState => ({
    //         ...prevState,
    //         products: [...prevState.products, product]
    //       }))
    // }

    deleteProduct = () => {

    }

    render(){
        const {products} = this.state
        const sales = products.filter((product)=>{
            return product.discount !== null
        })
        return (
            <Router>
            <div>
                <hr />
                <h1>Acme Products/Sales</h1>
                {/* <Route component={Nav} /> */}
                <Route render={({location})=><Nav 
                    location={location} 
                    // productCount={products.length}
                    // saleCount={sales.length}
                    />}/>
                <Switch>
                    <Route exact path='/' render = { () => <Home />}/>
                    <Route exact path='/products' render = { () => <Products products={products}/>}/>
                    <Route exact path='/products/sales' render = { () => <Products products={sales} />}/>
                    <Route exact path='/products/create' render = { () => <CreateProduct addProduct={this.addProduct}/>}/>
                </Switch>
            </div>
            </Router>
        )
    }
}

export default App