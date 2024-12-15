package com.gourmet_globe.gourmet_globe_backend.service.impl;

import com.gourmet_globe.gourmet_globe_backend.dto.RecipeDto;
import com.gourmet_globe.gourmet_globe_backend.entity.Recipe;
import com.gourmet_globe.gourmet_globe_backend.exception.ResourceNotFoundException;
import com.gourmet_globe.gourmet_globe_backend.mapper.RecipeMapper;
import com.gourmet_globe.gourmet_globe_backend.repository.RecipeRepository;
import com.gourmet_globe.gourmet_globe_backend.service.RecipeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;

    @Override
    public RecipeDto createRecipe(RecipeDto recipeDto) {
        Recipe recipe = RecipeMapper.mapToRecipe(recipeDto);
        Recipe savedRecipe = recipeRepository.save(recipe);

        return RecipeMapper.mapToRecipeDto(savedRecipe);
    }

    @Override
    public RecipeDto getRecipeById(Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Recipe not found with ID: " + recipeId));

        return RecipeMapper.mapToRecipeDto(recipe);
    }

    @Override
    public List<RecipeDto> getAllRecipes() {
        List<Recipe> recipes = recipeRepository.findAll();
        return recipes.stream()
                .map(RecipeMapper::mapToRecipeDto)
                .collect(Collectors.toList());
    }

    @Override
    public RecipeDto updateRecipe(Long recipeId, RecipeDto updatedRecipe) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(
                () -> new ResourceNotFoundException("Recipe not found with ID: " + recipeId)
        );

        recipe.setRecipeName(updatedRecipe.getRecipeName());
        recipe.setRecipeDescription(updatedRecipe.getRecipeDescription());
        recipe.setRecipeAuthor(updatedRecipe.getRecipeAuthor());
        recipe.setRecipeIngredients(updatedRecipe.getRecipeIngredients());
        recipe.setRecipeCarbohydrates(updatedRecipe.getRecipeCarbohydrates());
        recipe.setRecipeProteins(updatedRecipe.getRecipeProteins());
        recipe.setRecipeFats(updatedRecipe.getRecipeFats());
        recipe.setRecipeFibers(updatedRecipe.getRecipeFibers());
        recipe.setRecipeCalories(updatedRecipe.getRecipeCalories());
        recipe.setRecipePersons(updatedRecipe.getRecipePersons());
        recipe.setRecipeImage(updatedRecipe.getRecipeImage());
        recipe.setRecipeCountry(updatedRecipe.getRecipeCountry());

        Recipe updatedRecipeObj = recipeRepository.save(recipe);
        return RecipeMapper.mapToRecipeDto(updatedRecipeObj);
    }

    @Override
    public void deleteRecipe(Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(
                () -> new ResourceNotFoundException("Recipe not found with ID: " + recipeId)
        );

        System.out.println("Deleting recipe: " + recipe.getRecipeName());

        recipeRepository.deleteById(recipeId);
    }

    @Override
    public List<RecipeDto> getRecipesByCountry(String country) {
        System.out.println("Fetching recipes for country: " + country);
        List<Recipe> recipes = recipeRepository.findByRecipeCountry(country);
        return recipes.stream()
                      .map(RecipeMapper::mapToRecipeDto)
                      .collect(Collectors.toList());
    }    
    public RecipeDto adjustRecipeForServings(Long recipeId, int newServings) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found with ID: " + recipeId));
    
        int originalServings = recipe.getRecipePersons();
        if (newServings <= 0) {
            throw new IllegalArgumentException("Servings must be greater than 0");
        }
    
        String[] ingredients = recipe.getRecipeIngredients().split(", ");
        StringBuilder adjustedIngredients = new StringBuilder();
    
        for (String ingredient : ingredients) {
            String[] parts = ingredient.split(":");
            String ingredientName = parts[0];
            int originalQuantity = Integer.parseInt(parts[1]);
            int adjustedQuantity = originalQuantity * newServings / originalServings;
            adjustedIngredients.append(ingredientName).append(":").append(adjustedQuantity).append(", ");
        }
    
        adjustedIngredients.setLength(adjustedIngredients.length() - 2);
    
        recipe.setRecipeIngredients(adjustedIngredients.toString());
        recipe.setRecipePersons(newServings);
    
        return new RecipeDto(
                recipe.getId(),
                recipe.getRecipeName(),
                recipe.getRecipeDescription(),
                recipe.getRecipeAuthor(),
                recipe.getRecipeCountry(),
                recipe.getRecipeIngredients(),
                recipe.getRecipeCarbohydrates(),
                recipe.getRecipeProteins(),
                recipe.getRecipeFats(),
                recipe.getRecipeFibers(),
                recipe.getRecipeCalories(),
                recipe.getRecipePersons(),
                recipe.getRecipeImage()
        );
    }
    
    
}