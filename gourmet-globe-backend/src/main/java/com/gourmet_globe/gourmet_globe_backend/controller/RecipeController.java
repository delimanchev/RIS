package com.gourmet_globe.gourmet_globe_backend.controller;

import com.gourmet_globe.gourmet_globe_backend.dto.RecipeDto;
import com.gourmet_globe.gourmet_globe_backend.service.RecipeService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private RecipeService recipeService;

    @GetMapping("/")
    public String home() {
        return "Welcome to Gourmet Globe API!";
    }

    @PostMapping
    public ResponseEntity<RecipeDto> createRecipe(@RequestBody RecipeDto recipeDto) {
        RecipeDto savedRecipe = recipeService.createRecipe(recipeDto);
        return ResponseEntity.status(201).body(savedRecipe);
    }

    @GetMapping("{id}")
    public ResponseEntity<RecipeDto> getRecipeById(@PathVariable("id") Long recipeId) {
        RecipeDto recipeDto = recipeService.getRecipeById(recipeId);
        return ResponseEntity.ok(recipeDto);
    }

    @GetMapping
    public ResponseEntity<List<RecipeDto>> getAllRecipes() {
        List<RecipeDto> recipes = recipeService.getAllRecipes();
        return ResponseEntity.ok(recipes);
    }

    @PutMapping("{id}")
    public ResponseEntity<RecipeDto> updateRecipe(@PathVariable("id") Long recipeId, @RequestBody RecipeDto updatedRecipe) {
        RecipeDto recipeDto = recipeService.updateRecipe(recipeId, updatedRecipe);
        return ResponseEntity.ok(recipeDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteRecipe(@PathVariable("id") Long recipeId) {
        recipeService.deleteRecipe(recipeId);
        return ResponseEntity.ok("Recipe deleted successfully");
    }

    @GetMapping("/country/{countryName}")
    public ResponseEntity<List<RecipeDto>> getRecipesByCountry(@PathVariable String countryName) {
        System.out.println("Fetching recipes for country: " + countryName);  // Log request
        List<RecipeDto> recipes = recipeService.getRecipesByCountry(countryName);
        return ResponseEntity.ok(recipes);
    }
    
}
