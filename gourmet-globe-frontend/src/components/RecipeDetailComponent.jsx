import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipe } from '../services/RecipeService';
import '../css/RecipeDetailComponent.css';

const RecipeDetailComponent = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [scaledIngredients, setScaledIngredients] = useState(null);
    const [scaledNutrition, setScaledNutrition] = useState(null);
    const [persons, setPersons] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [newPersons, setNewPersons] = useState(null);

    // Constants for daily nutrient intake
    const dailyIntake = {
        calories: 2079.35,
        carbohydrates: 310,
        proteins: 50,
        fats: 70,
        fibers: 30,
        acids: 24,
    };

    // Calculate daily intake fulfillment for one person
    const calculateDailyIntakeFulfillment = (nutrition, persons) => {
        if (!nutrition || !persons) return null;

        const perPersonNutrition = {
            calories: nutrition.calories / persons,
            carbohydrates: nutrition.carbohydrates / persons,
            proteins: nutrition.proteins / persons,
            fats: nutrition.fats / persons,
            fibers: nutrition.fibers / persons,
            acids: nutrition.acids / persons,
        };

        return {
            calories: ((perPersonNutrition.calories / dailyIntake.calories) * 100).toFixed(2),
            carbohydrates: ((perPersonNutrition.carbohydrates / dailyIntake.carbohydrates) * 100).toFixed(2),
            proteins: ((perPersonNutrition.proteins / dailyIntake.proteins) * 100).toFixed(2),
            fats: ((perPersonNutrition.fats / dailyIntake.fats) * 100).toFixed(2),
            fibers: ((perPersonNutrition.fibers / dailyIntake.fibers) * 100).toFixed(2),
            acids: ((perPersonNutrition.acids / dailyIntake.acids) * 100).toFixed(2),
        };
    };

    useEffect(() => {
        getRecipe(id)
            .then((response) => {
                const recipeData = response.data;
                setRecipe(recipeData);
                setPersons(recipeData.recipePersons);
                setScaledIngredients(recipeData.recipeIngredients);

                // Initialize scaled nutrition with original values
                setScaledNutrition({
                    calories: recipeData.recipeCalories,
                    carbohydrates: recipeData.recipeCarbohydrates,
                    proteins: recipeData.recipeProteins,
                    fats: recipeData.recipeFats,
                    fibers: recipeData.recipeFibers,
                    acids: recipeData.recipeAcids,
                });
            })
            .catch((error) => {
                console.error('Error fetching recipe details:', error);
            });
    }, [id]);

    const scaleIngredientsAndNutrition = (newPersons) => {
        if (!recipe || !recipe.recipePersons) return;

        const originalPersons = recipe.recipePersons;

        // Scale ingredients
        const scaled = recipe.recipeIngredients.replace(/\b\d+(\.\d+)?\b/g, (match) => {
            const quantity = parseFloat(match);
            return ((quantity / originalPersons) * newPersons).toFixed(2);
        });

        // Scale nutritional values
        const scaledNutrition = {
            calories: ((recipe.recipeCalories / originalPersons) * newPersons).toFixed(2),
            carbohydrates: ((recipe.recipeCarbohydrates / originalPersons) * newPersons).toFixed(2),
            proteins: ((recipe.recipeProteins / originalPersons) * newPersons).toFixed(2),
            fats: ((recipe.recipeFats / originalPersons) * newPersons).toFixed(2),
            fibers: ((recipe.recipeFibers / originalPersons) * newPersons).toFixed(2),
            acids: ((recipe.recipeAcids / originalPersons) * newPersons).toFixed(2),
        };

        // Update state
        setScaledIngredients(scaled);
        setScaledNutrition(scaledNutrition);
        setPersons(newPersons);
    };

    const handlePopupSubmit = () => {
        scaleIngredientsAndNutrition(newPersons);
        setIsPopupOpen(false);
    };

    const dailyFulfillment = calculateDailyIntakeFulfillment(scaledNutrition, persons);

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div className="recipe-detail-container">
            <style>
                {`
                .popup-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                .popup {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                    text-align: center;
                    max-width: 400px;
                    width: 100%;
                }
                .popup h3 {
                    margin-bottom: 15px;
                }
                .popup-actions {
                    margin-top: 15px;
                    display: flex;
                    justify-content: space-between;
                    gap: 10px;
                }
                .adjust-persons-button, .submit-button, .cancel-button {
                    padding: 8px 12px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                }
                .submit-button {
                    background-color: #4caf50;
                    color: white;
                }
                .cancel-button {
                    background-color: #f44336;
                    color: white;
                }
                `}
            </style>

            <h2>{recipe.recipeName}</h2>
            <div className="recipe-detail">
                <img
                    src={recipe.recipeImage}
                    alt={recipe.recipeName}
                    style={{ width: '300px', height: 'auto' }}
                />
                <p><strong>Country:</strong> {recipe.recipeCountry}</p>
                <p><strong>Description:</strong> {recipe.recipeDescription}</p>
                <p>
                    <strong>Ingredients:</strong><br />
                    {scaledIngredients || recipe.recipeIngredients}
                </p>

                <p>
    <strong>Nutritional Values:</strong><br />
    {scaledNutrition
        ? `${scaledNutrition.calories} calories, of which: ${scaledNutrition.carbohydrates} g carbohydrates, ${scaledNutrition.proteins} g proteins, ${scaledNutrition.fats} g fats, ${scaledNutrition.fibers} g fibers, ${scaledNutrition.acids} g acids`
        : `${recipe.recipeCalories} calories, of which: ${recipe.recipeCarbohydrates} g carbohydrates, ${recipe.recipeProteins} g proteins, ${recipe.recipeFats} g fats, ${recipe.recipeFibers} g fibers, ${recipe.recipeAcids || 0} g acids`} 
</p>


                {dailyFulfillment && (
                    <p>
                        <strong>Daily Intake Fulfillment per Person:</strong><br />
                        {dailyFulfillment.calories}% of daily calories, {dailyFulfillment.carbohydrates}% of daily carbohydrates, {dailyFulfillment.proteins}% of daily proteins, {dailyFulfillment.fats}% of daily fats, {dailyFulfillment.fibers}% of daily fibers, {dailyFulfillment.acids}% of daily acids.
                    </p>
                )}

                <p><strong>Persons:</strong> {persons}</p>
                <p><strong>Author:</strong> {recipe.recipeAuthor}</p>
                <button onClick={() => setIsPopupOpen(true)} className="adjust-persons-button">
                    Adjust Number of Persons
                </button>
            </div>

            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h3>Adjust Number of Persons</h3>
                        <label htmlFor="newPersons">Enter new number of persons:</label>
                        <input
                            type="number"
                            id="newPersons"
                            value={newPersons || ''}
                            min="1"
                            onChange={(e) => setNewPersons(Number(e.target.value))}
                            style={{ marginLeft: '8px', width: '60px' }}
                        />
                        <div className="popup-actions">
                            <button onClick={handlePopupSubmit} className="submit-button">
                                Submit
                            </button>
                            <button onClick={() => setIsPopupOpen(false)} className="cancel-button">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeDetailComponent;