import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div className="App">
       <nav>
           <ul>
                <Link to="/about">

                    <li>About</li>
                </Link>

                <Link to="/shop">
                    <li  >Shop</li>

                </Link>

           </ul>
       </nav>
       </div>
    )
}

export default Nav;