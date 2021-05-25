import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signup } from '../actions/userActions'


const SignupScreen = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRePassword] = useState('')
    const userSignup = useSelector(state => state.userSignup)
    const {loading, userInfo, error } = userSignup
    const dispatch = useDispatch()

    useEffect(() => {
        if (userInfo) {
           props.history.push('/')
        }
    }, [userInfo, props.history])

    const handleSubmit = (e) => {
        
        dispatch(signup(name, email, password))
        e.preventDefault();
        setName('');
        setEmail('');
        setPassword('');
        setRePassword('');
    }
    return (
        <div className="form">
        <form onSubmit={handleSubmit}>
            <ul className="form-container">
                <li>
                    <h2>Create an account</h2>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input onChange={e => setName(e.target.value)}
                    type="text" 
                    name="name" 
                    id="name" 
                    autoComplete="false"
                    value={name}
                    />
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
                    <label htmlFor="repassword">
                        Re-Password
                    </label>
                    <input onChange={e => setRePassword(e.target.value)}
                    type="password" 
                    name="repassword" 
                    id="repassword" 
                    autoComplete="false"
                    value={repassword}
                    />
                </li>
                <li>
                    <button type="submit" className="button primary">Sign Up</button>
                </li>
                <li>
                    Already have an account? <Link to="/signin">Sign-In</Link>
                </li>
            </ul>
        </form>
        </div>
    )
}

export default SignupScreen
