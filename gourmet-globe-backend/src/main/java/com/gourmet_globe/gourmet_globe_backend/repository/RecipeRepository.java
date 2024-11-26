package com.gourmet_globe.gourmet_globe_backend.repository;

import com.gourmet_globe.gourmet_globe_backend.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findByRecipeCountry(String recipeCountry);
}
