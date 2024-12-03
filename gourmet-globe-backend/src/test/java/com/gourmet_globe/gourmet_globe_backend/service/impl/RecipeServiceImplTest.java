package com.gourmet_globe.gourmet_globe_backend.service.impl;

import com.gourmet_globe.gourmet_globe_backend.dto.RecipeDto;
import com.gourmet_globe.gourmet_globe_backend.entity.Recipe;
import com.gourmet_globe.gourmet_globe_backend.exception.ResourceNotFoundException;
import com.gourmet_globe.gourmet_globe_backend.repository.RecipeRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class RecipeServiceImplTest {

    @Mock
    private RecipeRepository recipeRepository;

    @InjectMocks
    private RecipeServiceImpl recipeService;

    public RecipeServiceImplTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetRecipeById_Found() {
        Recipe recipe = new Recipe(
                1L,
                "Ajvar",
                "Delicious Balkan spread made from roasted red peppers.",
                "John Doe",
                "Serbia",
                "https://natureta.si/wp-content/uploads/2022/01/polpekoci-ajvar-e1658756496692.png"
        );

        RecipeDto expectedDto = new RecipeDto(
                1L,
                "Ajvar",
                "Delicious Balkan spread made from roasted red peppers.",
                "John Doe",
                "Serbia",
                "https://natureta.si/wp-content/uploads/2022/01/polpekoci-ajvar-e1658756496692.png"
        );

        when(recipeRepository.findById(1L)).thenReturn(Optional.of(recipe));

        RecipeDto result = recipeService.getRecipeById(1L);

        assertNotNull(result);
        assertEquals(expectedDto.getRecipeName(), result.getRecipeName());
        assertEquals(expectedDto.getRecipeAuthor(), result.getRecipeAuthor());
    }

    @Test
    void testGetRecipeById_NotFound() {
        when(recipeRepository.findById(1L)).thenReturn(Optional.empty());

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            recipeService.getRecipeById(1L);
        });

        assertEquals("Recipe not found with ID: 1", exception.getMessage());
    }

    @Test
    void testGetRecipesByCountry_Found() {
        Recipe recipe1 = new Recipe(
                1L,
                "Ajvar",
                "Delicious Balkan spread made from roasted red peppers.",
                "John Doe",
                "Serbia",
                "https://natureta.si/wp-content/uploads/2022/01/polpekoci-ajvar-e1658756496692.png"
        );
        Recipe recipe2 = new Recipe(
                2L,
                "Gibanica",
                "Traditional Serbian pastry made with cheese and phyllo dough.",
                "Jane Doe",
                "Serbia",
                "https://natureta.si/wp-content/uploads/2022/01/polpekoci-ajvar-e1658756496692.png"
        );

        List<Recipe> mockRecipes = Arrays.asList(recipe1, recipe2);

        when(recipeRepository.findByRecipeCountry("Serbia")).thenReturn(mockRecipes);

        List<RecipeDto> result = recipeService.getRecipesByCountry("Serbia");

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("Ajvar", result.get(0).getRecipeName());
        assertEquals("Gibanica", result.get(1).getRecipeName());
    }

    @Test
    void testGetRecipesByCountry_NotFound() {
        when(recipeRepository.findByRecipeCountry("UnknownCountry")).thenReturn(Arrays.asList());

        List<RecipeDto> result = recipeService.getRecipesByCountry("UnknownCountry");

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }
    
    @Test
void testGetAllRecipes() {
    Recipe recipe1 = new Recipe(
            1L,
            "Ajvar",
            "Delicious Balkan spread made from roasted red peppers.",
            "John Doe",
            "Serbia",
            "https://natureta.si/wp-content/uploads/2022/01/polpekoci-ajvar-e1658756496692.png"
    );
    Recipe recipe2 = new Recipe(
            2L,
            "Gibanica",
            "Traditional Serbian pastry made with cheese and phyllo dough.",
            "Jane Doe",
            "Serbia",
            "https://natureta.si/wp-content/uploads/2022/01/polpekoci-ajvar-e1658756496692.png"
    );

    List<Recipe> mockRecipes = Arrays.asList(recipe1, recipe2);

    when(recipeRepository.findAll()).thenReturn(mockRecipes);

    List<RecipeDto> result = recipeService.getAllRecipes();

    assertEquals(2, result.size());
    assertEquals("Ajvar", result.get(0).getRecipeName());
    assertEquals("Gibanica", result.get(1).getRecipeName());
    assertEquals("John Doe", result.get(0).getRecipeAuthor());
    assertEquals("Jane Doe", result.get(1).getRecipeAuthor());
}
@Test
void testDeleteRecipe_NotFound() {
    when(recipeRepository.findById(1L)).thenReturn(java.util.Optional.empty());

    ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
        recipeService.deleteRecipe(1L);
    });

    assertEquals("Recipe not found with ID: 1", exception.getMessage());
}

}
