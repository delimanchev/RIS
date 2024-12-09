import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { getRecipe } from '../services/RecipeService'; 
import '../css/RecipeDetailComponent.css';

const RecipeDetailComponent = () => {
    const { id } = useParams(); 
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        getRecipe(id)
            .then((response) => {
                setRecipe(response.data); 
            })
            .catch((error) => {
                console.error('Error fetching recipe details:', error);
            });
    }, [id]);

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div className="recipe-detail-container">
            <h2>{recipe.recipeName}</h2>
            <div className="recipe-detail">
                <img src={recipe.recipeImage} alt={recipe.recipeName} style={{ width: '300px', height: 'auto' }} />
                <p><strong>Country:</strong> {recipe.recipeCountry}</p>
                <p><strong>Description:</strong> {recipe.recipeDescription}</p>
                <p><strong>Ingredients:</strong> {recipe.recipeIngredients}</p>
                <p><strong>Persons:</strong> {recipe.recipePersons}</p>
                <p><strong>Author:</strong> {recipe.recipeAuthor}</p>
            </div>
        </div>
    );
};

export default RecipeDetailComponent;
