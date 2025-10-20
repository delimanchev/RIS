🌍 Gourmet Globe

Dobrodošli v Gourmet Globe – vašem potnem listu do okusov z vsega sveta! Ta aplikacija je zasnovana tako, da omogoča dostop do svetovne kulinarike, prinaša raznolike in okusne recepte neposredno v vašo kuhinjo.

🧪 Testiranje

Za zagotovitev stabilnosti in kakovosti kode smo izvedli obsežno testiranje backend sistema Gourmet Globe. V repozitoriju je bila ustvarjena mapa testiranje, ki vsebuje:

Enotni testi: Napisani z uporabo JUnit 5 in Mockito, pokrivajo vse ključne funkcionalnosti sistema.

Poročilo o testiranju: porocilo_testiranja.md vsebuje podrobnosti o izvedenih testih, odgovornosti članov ekipe in analizo uspešnosti testov.

V testih smo preverili, ali metode pravilno obdelujejo podatke iz baze, vključujoč pozitivne in negativne scenarije.

📋 Testirane funkcionalnosti

1. getRecipeById()

Opis: Preverja, ali metoda vrne recept z določenim ID-jem ali vrže ResourceNotFoundException, če recept ne obstaja.

Unit testovi:

testGetRecipeById_Found() → pozitivni primer, preverja pravilno vrnjene podatke.

testGetRecipeById_NotFound() → negativni primer, preverja izjemne situacije.

Zakaj je pomembno: Omogoča, da se iskanje po ID-ju pravilno izvaja in napake ustrezno obravnavajo.

2. getRecipesByCountry()

Opis: Preverja iskanje receptov glede na državo.

Unit testovi:

testGetRecipesByCountry_Found() → vrne seznam receptov za obstoječo državo.

testGetRecipesByCountry_NotFound() → vrne prazno listo za neobstoječo državo.

Zakaj je pomembno: Ključna funkcionalnost za filtriranje receptov po izvorni državi.

3. getAllRecipes()

Opis: Preverja, ali metoda vrne vse recepte iz baze.

Unit testovi:

testGetAllRecipes() → pozitivni primer, preverja pravilno število in vsebino vrnjenih receptov.

testGetAllRecipes_Empty() → negativni primer, preverja, da metoda vrne prazno listo, če receptov ni v bazi.

⚡ Opomba: Prej je obstajal samo pozitivni test (testGetAllRecipes()), sedaj smo dodali tudi negativni scenarij, da je testna pokritost popolna.

Zakaj je pomembno: Zagotavlja, da se vsi recepti pravilno prikazujejo na frontend-u in da metoda ustrezno obravnava tudi primer brez receptov.

4. deleteRecipe()

Opis: Omogoča brisanje recepta po ID-ju.

Unit testovi:

testDeleteRecipe_Found() → pozitivni primer, uspešno brisanje.

testDeleteRecipe_NotFound() → negativni primer, vrže ResourceNotFoundException.

⚡ Opomba: Prej je obstajal samo negativni test (testDeleteRecipe_NotFound()), sedaj smo dodali tudi pozitivni scenarij za pravilno brisanje.

Zakaj je pomembno: Prej je obstajal samo negativni scenarij, zdaj je dopolnjen tudi pozitivni test za pravilno brisanje.

5. updateRecipe() in adjustRecipeForServings()

Opis updateRecipe(): Spreminja podatke obstoječega recepta.

Unit testovi updateRecipe():

testUpdateRecipe_Found() → pozitivni primer, preverja pravilno posodobitev.

testUpdateRecipe_NotFound() → negativni primer, vrže ResourceNotFoundException.

Opis adjustRecipeForServings(): Prilagodi količine sestavin glede na število porcij.

Unit testovi adjustRecipeForServings():

testAdjustIngredientsForMoreServings() → poveča količine sestavin.

testAdjustIngredientsForFewerServings() → zmanjša količine sestavin.

testAdjustIngredientsForNonExistentRecipe() → vrže ResourceNotFoundException.

testAdjustIngredientsForZeroOrNegativeServings() → vrže IllegalArgumentException za 0 ali negativno število porcij.

Zakaj je pomembno: Poskrbi, da se recepti pravilno prilagajajo glede na število porcij in prepreči napake pri neobstoječih receptih ali neveljavnem številu porcij.

📊 Analiza uspešnosti testov

Vsi testi so bili uspešni. Po dodajanju pozitivnega testa za deleteRecipe() smo preverili vse druge metode, scenarije in ugotovili, da so testni primeri smiselni in popolni.

🚀 Funkcije

🌎 Raziskovanje receptov: Odkrijte jedi iz različnih držav in kultur, od ulične hrane do gurmanskih jedi.

🧑‍🍳 Korak za korakom: Jasni in enostavni recepti za vsak nivo znanja.

🥣 Avtentični nasveti za kuhanje: Spoznajte kulturne vpoglede in kuharske tehnike z vsega sveta.

