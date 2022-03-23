import React from 'react'
import './grid.css'
import { FaRegThumbsUp } from "react-icons/fa"


const RenderSingle = ({title, author, url, likes, status, toggleStatus, handleDelete, addALike}) => {
    const label = status === "Read" ? "Mark 'Non Read'" : "Mark 'Read'"
  return (
    <div className='grid-item'>
        <div className='item-info'>
          <h2 className='title'>{title}</h2>
          <hr/>
          <p className='article-info'><strong>Author:</strong> {author}</p>
          <p className='article-info'><strong>Link:</strong> <a href={url}>{url}</a></p>
          <p className='article-info'><strong>Likes:</strong> {likes} <button className="status-btn" onClick={addALike}>< FaRegThumbsUp /></button></p> 
          <p className='article-info'><strong>Status:</strong> {status} <button className="status-btn" onClick={toggleStatus}>{label}</button></p>
        </div>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default RenderSingle