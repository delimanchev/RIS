
import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListRecipeComponent from './components/ListRecipeComponent'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import RecipeComponent from './components/RecipeComponent'

function App() {

  return (
    <>
    <BrowserRouter>
    <HeaderComponent />
     <Routes>
      {/* // http://localhost:3000 */}
      <Route path='/' element = {<ListRecipeComponent />}></Route>
      {/* // http://localhost:3000/recipes */}
      <Route path='/recipes' element = {<ListRecipeComponent />}></Route>
      {/* // http://localhost:3000/add-recipe */}
      <Route path='/add-recipe' element = {<RecipeComponent />}></Route>
            {/* // http://localhost:3000/edit-recipe/id */}
      <Route path='/edit-recipe/:id' element = {<RecipeComponent />}></Route>

     </Routes>
    <FooterComponent />
    </BrowserRouter>
    </>
  )
}

export default App
