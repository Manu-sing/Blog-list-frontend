import React from 'react'
import RenderSingle from './RenderSingle'
import './grid.css'

const RenderAll = ({blogs, toggleStatus, handleDelete}) => {
  return (
    <div className='grid'>
        {blogs.map(blog => 
          <RenderSingle 
          key={blog.id}
          title={blog.title}
          author={blog.author}
          url={blog.url}
          likes={blog.likes}
          status={blog.status}
          toggleStatus={() => toggleStatus(blog.id)}
          handleDelete={() => handleDelete(blog.id)}
          />  
            )}
    </div>
  )
}

export default RenderAll