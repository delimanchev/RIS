// RecipeDetailComponent.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To get the recipe ID from the URL
import { getRecipe } from '../services/RecipeService'; // Import the getRecipe function
import '../css/RecipeDetailComponent.css';

const RecipeDetailComponent = () => {
    const { id } = useParams();  // Get the recipe ID from the URL
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        // Fetch the recipe details by its ID using the getRecipe function
        getRecipe(id)
            .then((response) => {
                setRecipe(response.data); // Set the recipe data when fetched
            })
            .catch((error) => {
                console.error('Error fetching recipe details:', error); // Handle error if any
            });
    }, [id]);

    // If the recipe is still loading, show a loading message
    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div className="recipe-detail-container">
            <h2>{recipe.recipeName}</h2>
            <div className="recipe-detail">
                <img src={recipe.recipeImage} alt={recipe.recipeName} style={{ width: '300px', height: 'auto' }} />
                <p><strong>Country:</strong> {recipe.recipeCountry}</p>
                <p><strong>Author:</strong> {recipe.recipeAuthor}</p>
                <p><strong>Description:</strong> {recipe.recipeDescription}</p>
            </div>
        </div>
    );
};

export default RecipeDetailComponent;
