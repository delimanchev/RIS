import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListRecipeComponent from './components/ListRecipeComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RecipeComponent from './components/RecipeComponent'
import RecipeCardsComponent from './components/RecipeCardsComponent';
import RecipeDetailComponent from './components/RecipeDetailComponent'; 
import GlobeComponent from "./Globe.jsx";

function App() {
  return (
    
    <>
    
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        {}
        <Route path='/admin-panel/recipes' element={<ListRecipeComponent />} />
        <Route path='/admin-panel/add-recipe' element={<RecipeComponent />} />
        <Route path='/admin-panel/edit-recipe/:id' element={<RecipeComponent />} />
        {}
        <Route path="/recipes" element={<RecipeCardsComponent />} />
        <Route path="/recipe/:id" element={<RecipeDetailComponent />} />
        <Route path="/" element={<GlobeComponent />} />

      </Routes>
      <FooterComponent />
    </BrowserRouter>
    </>
  );
}

export default App;