💬 Ocene in mnenja uporabnikov: Delite svoje izkušnje in poglejte, kaj o vsakem receptu menijo drugi.


🛠️ Tehnologije

Frontend: React (zadnja stabilna verzija – trenutno 18.2.0), CSS

Backend: Spring Boot (Java, zadnja stabilna verzija – trenutno 3.1.3)

Baza podatkov: MySQL (zadnja stabilna verzija – trenutno 8.0.34) za shranjevanje receptov

API: RESTful API, razvit z uporabo Spring Boot


🔧 Navodila za zaganjanje aplikacije

Backend: Prvič se se odpre cd gourmet-globe-backend in se tipka ukaz mvn spring-boot:run.

Frontend: Za zagon frontend aplikacije uporabite ukaz npm run dev v gourmet-globe-frontend.

Ce zelis da kot admin dodas nekateri recept, nima tipko za to, samo v url-ju dodas http://localhost:3000/admin-panel/add-recipe


🤝 Prispevki

Forknite repozitorij
git clone https://github.com/RIS/gourmet-globe.git
cd gourmet-globe


Ustvarite novo vejo (git checkout -b feature/YourFeature)

Zavežite svoje spremembe (git commit -m 'Dodaj novo funkcionalnost')

Pritisnite na vejo (git push origin feature/YourFeature)
Odprite pull request

Standardi
- Backend je pravilno strukturiran po slojih (controller, service, repository, entity, dto, mapper) in dobro sledi načelu ločitve odgovornosti. Uporaba Spring Boot anotacij je ustrezna, poimenovanje razredov sledi PascalCase, metod in spremenljivk camelCase, paketi pa so v lowercase, kar ustreza standardom Jave. Koda je čista in logično organizirana
- Frontend uporablja React in ima modularno zgradbo, kjer so komponente smiselno ločene. Uporaba funkcijskih komponent in hookov (useState, useEffect) je pravilna, poimenovanje komponent v PascalCase, funkcij in spremenljivk v camelCase, CSS razredov pa v kebab-case, kar sledi konvencijam React ekosistema

🌟 Zahvale
Velika zahvala kulinaričnim skupnostim po vsem svetu za navdih in avtentične recepte, ki omogočajo, da Gourmet Globe zaživi!

1. Vizija projekta

Vizija projekta:

Gourmet Globe je inovativna aplikacija, ki uporabnikom omogoča raziskovanje svetovne kulinarike in odkrivanje okusov iz različnih kultur. Namen aplikacije je poenostaviti dostop do avtentičnih receptov in kulinaričnih informacij, kar uporabnikom omogoča, da razširijo svoje kulinarične veščine in izkušnje.

Z Gourmet Globe želimo doseči:

Dostopnost: Omogočiti uporabnikom, da enostavno najdejo in sledijo receptom iz celega sveta, ne glede na njihove kuharske sposobnosti.

Izobraževanje: Povezati uporabnike z bogato kulinarično dediščino različnih kultur, kar spodbuja razumevanje in cenjenje raznolikosti okusov.

Skupnost: Ustvariti prostor, kjer lahko uporabniki delijo svoje izkušnje, ocene o receptih, kar krepi občutek skupnosti in sodelovanja.

Naša ciljna publika so ljubitelji hrane, domači kuharji in kulinarični navdušenci, ki želijo razširiti svoje znanje in izkušnje ter odkrivati nove okuse.


2. Besednjak
   
Besednjak:

Recept: Navodila za pripravo jedi, ki vključujejo seznam sestavin in postopke kuhanja.

Ocena: Mnenje uporabnika o receptu, izraženo s Like in Dislike.

Kulinarične tehnike: Posebne metode priprave hrane, ki se uporabljajo pri različnih receptih.

Sestavine: Hrana in materiali, potrebni za pripravo receptov.

Kategorija: Razvrstitev receptov glede na drzavo, npr. Slovenija, Makedonija...


3. Diagram primerov uporabe

Diagram primerov uporabe:

