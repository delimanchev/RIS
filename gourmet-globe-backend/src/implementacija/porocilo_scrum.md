# Scrum Poročilo

## Sprint 1: Prilagoditev sestavin glede na število porcij

### Sprint Goal
Omogočiti prilagoditev količin sestavin glede na število porcij, da uporabniki lahko pripravijo točno število porcij, ki jih potrebujejo, s prilagoditvijo sestavin v realnem času.

---

### Sprint Backlog
1. *Urejanje baze in API podpore*
   - Dodajanje polja recipe_ingredients in recipe_persons v bazo.
   - Posodobitev API-ja za podporo dinamičnega izračuna sestavin.
2. *Implementacija funkcionalnosti na frontendu*
   - Dodajanje prilagoditvene UI komponente za število porcij.
   - Povezava frontend komponente z API-jem.
3. *Testiranje vseh komponent*
   - Unit testi za backend funkcionalnosti.
   - Popravki manjših napak.
   - End-to-end testiranje.

---

### Sprint Napredek
#### *Datum: 08. 12. 2024*

- *Database Update*:
  - *To Do*: Na začetku sprinta je bilo potrebno dodati polje recipe_ingredients in recipe_persons v bazo in posodobiti API za izračun sestavin glede na število porcij.
  - *In Progress*: Po nekaj urah razvoja je bila logika za izračun sestavin pripravljena, vendar so bile potrebne dodatne validacije.

### Sprint Napredek
#### *Datum: 09. 12. 2024*

- *Database Update*:
  - *Done*: Po uspešnem testiranju in vključitvi enotnih ter integracijskih testov, je bila naloga zaključena.
  - *Status*: Zaključeno (Done).
  - *Komentar*: Vse enote in integracijski testi so uspešno prestali validacijo. Baza je zdaj pripravljena za dinamične izračune.

- *Frontend UI*:
  - *To Do*: Na začetku sprinta je bilo načrtovano dodajanje komponent za prilagoditev števila porcij.
  - *In Progress*: Komponenta za prilagoditev porcij je bila implementirana z Material-UI za vizualno skladnost, vendar povezava z API-jem še ni delovala brez napak.
  - *Komentar*:Potrebna optimizacija za sinhronizacijo podatkov v realnem casu.

- *Testing*:
  - *To Do*: Na začetku sprinta so bili predvideni testi za backend in popravki manjših napak.
  - *In Progress*: Unit testi za backend še niso bili izvedeni, vendar so bile manjše napake odstranjene.
  - *Komentar*: Nekatere države ne morejo vnesti recepta, ker imajo v sebi republiko, ta beseda ni dodana.
  - *Komentar*: Še vedno nedokončana koda za preverjanje unit testi na backendu.
 
  ### Sprint Napredek
  #### *Datum: 10. 12. 2024*
- *Frontend UI*:
  - *In Progress*: Po nekaj urah dela so bile narejene izboljšave, vendar je še vedno potrebna optimizacija za sinhronizacijo podatkov v realnem času.
  - *Status*: V delu (Done).
  - *Komentar*: Zdaj stran deluje dobro in lahko vnesemo želeno število obrokov.

- *Testing*:
  - *To Do*: Popravki manjših napak na spletnoj strani še niso bile v celoti zaključene.
  - *To Do*: Unit testi za backend
  -*In Progress*:Spremembe nekaterih imen držav
  -*In Progress*:Delovanje unit testi na backendu
  - *Status*: Napake so bile odpravljene in so unit testi na backendu izvedeni in so imena drzava spremenjene.(Done)
  - *Komentar*: Backend testi in spletna stran delajo brez napak.
---

### Sprint Challenges
- *Težave pri API integraciji*:
  - Težava je bila odpravljena z dodatnimi validacijami na backendu.
- *Sinhronizacija med člani ekipe*:
  - Zaradi različnih časovnih con je prišlo do zamud pri pregledu pull requestov.

---

### Lessons Learned
- *Izboljšave pri načrtovanju*:
  - Podrobnejša razdelitev nalog bi omogočila paralelno delo.
- *Komunikacija*:
  - Rednejši pregledi stanja nalog in sinhronizacija bi zmanjšali tveganje za zamude.
- *Test Driven Development (TDD)*:
  - Uporaba TDD bi lahko pomagala pri hitrejši identifikaciji napak v zgodnejših fazah razvoja.