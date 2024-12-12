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
                "paprika",
                2,
                "https://natureta.si/wp-content/uploads/2022/01/polpekoci-ajvar-e1658756496692.png"
        );

        RecipeDto expectedDto = new RecipeDto(
                1L,
                "Ajvar",
                "Delicious Balkan spread made from roasted red peppers.",
                "John Doe",
                "Serbia",
                "paprika",
                2,
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
                "paprika",
                2,
                "https://natureta.si/wp-content/uploads/2022/01/polpekoci-ajvar-e1658756496692.png"
        );
        Recipe recipe2 = new Recipe(
                2L,
                "Gibanica",
                "Traditional Serbian pastry made with cheese and phyllo dough.",
                "Jane Doe",
                "Serbia",
                "paprika",
                2,
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
            "paprika",
            2,
            "https://natureta.si/wp-content/uploads/2022/01/polpekoci-ajvar-e1658756496692.png"
    );
    Recipe recipe2 = new Recipe(
            2L,
            "Gibanica",
            "Traditional Serbian pastry made with cheese and phyllo dough.",
            "Jane Doe",
            "Serbia",
            "paprika",
            2,
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
    @Test
    void testUpdateRecipe_Found() {
        Recipe existingRecipe = new Recipe(
                1L,
                "Ajvar",
                "Delicious Balkan spread made from roasted red peppers.",
                "John Doe",
                "Serbia",
                "paprika",
                2,
                "https://natureta.si/wp-content/uploads/2022/01/polpekoci-ajvar-e1658756496692.png"
        );

        RecipeDto updatedRecipeDto = new RecipeDto(
                1L,
                "Ajvar Updated",
                "Delicious Balkan spread made with roasted red peppers and spices.",
                "John Doe",
                "Serbia",
                "paprika",
                3,
                "https://natureta.si/wp-content/uploads/2022/01/polpekoci-ajvar-e1658756496692-updated.png"
        );

        Recipe updatedRecipe = new Recipe(
                1L,
                "Ajvar Updated",
                "Delicious Balkan spread made with roasted red peppers and spices.",
                "John Doe",
                "Serbia",
                "paprika",
                3,
                "https://natureta.si/wp-content/uploads/2022/01/polpekoci-ajvar-e1658756496692-updated.png"
        );

        when(recipeRepository.findById(1L)).thenReturn(Optional.of(existingRecipe));
        when(recipeRepository.save(existingRecipe)).thenReturn(updatedRecipe);

        RecipeDto result = recipeService.updateRecipe(1L, updatedRecipeDto);

        assertNotNull(result);
        assertEquals(updatedRecipeDto.getRecipeName(), result.getRecipeName());
        assertEquals(updatedRecipeDto.getRecipeDescription(), result.getRecipeDescription());
        assertEquals(updatedRecipeDto.getRecipeAuthor(), result.getRecipeAuthor());
        assertEquals(updatedRecipeDto.getRecipeCountry(), result.getRecipeCountry());
        assertEquals(updatedRecipeDto.getRecipeImage(), result.getRecipeImage());
    }

    @Test
    void testUpdateRecipe_NotFound() {
        RecipeDto updatedRecipeDto = new RecipeDto(
                1L,
                "Ajvar Updated",
                "Delicious Balkan spread made with roasted red peppers and spices.",
                "John Doe",
                "Serbia",
                "paprika",
                3,
                "https://natureta.si/wp-content/uploads/2022/01/polpekoci-ajvar-e1658756496692-updated.png"
        );

        when(recipeRepository.findById(1L)).thenReturn(Optional.empty());

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            recipeService.updateRecipe(1L, updatedRecipeDto);
        });

        assertEquals("Recipe not found with ID: 1", exception.getMessage());
    }
    @Test
    void testAdjustIngredientsForMoreServings() {
        // Recipe DTO se koristi za krajnji rezultat, ali treba nam Recipe entitet za testiranje
        Recipe recipe = new Recipe(
                1L,
                "Ajvar",
                "Delicious Balkan spread made from roasted red peppers.",
                "John Doe",
                "Serbia",
                "paprika:200, salt:100",
                2,  // Default servings
                "https://natureta.si/wp-content/uploads/2022/01/polpekoci-ajvar-e1658756496692.png"
        );
    
        when(recipeRepository.findById(1L)).thenReturn(Optional.of(recipe));
    
        // Adjust ingredients for 4 servings
        RecipeDto adjustedRecipe = recipeService.adjustRecipeForServings(1L, 4);
    
        assertNotNull(adjustedRecipe);
        assertEquals(4, adjustedRecipe.getRecipePersons());  // Servings updated to 4
        assertTrue(adjustedRecipe.getRecipeIngredients().contains("paprika:400, salt:200"));  // Quantities should be doubled
    }
   @Test
