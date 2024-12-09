import React, { useEffect, useState } from 'react';
import { createRecipe, getRecipe, updateRecipe } from '../services/RecipeService';
import { useNavigate, useParams } from 'react-router-dom';

const RecipeComponent = () => {
    const [recipeName, setRecipeName] = useState('');
    const [recipeDescription, setRecipeDescription] = useState('');
    const [recipeAuthor, setRecipeAuthor] = useState('');
    const [recipeImage, setRecipeImage] = useState('');
    const [recipeCountry, setRecipeCountry] = useState('');
    
    const [errors, setErrors] = useState({
        recipeName: '',
        recipeDescription: '',
        recipeAuthor: '',
        recipeImage: '',
        recipeCountry: ''
    });

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

    const { id } = useParams();
    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            getRecipe(id).then((response) => {
                setRecipeName(response.data.recipeName);
                setRecipeDescription(response.data.recipeDescription);
                setRecipeAuthor(response.data.recipeAuthor);
                setRecipeImage(response.data.recipeImage);
                setRecipeCountry(response.data.recipeCountry);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    function saveOrUpdateRecipe(e) {
        e.preventDefault();

        if (validateForm()) {
            const recipe = { recipeName, recipeDescription, recipeAuthor, recipeImage, recipeCountry };
            console.log(recipe);

            if (id) {
                updateRecipe(id, recipe).then((response) => {
                    console.log(response.data);
                    navigator('/admin-panel/recipes');
                }).catch(error => {
                    console.error(error);
                });
            } else {
                createRecipe(recipe).then((response) => {
                    console.log(response.data);
                    navigator('/admin-panel/recipes');
                }).catch(error => {
                    console.error(error);
                });
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (recipeName.trim()) {
            errorsCopy.recipeName = '';
        } else {
            errorsCopy.recipeName = 'Recipe Name is required';
            valid = false;
        }

        if (recipeDescription.trim()) {
            errorsCopy.recipeDescription = '';
        } else {
            errorsCopy.recipeDescription = 'Recipe Description is required';
            valid = false;
        }

        if (recipeAuthor.trim()) {
            errorsCopy.recipeAuthor = '';
        } else {
            errorsCopy.recipeAuthor = 'Recipe Author is required';
            valid = false;
        }

        const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
        if (recipeImage.trim() && urlPattern.test(recipeImage)) {
            errorsCopy.recipeImage = '';
        } else {
            errorsCopy.recipeImage = 'Valid Recipe Image URL is required';
            valid = false;
        }

        if (recipeCountry) {
            errorsCopy.recipeCountry = '';
        } else {
            errorsCopy.recipeCountry = 'Recipe Country is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle() {
        return id ? <h2 className='text-center'>Update Recipe</h2> : <h2 className='text-center'>Add Recipe</h2>;
    }

    return (
        <div className='container'>
            <br /><br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Recipe Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Recipe Name'
                                    name='recipeName'
                                    value={recipeName}
                                    className={`form-control ${errors.recipeName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setRecipeName(e.target.value)}
                                />
                                {errors.recipeName && <div className='invalid-feedback'>{errors.recipeName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Recipe Description:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Recipe Description'
                                    name='recipeDescription'
                                    value={recipeDescription}
                                    className={`form-control ${errors.recipeDescription ? 'is-invalid' : ''}`}
                                    onChange={(e) => setRecipeDescription(e.target.value)}
                                />
                                {errors.recipeDescription && <div className='invalid-feedback'>{errors.recipeDescription}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Recipe Country:</label>
                                <select
                                    name='recipeCountry'
                                    value={recipeCountry}
                                    className={`form-control ${errors.recipeCountry ? 'is-invalid' : ''}`}
                                    onChange={(e) => setRecipeCountry(e.target.value)}
                                >
                                    <option value=''>Select a Country</option>
                                    {countries.map((country, index) => (
                                        <option key={index} value={country}>{country}</option>
                                    ))}
                                </select>
                                {errors.recipeCountry && <div className='invalid-feedback'>{errors.recipeCountry}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Recipe Author:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Recipe Author'
                                    name='recipeAuthor'
                                    value={recipeAuthor}
                                    className={`form-control ${errors.recipeAuthor ? 'is-invalid' : ''}`}
                                    onChange={(e) => setRecipeAuthor(e.target.value)}
                                />
                                {errors.recipeAuthor && <div className='invalid-feedback'>{errors.recipeAuthor}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Recipe Image URL:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Recipe Image URL'
                                    name='recipeImage'
                                    value={recipeImage}
                                    className={`form-control ${errors.recipeImage ? 'is-invalid' : ''}`}
                                    onChange={(e) => setRecipeImage(e.target.value)}
                                />
                                {errors.recipeImage && <div className='invalid-feedback'>{errors.recipeImage}</div>}
                            </div>

                            {recipeImage && (
                                <div className='mb-2'>
                                    <img src={recipeImage} alt='Recipe' style={{ width: '100%', height: 'auto', marginTop: '10px' }} />
                                </div>
                            )}

                            <button className='btn btn-success' onClick={saveOrUpdateRecipe}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeComponent;
