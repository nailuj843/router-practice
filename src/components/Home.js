import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="App">
       <nav>
           <ul>
                <Link to="/about">

                    <li> <h1> About </h1> </li>
                </Link>

                <Link to="/products">
                    <li> <h1> Products</h1> </li>

                </Link>

                <Link to="/cart">
                    <li> <h1> Cart</h1> </li>

                </Link>

                <Link to="/checkout">
                    <li> <h1> Checkout</h1> </li>

                </Link>

           </ul>
       </nav>
       </div>
    )
}

export default Home;