import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = (props) => {

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1
    const dispatch = useDispatch()
    const handleRemoveFromCart = (productId) =>{ 
        dispatch(removeFromCart(productId))
    }
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
        return () => {
            //cleanup
        }
    }, [dispatch, productId, qty])

    const handleCheckOut = () => {
        //props.history.push("/checkout/)
        props.history.push("/signin?redirect=shipping") 
    }
    return (
        <div className="cart">
            <div className="cart-list">
                <ul className="cart-list-container">
                    <li>
                        <h3> Shopping Cart</h3>
                        <div>Price</div>
                    </li>
                    
                    {
                        cartItems.length === 0 ?
                        <div>
                            Cart is empty
                        </div>
                        :
                        cartItems.map(item=> 
                            <li key={item.product}>
                            <div className="cart-image">
                                <Link to={"/products/"+item.product}>
                                <img src={item.image} alt={item.name} title={item.name} />
                                </Link>
                            </div>
                            <div className="cart-name">
                                <Link to={"/products/"+item.product}>
                                    <div>{item.name}</div>
                                </Link>
                                
                                <div>
                                Qty: <select value={item.qty} onChange={(e)=>dispatch(addToCart(item.product, e.target.value))}>
                                        <option value="1">1</option> 
                                        <option value="2">2</option> 
                                        <option value="3">3</option> 
                                    </select>
                                    <button className="button" onClick={()=>handleRemoveFromCart(item.product)}>Delete</button>
                                </div>
                            </div>
                            
                            <div className="cart-price">
                                $ {item.price}
                            </div>
                         </li>
                        )
                    }
                    
                </ul>
            </div>
            <div className="cart-action">
                <h3>Subtotal ( {cartItems.reduce((a, c) => Number(a) + Number(c.qty), 0)} items)
                : $ {cartItems.reduce((a, c) => Number(a) + Number(c.price) * Number(c.qty), 0)}
                </h3>
                <button type="button" className="add-to-cart-button primary fullwidth" onClick={handleCheckOut} disabled={cartItems.length === 0 }>
                    Proceed to Checkout
                </button>
            </div>
        </div>
    )
}

export default CartScreen
