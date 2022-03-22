import React from 'react'
import './form.css'

const LoginForm = ({handleLogin, username, handleUsername, password, handlePassword, hideLogin}) => {
  return (
    <div className='loginForm-container'>
        <div className='loginForm-body'>
            <form onSubmit={handleLogin}>
                <div>
                username <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={handleUsername}
                />
                </div>
                <div>
                password <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={handlePassword}
                />
                </div>
                <button className='login-btn' type="submit">login</button> 
            </form>
                <button className='login-btn' onClick={hideLogin}>close</button> 
      </div>
    </div>
  )
}

export default LoginForm