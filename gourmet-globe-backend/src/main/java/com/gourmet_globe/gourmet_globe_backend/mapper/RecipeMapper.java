package com.gourmet_globe.gourmet_globe_backend.mapper;

import com.gourmet_globe.gourmet_globe_backend.dto.RecipeDto;
import com.gourmet_globe.gourmet_globe_backend.entity.Recipe;

public class RecipeMapper {
    public static Recipe mapToRecipe(RecipeDto recipeDto) {
        Recipe recipe = new Recipe();
        recipe.setId(recipeDto.getId());
        recipe.setRecipeName(recipeDto.getRecipeName());
        recipe.setRecipeDescription(recipeDto.getRecipeDescription());
        recipe.setRecipeCountry(recipeDto.getRecipeCountry());
        recipe.setRecipeAuthor(recipeDto.getRecipeAuthor());
        recipe.setRecipeIngredients(recipeDto.getRecipeIngredients());
        recipe.setRecipePersons(recipeDto.getRecipePersons());
        recipe.setRecipeImage(recipeDto.getRecipeImage());

        return recipe;
    }

    public static RecipeDto mapToRecipeDto(Recipe recipe) {
        RecipeDto recipeDto = new RecipeDto();
        recipeDto.setId(recipe.getId());
        recipeDto.setRecipeName(recipe.getRecipeName());
        recipeDto.setRecipeDescription(recipe.getRecipeDescription());
        recipeDto.setRecipeCountry(recipe.getRecipeCountry());
        recipeDto.setRecipeAuthor(recipe.getRecipeAuthor());
        recipeDto.setRecipeIngredients(recipe.getRecipeIngredients());
        recipeDto.setRecipePersons(recipe.getRecipePersons());
        recipeDto.setRecipeImage(recipe.getRecipeImage());

        return recipeDto;
    }
}
