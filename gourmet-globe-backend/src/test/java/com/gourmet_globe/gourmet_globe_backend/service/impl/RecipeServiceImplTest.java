package com.gourmet_globe.gourmet_globe_backend.service.impl;

import com.gourmet_globe.gourmet_globe_backend.dto.RecipeDto;
import com.gourmet_globe.gourmet_globe_backend.entity.Recipe;
import com.gourmet_globe.gourmet_globe_backend.exception.ResourceNotFoundException;
import com.gourmet_globe.gourmet_globe_backend.mapper.RecipeMapper;
import com.gourmet_globe.gourmet_globe_backend.repository.RecipeRepository;
import com.gourmet_globe.gourmet_globe_backend.service.impl.RecipeServiceImpl;
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

}
