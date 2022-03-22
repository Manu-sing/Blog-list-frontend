import React from 'react'

const AddBlogBtn = ({showForm}) => {
  return (
    <button onClick={showForm} className='add-blog-btn'>Add Blog</button>
  )
}

export default AddBlogBtn