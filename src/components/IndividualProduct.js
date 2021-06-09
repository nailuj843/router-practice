// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { useContext } from "react"
import { Link } from "react-router-dom"
import AppContext from '../context/AppContext'
const IndividualProducts = () => {
    const {selectedItem} = useContext(AppContext)
    const {addToCart} = useContext(AppContext)
    return (
        <div>
            <Link to=''>
            <h1 >This is where you would see some details for {selectedItem}</h1>
            
            </Link>

             <input id='itemQuantity' placeholder='quantitiy?' ></input>

            <button onClick={ addToCart(document.getElementById('itemQuantity'))}> add to Cart </button>

            <Link to='/checkout'>
            <button> checkout </button>
            </Link>
        </div>
    )
}

export default IndividualProducts