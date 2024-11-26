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
        recipe.setRecipeImage(updatedRecipe.getRecipeImage());

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
    
}