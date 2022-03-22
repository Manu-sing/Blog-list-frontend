import React from 'react'
import './errorMessage.css'

const ErrorMessage = ({errorMessage}) => {
    if (errorMessage === null) {
        return null
      }
    
      return (
        <p className='error-message'>
          {errorMessage}
        </p>
      )
}

export default ErrorMessage