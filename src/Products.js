import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'

const Products = (props) =>{
    console.log(props)
    const products = props.products
    return (
        <ul>
            {
                products.map((product)=>{
                    return(
                        <li key={product.id} className='list-group-item'>
                            {product.name}<br/>
                            {/* <span style='text-decoration: line-through'> */}
                            {`$${product.price}`}<br/>
                            {/* </span> */}
                            {`$${product.price * product.discount}`}<br/>
                            {product.availability}<br/>
                            {
                                props.deleteProduct && 
                                <button className='remove' onClick={()=>{props.deleteProduct(product.id)}}>Delete</button>
                            }
                        </li>
                    )
                })
            }
        </ul>
    )
}


export default Products