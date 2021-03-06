import React from 'react';
import './App.css';
import {Route, HashRouter, Link} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import SignupScreen from './screens/SignupScreen';
import ProductsScreen from './screens/ProductsScreen';


function App() {
  const userSignin = useSelector(state => state.userSignin)
  const {userInfo} = userSignin

  const openSideMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeSideMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }

  return (
    <HashRouter>
      <div className="grid-container">
        <header className="header">
            <div className="brand">
                <button onClick={openSideMenu}>
                    &#9776;
                </button>
                <Link to="/">amazon-clone</Link>
            </div>
            <div className="header-nav">
              <Link to="/cart">Cart</Link>
              {userInfo ? <Link to="/profile">Hi, {userInfo.name}</Link> :
              <Link to="/signin">Sign In</Link>}
              
            </div>  
        </header>
        <aside className="sidebar">
            <h3>Shopping Categories</h3>
            <button className="sidebar-close-button" onClick={closeSideMenu}>x</button>
            <ul>
                <li><a href="index.html">Pants</a></li>
                <li><a href="index.html">Shirts</a></li>
            </ul>
        </aside>
        <main className="main">
            <div className="content">
              <Route path="/products" component={ProductsScreen} />
              <Route path="/products/:id" component={ProductScreen} />
              <Route path="/cart/:id?" component={CartScreen} />
              <Route path="/" exact={true} component={HomeScreen} />
              <Route path="/signin" component={SigninScreen} />
              <Route path="/signup" component={SignupScreen} />

                
            </div>
        </main>
        <footer className="footer">All right reserved</footer>
      </div>
    </HashRouter>
  );
}

export default App;
