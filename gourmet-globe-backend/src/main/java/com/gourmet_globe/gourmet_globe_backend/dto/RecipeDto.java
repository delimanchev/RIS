package com.gourmet_globe.gourmet_globe_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RecipeDto {
    private Long id;
    private String recipeName;
    private String recipeDescription;
    private String recipeAuthor;
    private String recipeCountry;
    private String recipeIngredients;
    private Integer recipeCarbohydrates;
    private Integer recipeProteins;
    private Integer recipeFats;
    private Integer recipeFibers;
    private Integer recipeCalories;
    private Integer recipeAcids;
    private Integer recipePersons;
    private String recipeImage;
}