![gourmetglobedpu drawio](https://github.com/user-attachments/assets/e91583e6-8079-41b2-a8be-a17ec48ff5bd)



Opis primerov uporabe:

Iskanje receptov: Uporabnik lahko išče recepte po kategorijah, drzave.

Pregled receptov: Uporabnik si lahko ogleda podrobnosti o receptih, vključno s sestavinami in navodili za pripravo.

Dodajanje novih receptov (samo za admina): Admin lahko doda nove recepte, ki so vidni vsem uporabnikom.

Ocena recepta: Uporabnik lahko oceni obstoječe recepte.

Dodajanje novega admina (samo za admina): Admin lahko doda drugega admina za upravljanje vsebine na platformi.

[Primeri uporabe.docx](https://github.com/user-attachments/files/17806514/Primeri.uporabe.docx)

Opis razrednega diagrama
Razredni diagram prikazuje strukturo aplikacije Gourmet Globe in poudarja ključne razrede, njihove lastnosti, metode ter relacije med njimi. Tukaj so pojasnjene vloge in nameni posameznih razredov ter ključne metode za izvedbo funkcionalnosti.

Razred User / Vloga in namen:
Predstavlja uporabnike aplikacije, ki lahko iščejo, pregledajo in ocenjujejo recepte.
Ima funkcionalnost iskanja receptov glede na kriterije in možnost vpogleda v podrobnosti recepta.
Ključne metode:
searchRecipes(criteria: String): List
Omogoča uporabnikom iskanje receptov glede na izbrane kriterije (npr. država, sestavine).
viewRecipe(recipeId: int): Recipe
Vrne podrobnosti izbranega recepta.

Razred Admin / Vloga in namen:
Predstavlja administratorje aplikacije, ki lahko dodajajo, urejajo in brišejo recepte ter dodajajo nove administratorje.
Ključne metode:
addRecipe(recipe: Recipe): void
Omogoča dodajanje novih receptov.
deleteRecipe(recipeId: int): void
Briše recepte na podlagi identifikatorja.
addAdmin(admin: Admin): void
Dodaja nove administratorje.
deleteAdmin(adminId: int): void
Briše obstoječe administratorje.

Razred Recipe / Vloga in namen:
Predstavlja posamezen recept, ki vsebuje osnovne podatke, kot so ime, opis, sestavine in kategorija.
Ključne metode:
rateRecipe(feedback: Feedback): void
Omogoča ocenjevanje recepta prek povezave s povratnimi informacijami.
getDetails(): String
Vrne celotne podrobnosti o receptu, vključno s sestavinami in postopkom.

Razred Category / Vloga in namen:
Organizira recepte v kategorije (npr. države, vrste jedi) za lažje iskanje in filtriranje.
Ključne metode:
filterRecipes(categoryId: int): List<Recipe>
Vrne vse recepte, ki pripadajo določeni kategoriji.

Razred Feedback / Vloga in namen:
Zabeleži povratne informacije uporabnikov o receptih, vključno z oceno in komentarjem.
Ključne metode:
submitFeedback(user: User, recipe: Recipe): void
Omogoča uporabnikom oddajo ocen in komentarjev za recepte.

Relacije med razredi:
Relacija User – Feedback:
Vsak uporabnik lahko odda več povratnih informacij za različne recepte.
Relacija Admin – Recipe:
Administratorji imajo dostop za upravljanje receptov.
Relacija Recipe – Category:
Vsak recept pripada eni kategoriji, medtem ko lahko kategorija vsebuje več receptov.
Relacija Recipe – Feedback:
Recepti lahko vsebujejo več ocen in komentarjev.

Pomen metod za izvedbo funkcionalnosti:
Uporabniške metode (npr. searchRecipes, viewRecipe) omogočajo osnovno interakcijo z aplikacijo in so ključne za raziskovanje vsebine.
Administratorske metode (npr. addRecipe, deleteRecipe) zagotavljajo upravljanje vsebine, kar je bistveno za vzdrževanje baze podatkov receptov.
Metode za povratne informacije (npr. submitFeedback) omogočajo vključitev uporabniških mnenj in so ključne za gradnjo skupnosti in izboljšanje receptov.
Ta razredni diagram skupaj z opisanimi metodami ustrezno pokriva funkcionalnost aplikacije Gourmet Globe in prikazuje razmerja med glavnimi komponentami.

![image](https://github.com/user-attachments/assets/90bc278e-d515-48bb-8e01-1af521f85009)

Opis funkcionalnosti
Implementirali smo funkcionalnost interaktivne zemljevida sveta v obliki 3D globusa. Uporabniki lahko kliknejo na določeno državo na globusu in si ogledajo recepte hrane iz te države.

Kako funkcionalnost deluje
	Na strani se prikaže interaktivni globus.
	Uporabnik lahko vrti globus, da poišče željeno državo.
	Ko uporabnik klikne na določeno državo, se samodejno naložijo recepti hrane, specifični za to državo.
	Recepti so prikazani v vizualno privlačnem in preglednem formatu.
 
Kako preizkusiti funkcionalnost
   Prijavite se v sistem: Da bi uporabili to funkcionalnost, se prijavite z vašim uporabniškim računom.
	Dostop do zemljevida sveta: Kliknite na razdelek Zemljevid sveta v glavnem meniju.
   Interakcija z globusom:
   Kliknite in povlecite globus, da ga zavrtite.
   Kliknite na državo, ki vas zanima.
	Ogled receptov: Po kliku se samodejno naloži seznam receptov hrane iz izbrane države.

Če v bazi podatkov ni receptov za določeno državo, bo uporabnik prejel obvestilo s sporočilom, da recepti trenutno niso na voljo.
Za najboljšo izkušnjo priporočamo uporabo sodobnih brskalnikov (Chrome, Firefox, Edge).


