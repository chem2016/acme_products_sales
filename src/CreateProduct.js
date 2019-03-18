import React, {Component} from 'react'
import axios from 'axios'

class CreateProduct extends Component {
    constructor () {
        super()
        this.state = {
            name: '',
            price: 0,
            discount: 0,
            availability: 'instock',   
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {name, price, discount, availability} = this.state
        axios.post('/api/products',{
            name,
            price,
            discount,
            availability,
        })
            .then(response => response.data)
            .then(product => {
                this.props.addProduct(product)
                if(product.discount){
                    this.props.history.push('/products/sales')
                }else{
                    this.props.history.push('/products')
                }
            })
            .catch(err=>console.log(err))
    }

    handleChange = ({target}) => {
        this.setState({
            [target.name]: target.value
        }, ()=>console.log(this.state))
    }

    render(){
        const {name, price, discount, availability} = this.state
        return(
            <form onSubmit={this.handleSubmit}>
                <label htmlFor='name'>Name</label>
                <input 
                    name='name'
                    type='text'
                    value={name}
                    onChange={this.handleChange}
                /><br/>
                <label htmlFor='price'>Price</label>
                <input
                    name='price'
                    type='number'
                    value={price}
                    onChange={this.handleChange}
                /><br/>
                <label htmlFor='discount'>Discount Percentage</label>
                <input
                    name='discount'
                    type='number'
                    value={discount}
                    onChange={this.handleChange}
                /><br/>
                <label htmlFor='availability'>Availability</label>
                <select 
                    value={availability}
                    name='availability'
                    onChange={this.handleChange}
                    >
                    <option value="instock" >instock</option>
                    <option value="backordered">backordered</option>
                    <option value="discontinued">discontinued</option>
                </select>   
                <br/>
                <button type='submit'>Create</button>
            </form>
        )
    }
}

export default CreateProduct