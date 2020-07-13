import React,{useState, useEffect} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import DishPosts from './components/DishPosts'
import DishPost from './components/DishPost'
import dishData from './data/post_data'
import Navigate from './components/Navigate'
import NewDishPost from './components/NewDishPost'
import EditDishPost from './components/EditDishPost'

const App = () => {
  const [dishPosts, setDishPosts] = useState([])

  useEffect(() => {
    setDishPosts(dishData)
  },[])
  
  function getPostFromId(id) {
    return dishPosts.find((post) =>  post._id === parseInt(id))
}
function getNextId(){
  const ids = dishPosts.map((post) => post._id)
  return ids.sort()[ids.length-1] + 1
}

function addDishPost(post) {
  setDishPosts([...dishPosts, post])
}
function deleteDishPost(id) {
  const updatedPosts = dishPosts.filter((post) => post._id !== parseInt(id))
  setDishPosts(updatedPosts)
}
function updateDishPost(updatedPost) {
  const otherPosts = dishPosts.filter((post) => post._id !== updatedPost._id)
  setDishPosts([...otherPosts, updatedPost])
}
  return (
    <div >
        
          <h1>Many Mumbling Mice</h1>
          <BrowserRouter>
          <Navigate />
          <Route exact path="/" render={(props) => <DishPosts {...props} postData={dishPosts} /> } />
          {/* <Route exact path="/posts/:id" render={(props) => <DishPost {...props} post={getPostFromId(props.match.params.id)} /> } /> */}
          <Route exact path="/posts/new" render={(props) => <NewDishPost {...props} addDishPost={addDishPost} nextId={getNextId()}/> }/>
          <Route exact path="/posts/edit/:id" render={(props) => <EditDishPost {...props} updateDishPost={updateDishPost} post={getPostFromId(props.match.params.id)}/> }/>
          <Route exact path="/posts/:id" render={(props) => <DishPost {...props} post={getPostFromId(props.match.params.id)} showControls deleteDishPost={deleteDishPost}/> } />
        </BrowserRouter>
    </div>
  )
}


export default App