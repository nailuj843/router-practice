// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { useContext } from "react"
import { Link } from "react-router-dom"
import AppContext from '../context/AppContext'
const Products = () => {
    const {selectedItem} = useContext(AppContext)
    const {setSelectedItem} = useContext(AppContext)
    console.log(setSelectedItem)
    return (
        <div>
            <Link to=''>
            <h2 >This is where you would see a list of items</h2>
            
            </Link>

            <Link to='/individualProduct' onClick={setSelectedItem('shirt')}>
                <h1> shirt </h1>
            </Link>

            <Link to='/individualProduct'>
                <h1> pants </h1>
            </Link>

            <Link to='/individualProduct'>
                <h1> glasses </h1>
            </Link>

            <Link to='/individualProduct'>
                <h1> drink </h1>
            </Link>
        </div>
    )
}

export default Products