
import React from 'react'
import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Header from './components/Header'
import RenderAll from './components/RenderAll'
import Form from './components/Form'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import './App.css'
import loginService from './services/login'
import ErrorMessage from './components/ErrorMessage'


const App = () => {
  const [blogs, setNewBlogs] = useState([])
  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newUrl, setNewUrl] = useState("")
  const [newLikes, setNewLikes] = useState("")
  const [newStatus, setNewStatus] = useState("")
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const [formVisible, setFormVisible] = useState(false)
  

  useEffect(() => {
    console.log('effect')
    blogService
      .getAll()
      .then(initialBlogs => {
        console.log('promise fulfilled')
        setNewBlogs(initialBlogs)
      })
      .catch(error => {
        console.log('Failed fetching the blogs')
      })
  }, [])
  console.log('render', blogs.length, 'blogs')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleTitle = (e) => {
    setNewTitle(e.target.value)
  }

  const handleAuthor = (e) => {
    setNewAuthor(e.target.value)
  }

  const handleUrl = (e) => {
    setNewUrl(e.target.value)
  }

  const handleLikes = (e) => {
    setNewLikes(e.target.value)
  }

  const handleStatus = (e) => {
    setNewStatus(e.target.value)
  }

  const toggleStatus = (id) => {
    const blogToToggle = blogs.find(n => n.id === id)
    const changedStatus = blogToToggle.status === "Read" ? "Non Read" : "Read"
    const toggledBlog = { ...blogToToggle, status: changedStatus }

    blogService
    .update(id,toggledBlog)
    .then(returnedBlog => {
      setNewBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      setMessage("The status of the article was succesfully updated.")
      setTimeout(() => {
        setMessage(null)
      }, 4000);
  })
  }

  const handleDelete = (id) => {
    const blogToDelete = blogs.find(n => n.id === id)

    if(window.confirm(`Are you sure you want to delete the article "${blogToDelete.title}" from the list?`)) {
      blogService
      .removeBlog(id, blogToDelete)
      .then(() => {
        setNewBlogs(blogs.filter(blog => blog.id !== id))
        setMessage(`The article "${blogToDelete.title}" was succesfully deleted.`)
        setTimeout(() => {
          setMessage(null)
        }, 4000);
      })
      .catch(error => {
        console.log('Deletion failed')
      })
    }
  }

  const addBlog = (e) => {
    
    e.preventDefault()
    
    const blogObj = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes,
      status: newStatus
    }

    if(newTitle === "" || newAuthor === "" || newUrl === "") {
      alert("The fields 'title', 'author' and 'url' must be provided.")
    } else {
      blogService
      .create(blogObj)
      .then(returnedBlog => {
        setNewBlogs(blogs.concat(returnedBlog))
        setMessage("The article was succesfully added to the list.")
        setTimeout(() => {
          setMessage(null)
        }, 4000);
      })
      .catch(error => {
        console.log('Could not save the new article')
      })
    }

    resetForm()
  }

  const resetForm = () => {
    setNewTitle("")
    setNewAuthor("")
    setNewUrl("")
    setNewLikes("")
    setNewStatus("")
  }

  const blogsToShow = showAll
  ? blogs
  : blogs.filter(blog => blog.status === "Non Read")

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password. Try again.')
      setTimeout(() => {
        setMessage(null)
      }, 4000)
    }
  }

  const handleLogout = async () => {
    await window.localStorage.clear()
    setUser(null)
    setTimeout(() => {
      alert(`'${user.name}' has successfully logged out.`)
    }, 100);

  }

 
  const showLogin = () => {
    setLoginVisible(true)
  }

  const hideLogin = () => {
    setLoginVisible(false)
  }

  const loginDisplay = loginVisible === false ? 
  { display: 'none'} :
  { display: ''}


  const showForm = () => {
    if(user === null) {
      alert("You have to login first.")
    }
    setFormVisible(true)
  }

  const hideForm = () => {
    setFormVisible(false)
  }

  const formDisplay = formVisible === false ? 
  { display: 'none'} :
  { display: ''}


  return (
    <div>
      <div className='header-container'>
        <Header 
        text="MY FAVORITE ARTICLES"
        user={user}
        handleLogout={handleLogout}
        showLogin={showLogin}
        showForm={showForm}
        />
      </div>
      {user === null ?
      <div className='loginForm-wrapper' style={loginDisplay}>
      <LoginForm 
      username={username}
      handleUsername={handleUsername}
      password={password}
      handlePassword={handlePassword}
      handleLogin={handleLogin}
      hideLogin={hideLogin}
      />
      <ErrorMessage className='error-msg' errorMessage={errorMessage} />
      </div> : 
        <div className='form-wrapper' style={formDisplay}>
          <Form 
          addBlog={addBlog}
          title={newTitle}
          handleTitle={handleTitle}
          author={newAuthor}
          handleAuthor={handleAuthor}
          url={newUrl}
          handleUrl={handleUrl}
          likes={newLikes}
          handleLikes={handleLikes}
          status={newStatus}
          handleStatus={handleStatus}
          showForm={showForm}
          hideForm={hideForm}
          />
      </div>
        }
      <hr/>
      <div className='body'>
        <div className='filter'>
          {!blogs.length ? 
          null : 
          <button className="filter-btn" onClick={() => setShowAll(!showAll)}>
            Show {showAll ? 'only "Non Read"' : 'All' }
          </button> 
          }
        </div>
        <Notification message={message} />
        <RenderAll 
        blogs={blogsToShow}
        toggleStatus={toggleStatus}
        handleDelete={handleDelete}
        />
      </div>
    </div>
  )
}

export default App