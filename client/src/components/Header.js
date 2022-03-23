import React from 'react'
import AddBlogBtn from './AddBlogBtn'

const Header = ({text, user, handleLogout, showLogin, showForm}) => {
    return (
      <>
          <div className="header">
            <h1>{text}</h1>
          </div>
          <div className='header-menu'>
            <div>
              <AddBlogBtn showForm={showForm} />
            </div>
            {user === null ?
            <div>
            <button className='login-header-btn' onClick={showLogin}>Login</button>
            </div> :
            <div>
              <button className='login-header-btn' onClick={handleLogout}>Logout '{user.name}'</button>
            </div>}
          </div>
        </>
    )
  }
  
  export default Header