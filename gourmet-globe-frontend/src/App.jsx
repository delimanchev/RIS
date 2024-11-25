import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListRecipeComponent from './components/ListRecipeComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RecipeComponent from './components/RecipeComponent'
import RecipeCardsComponent from './components/RecipeCardsComponent';
import RecipeDetailComponent from './components/RecipeDetailComponent'; 


function App() {
  return (
    <>
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        {/* Admin Panel Routes */}
        <Route path='/admin-panel/recipes' element={<ListRecipeComponent />} />
        <Route path='/admin-panel/add-recipe' element={<RecipeComponent />} />
        <Route path='/admin-panel/edit-recipe/:id' element={<RecipeComponent />} />
        {/* User route for viewing recipes in cards */}
        <Route path="/recipes" element={<RecipeCardsComponent />} />
        <Route path="/recipe/:id" element={<RecipeDetailComponent />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
    </>
  );
}

export default App;
