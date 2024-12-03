Opis testov

V tem dokumentu bomo predstavili teste, ki smo jih izvedli na backend storitvah za Gourmet Globe projekt. Testi so bili ustvarjeni z uporabo JUnit 5 in Mockito, da bi zagotovili pravilno delovanje ključnih funkcionalnosti našega sistema.

Testirane funkcionalnosti:

getAllRecipes():
Opis: Ta test preverja, ali metoda za pridobivanje vseh receptov pravilno vrne seznam RecipeDto objektov.
Zakaj je pomemben: Preverja osnovno funkcionalnost za pridobivanje podatkov o receptih, ki bodo prikazani na naši spletni strani.

getRecipeById():
Opis: Ta test preverja, ali metoda pravilno vrne recept z določenim ID-jem ali pa vrže napako, če recept z navedenim ID-jem ne obstaja.
Zakaj je pomemben: Ta test zagotavlja, da se lahko uporabniki iskanja po ID-ju pravilno izvaja, hkrati pa se ravna s situacijami, ko recept ni najden.

getRecipesByCountry():
Opis: Ta test preverja, ali metoda za iskanje receptov glede na državo pravilno vrne seznam receptov, povezanih z določeno državo.
Zakaj je pomemben: Pomembno je zagotoviti, da se lahko recepti filtrirajo glede na izvorno državo, kar je ključna funkcionalnost za spletno stran, ki se osredotoča na mednarodno kuhinjo.

deleteRecipe():
Opis: Ta test preverja, ali metoda za brisanje recepta pravilno izbriše recept iz baze podatkov ali pa vrže napako, če recept z določenim ID-jem ne obstaja.
Zakaj je pomemben: Preverja, ali je brisanje receptov varno in ali je obvladano ravnanje z napakami, ko recept ne obstaja.

Člani skupine in odgovornosti

Andrej Delimanchev:
Test za metodo getRecipeById_Found().
Test za metodo getRecipeById_NotFound().

Luka Kitanovski:
Test za metodo getRecipesByCountry_Found().
Test za metodo getRecipesByCountry_NotFound().

Aleksa Vučinić:
Test za metodo getAllRecipes().
Test za metodo deleteRecipe_NotFound().

Analiza uspešnosti testov

Vsi testi so bili uspešni.