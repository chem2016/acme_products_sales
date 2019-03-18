import React from 'react'
import { Link } from 'react-router-dom'

const Nav = (props) =>{
    const location = props.location
    const pathname = location.pathname
    const productCount = props.productCount
    const saleCount = props.saleCount
    const links = [
        {id: 1, name: 'Home', address: '/'},
        {id: 2, name: 'Products', address: '/products', count: productCount},
        {id: 3, name: 'Sales', address: '/products/sales', count: saleCount},
        {id: 4, name: 'Create', address: '/products/create'},
    ]
    return (
        <ul className='nav nav-tabs'>
            {
                links.map( link => {
                    return (
                        <li key={link.id} className='nav-item'>
                            <Link to={link.address} className={`nav-link${ link.address === pathname ? ' active ' : ''}`}>
                                {/* <span className='badge badge-primary'> */}
                                    {link.count !== undefined ? `${link.name} ${link.count}`: `${link.name}`}
                                {/* </span> */}
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}


export default Nav