import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signin } from '../actions/userActions'


const SigninScreen = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const userSignin = useSelector(state => state.userSignin)
    const {loading, userInfo, error } = userSignin
    const dispatch = useDispatch()

    useEffect(() => {
        if (userInfo) {
           props.history.push('/')
        }
    }, [userInfo, props.history])

    const handleSubmit = (e) => {
        
        dispatch(signin(email, password))
        e.preventDefault();
        setEmail('');
        setPassword('');
    }
    return (
        <div className="form">
        <form onSubmit={handleSubmit}>
            <ul className="form-container">
                <li>
                    <h2>Sign-In</h2>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input onChange={e => setEmail(e.target.value)}
                    type="email" 
                    name="email" 
                    id="email" 
                    autoComplete="false"
                    value={email}
                    />
                </li>
                <li>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input onChange={e => setPassword(e.target.value)}
                    type="password" 
                    name="password" 
                    id="password" 
                    autoComplete="false"
                    value={password}
                    />
                </li>
                <li>
                    <button type="submit" className="button primary">Sign In</button>
                </li>
                <li>
                    New to amazon?
                </li>
                <li>
                    <Link to="/signup" className="button secondary text-center">Create your amazon account</Link>
                </li>
            </ul>
        </form>
        </div>
    )
}

export default SigninScreen
