//import React from "react";
import axios from "axios";
import WorldMap from "svg-world-map";

const WorldMapComponent = () => {
  const handleCountryClick = async (countryCode) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/recipes?country=${countryCode}`
      );

      console.log("Recipes from", countryCode, response.data);
      alert(`Recipes from ${countryCode}: \n${JSON.stringify(response.data)}`);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      alert("Failed to fetch recipes for the selected country.");
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
      <h1>World Map</h1>
      <WorldMap
        color="blue"
        title="Click on a country"
        onClickFunction={handleCountryClick}
      />
    </div>
  );
};

export default WorldMapComponent;
