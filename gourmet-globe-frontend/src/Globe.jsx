import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Globe from "react-globe.gl";

const GlobeComponent = () => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
            .then((res) => res.json())
            .then((data) => setCountries(data.features));
    }, []);

    const handleCountryClick = (country) => {
        const countryName = country.properties.name;
        console.log("Selected country: ", countryName);
        setSelectedCountry(countryName);

        fetch(`http://localhost:8080/api/recipes/country/${countryName}`)
        .then((res) => res.json())
        .then((data) => {
            console.log("Fetched recipes:", data);
            setRecipes(data || []);
        })
        .catch((error) => {
            console.error("Error fetching recipes:", error);
            setRecipes([]);
        });
    
    };

    const handleRecipeClick = (recipeId) => {
        navigate(`/recipe/${recipeId}`);
    };

    return (
        <div className="globe-container" style={{ width: "100vw", height: "100vh" }}>
            <Globe
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                polygonsData={countries}
                polygonStrokeColor={() => "#111"}
                polygonLabel={({ properties: d }) => `<b>${d.name}</b>`}
                onPolygonClick={handleCountryClick}
                polygonCapColor={({ properties: d }) =>
                    d.name === selectedCountry ? "rgba(0, 200, 0, 0.7)" : "rgba(200, 0, 0, 0.7)"
                }
            />
            {selectedCountry && (
                <div
                    className="recipes-container"
                    style={{
                        position: "absolute",
                        top: "10%",
                        left: "10%",
                        width: "80%",
                        backgroundColor: "#fff",
                        padding: "20px",
                        borderRadius: "10px",
                    }}
                >
                    <h3>Recipes from {selectedCountry}</h3>
                    {recipes.length > 0 ? (
                        <ul>
                            {recipes.map((recipe) => (
                                <li
                                    key={recipe.id}
                                    onClick={() => handleRecipeClick(recipe.id)}
                                    style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                                >
                                    <strong>{recipe.recipeName || "Unnamed Recipe"}</strong>
                                    {recipe.description ? `: ${recipe.description}` : ""}
                                </li>
                            ))}
                            
                        </ul>
                    ) : (
                        <p>No recipes found for {selectedCountry}.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default GlobeComponent;
