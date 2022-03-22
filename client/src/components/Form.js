import React from 'react'
import './form.css'


const Form = ({addBlog, title, handleTitle, author, handleAuthor, url, handleUrl, likes, handleLikes, status, handleStatus, formVisible, hideForm, showForm}) => {
  return (
    <> {formVisible === false ?
    null :
    <div className='form-container'>
        <div className='form-title'>
          <h2>Here you can add a new article to the list:</h2>
        </div>
        <div className='form-body'>
          <form onSubmit={addBlog}>
            <div>
              TITLE <input value={title} onChange={handleTitle}/>
            </div>
            <div>
              AUTHOR <input value={author} onChange={handleAuthor}/>
            </div>
            <div>
              LINK <input value={url} onChange={handleUrl}/>
            </div>
            <div>
              LIKES <input value={likes} onChange={handleLikes}/>
            </div>
            <div>
              STATUS <select value={status} onChange={handleStatus}>
                  <option value data-isdefault="true">-- Select --</option>
                  <option value="Read">Read</option>
                  <option value="Non Read">Non Read</option>
              </select> <button className="submit-btn" type="submit">Save</button>
            </div>
          </form> 
        </div> 
        <button onClick={hideForm}>close</button> 
      </div>  
    }
      
    </>
  )
}

export default Form