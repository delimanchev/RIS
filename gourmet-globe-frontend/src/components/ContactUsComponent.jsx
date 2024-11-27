import React from 'react';
import { useParams } from 'react-router-dom'; 
import { getRecipe } from '../services/RecipeService'; 
import '../css/ContactUsComponent.css'; // Make sure to link the CSS file

const ContactUsComponent = () => {
  const { id } = useParams(); 
  const [recipe, setRecipe] = React.useState(null);

  React.useEffect(() => {
    if (id) {
      getRecipe(id) // Fetch recipe if there's an ID in the URL
        .then((response) => {
          setRecipe(response.data); 
        })
        .catch((error) => {
          console.error('Error fetching recipe details:', error);
        });
    }
  }, [id]);

  return (
    <div className="contact-us-container">
      <div className="card">
        <h2>Contact Us</h2>
        <p>Send your recipe ideas via email including the following information:</p>
        {recipe && (
          <div className="recipe-details">
            <p><strong>Recipe Name:</strong> {recipe.recipeName}</p>
            <p><strong>Country:</strong> {recipe.recipeCountry}</p>
            <p><strong>Description:</strong> {recipe.recipeDescription}</p>
            <p><strong>Author:</strong> {recipe.recipeAuthor}</p>
            <div>
              <strong>Image:</strong>
              <img src={recipe.recipeImage} alt={recipe.recipeName} style={{ width: '300px', height: 'auto' }} />
            </div>
          </div>
        )}
        <div className="contact-info">
          <p><strong>Email:</strong> gourmetglobe@gmail.com</p>
          <p><strong>Phone:</strong> +386 (069) 834-740</p>
        </div>
        <br /><br />
        <p>If you have any recipe suggestions, feel free to email us!</p>
      </div>
    </div>
  );
};

export default ContactUsComponent;
