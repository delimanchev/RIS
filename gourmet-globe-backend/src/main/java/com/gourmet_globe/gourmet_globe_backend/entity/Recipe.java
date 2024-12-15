package com.gourmet_globe.gourmet_globe_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "recipes")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "recipe_name")
    private String recipeName;
    @Column(name = "recipe_description")
    private String recipeDescription;
    @Column(name = "recipe_author")
    private String recipeAuthor;
    @Column(name = "recipe_country")
    private String recipeCountry;
    @Column(name = "recipe_ingredients")
    private String recipeIngredients;
    @Column(name = "recipe_carbohydrates")
    private Integer recipeCarbohydrates;
    @Column(name = "recipe_proteins")
    private Integer recipeProteins;
    @Column(name = "recipe_fats")
    private Integer recipeFats;
    @Column(name = "recipe_fibers")
    private Integer recipeFibers;
    @Column(name = "recipe_calories")
    private Integer recipeCalories;
    @Column(name = "recipe_persons")
    private Integer recipePersons;
    @Column(name = "recipe_image")
    private String recipeImage;
}