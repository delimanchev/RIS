import { useEffect, useState } from 'react';
import { deleteRecipe, listRecipes } from '../services/RecipeService';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/balkan-cuisine.jpeg';

const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda',
    'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 
    'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 
    'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 
    'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 
    'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 
    'Chile', 'China', 'Colombia', 'Comoros', 'Congo, Democratic Republic of the', 
    'Congo, Republic of the', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 
    'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 
    'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 
    'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 
    'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 
    'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 
    'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 
    'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 
    'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 
    'Korea, South', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 
    'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 
    'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 
    'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 
    'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 
    'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 
    'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 
    'Nicaragua', 'Niger', 'Nigeria', 'Macedonia', 'Norway', 
    'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 
    'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 
    'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 
    'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 
    'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Republic of Serbia', 
    'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 
    'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 
    'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 
    'Syria', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 
    'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 
    'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 
    'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 
    'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 
    'Zambia', 'Zimbabwe'
];

const ListRecipeComponent = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(5);

    const navigator = useNavigate();

    useEffect(() => {
        getAllRecipes();
    }, []);

    function getAllRecipes() {
        listRecipes().then((response) => {
            setRecipes(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    function addNewRecipe() {
        navigator('/admin-panel/add-recipe');
    }

    function updateRecipe(id) {
        navigator(`/admin-panel/edit-recipe/${id}`);
    }

    function removeRecipe(id) {
        deleteRecipe(id).then(() => {
            getAllRecipes();
        }).catch(error => {
            console.error(error);
        });
    }

    const filteredRecipes = recipes.filter(recipe =>
        recipe.recipeName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCountry === '' || recipe.recipeCountry === selectedCountry)
    );

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                minHeight: '100vh',
                minWidth: '100vh',
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <div className='container' style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '8px' }}>
                <h2 className='text-center'>List of Recipes</h2>
                <button className='btn btn-primary mb-2' onClick={addNewRecipe}>Add Recipe</button>

                {/* Search bar input */}
                <div className="form-group mb-2">
                    <input
                        type="text"
                        placeholder="Search by Recipe Name"
                        className="form-control"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Country selection dropdown */}
                <div className="form-group mb-2">
                    <select
                        className="form-control"
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                    >
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </select>
                </div>

                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Recipe ID</th>
                            <th>Recipe Name</th>
                            <th>Recipe Description</th>
                            <th>Recipe Country</th>
                            <th>Recipe Author</th>
                            <th>Recipe Ingredients</th>
                            <th>Nutritional Values </th>
                            <th>Recipe Persons</th>
                            <th>Recipe Image</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentRecipes.map(recipe =>
                                <tr key={recipe.id}>
                                    <td>{recipe.id}</td>
                                    <td>{recipe.recipeName}</td>
                                    <td>{recipe.recipeDescription}</td>
                                    <td>{recipe.recipeCountry}</td>
                                    <td>{recipe.recipeAuthor}</td>
                                    <td>{recipe.recipeIngredients}</td>
                                    <td>{recipe.recipeCalories} calories, {recipe.recipeCarbohydrates}g carbs, {recipe.recipeProteins}g proteins, {recipe.recipeFats}g fats, {recipe.recipeFibers}g fibers
                                    </td>
                                    <td>{recipe.recipePersons}</td>
                                    <td>
                                        {/* Display recipe image using URL */}
                                        <img
                                            src={recipe.recipeImage} // Assuming recipeImage is a URL
                                            alt={recipe.recipeName}
                                            style={{ width: '100px', height: 'auto' }} // Set appropriate dimensions
                                        />
                                    </td>
                                    <td>
                                        <button className='btn btn-info' onClick={() => updateRecipe(recipe.id)}>Update</button>
                                    </td>
                                    <td>
                                        <button className='btn btn-danger' onClick={() => removeRecipe(recipe.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

                {/* Pagination component */}
                <Pagination
                    recipesPerPage={recipesPerPage}
                    totalRecipes={filteredRecipes.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
}

const Pagination = ({ recipesPerPage, totalRecipes, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <button onClick={() => paginate(number)} className='page-link'>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default ListRecipeComponent;
