import axios from 'axios'
const baseUrl = 'http://localhost:3003/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const removeBlog = (id, Obj) => {
    const request = axios.delete(`${baseUrl}/${id}`, Obj)
    return request.then(response => response.data)
}

export default { getAll, create, update, removeBlog }