void testAdjustIngredientsForFewerServings() {
    // Recipe entitet sa početnim podacima
    Recipe recipe = new Recipe(
            1L,
            "Ajvar",
            "Delicious Balkan spread made from roasted red peppers.",
            "John Doe",
            "Serbia",
            "paprika:200, salt:100",  // Sastojci za 2 porcije
            2,  // Početni broj porcija
            "https://natureta.si/wp-content/uploads/2022/01/polpekoci-ajvar-e1658756496692.png"
    );

    // Mockanje poziva za pronaći recept po ID-u
    when(recipeRepository.findById(1L)).thenReturn(Optional.of(recipe));

    // Prilagodba sastojaka za 1 porciju
    RecipeDto adjustedRecipe = recipeService.adjustRecipeForServings(1L, 1);

    // Provera da li je broj porcija ispravno prilagođen
    assertNotNull(adjustedRecipe);
    assertEquals(1, adjustedRecipe.getRecipePersons());  // Servings updated to 1

    // Provera da li su količine sastojaka ispravno smanjene
    assertTrue(adjustedRecipe.getRecipeIngredients().contains("paprika:100, salt:50"));  // Količine treba da budu prepolovljene
}
@Test
void testAdjustIngredientsForNonExistentRecipe() {
    //test proverava situaciju kada ne postoji recept sa datim ID-om.
    when(recipeRepository.findById(1L)).thenReturn(Optional.empty());

    // Pozivanje metode i testiranje da li se baci odgovarajući izuzetak
    ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
        recipeService.adjustRecipeForServings(1L, 2);  // Očekujemo grešku jer recept ne postoji
    });

    // Proveriti da li je poruka o grešci ispravna
    assertEquals("Recipe not found with ID: 1", exception.getMessage());
}
@Test
void testAdjustIngredientsForZeroOrNegativeServings() {
    // Recipe entitet sa početnim podacima
    Recipe recipe = new Recipe(
            1L,
            "Ajvar",
            "Delicious Balkan spread made from roasted red peppers.",
            "John Doe",
            "Serbia",
            "paprika:200, salt:100",  // Sastojci za 2 porcije
            2,  // Početni broj porcija
            "https://natureta.si/wp-content/uploads/2022/01/polpekoci-ajvar-e1658756496692.png"
    );

    // Mockovanje poziva za pronaći recept po ID-u
    when(recipeRepository.findById(1L)).thenReturn(Optional.of(recipe));

    // Testiranje za 0 porcija
    IllegalArgumentException exceptionZero = assertThrows(IllegalArgumentException.class, () -> {
        recipeService.adjustRecipeForServings(1L, 0);  // Treba da baci izuzetak jer broj porcija ne može biti 0
    });

    // Proveriti poruku greške
    assertEquals("Servings must be greater than 0", exceptionZero.getMessage());

    // Testiranje za negativan broj porcija
    IllegalArgumentException exceptionNegative = assertThrows(IllegalArgumentException.class, () -> {
        recipeService.adjustRecipeForServings(1L, -2);  // Treba da baci izuzetak jer broj porcija ne može biti negativan
    });

    // Proveriti poruku greške
    assertEquals("Servings must be greater than 0", exceptionNegative.getMessage());
}

}
