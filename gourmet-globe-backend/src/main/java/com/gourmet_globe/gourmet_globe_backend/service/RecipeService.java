package com.gourmet_globe.gourmet_globe_backend.service;

import com.gourmet_globe.gourmet_globe_backend.dto.RecipeDto;

import java.util.List;

public interface RecipeService {
    RecipeDto createRecipe(RecipeDto recipeDto);

    RecipeDto getRecipeById(Long recipeId);

    List<RecipeDto> getAllRecipes();

    RecipeDto updateRecipe(Long recipeId, RecipeDto updatedRecipe);

    void deleteRecipe(Long recipeId);

    List<RecipeDto> getRecipesByCountry(String country);
}