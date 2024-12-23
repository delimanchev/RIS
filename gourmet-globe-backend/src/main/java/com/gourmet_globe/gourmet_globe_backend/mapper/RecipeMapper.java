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
        recipe.setRecipeCarbohydrates(recipeDto.getRecipeCarbohydrates());
        recipe.setRecipeProteins(recipeDto.getRecipeProteins());
        recipe.setRecipeFats(recipeDto.getRecipeFats());
        recipe.setRecipeFibers(recipeDto.getRecipeFibers());
        recipe.setRecipeCalories(recipeDto.getRecipeCalories());
        recipe.setRecipeAcids(recipeDto.getRecipeAcids());
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
        recipeDto.setRecipeCarbohydrates(recipe.getRecipeCarbohydrates());
        recipeDto.setRecipeProteins(recipe.getRecipeProteins());
        recipeDto.setRecipeFats(recipe.getRecipeFats());
        recipeDto.setRecipeFibers(recipe.getRecipeFibers());
        recipeDto.setRecipeCalories(recipe.getRecipeCalories());
        recipeDto.setRecipeAcids(recipe.getRecipeAcids());
        recipeDto.setRecipePersons(recipe.getRecipePersons());
        recipeDto.setRecipeImage(recipe.getRecipeImage());

        return recipeDto;
    }
}
