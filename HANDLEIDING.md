# Trouwwebsite Jonas & Elke — activatie RSVP en cadeaulijst

Website: https://jonastimmerman12-glitch.github.io/trouw-jonas-elke/
Google Sheet: https://docs.google.com/spreadsheets/d/1NyGceQehQl5j6AuaN7dZYvdGOZCPw8oN45vI5CS7eew/edit

## Wat al werkt
- Gratis GitHub Pages-adres blijft `trouw-jonas-elke`.
- Botanische startpagina, navigatie en aftelklok.
- Planning zonder verzonnen uren, en een downloadbare save-the-date voor 25 juni 2027.
- Code voor RSVP met naam, aanwezigheid, aantal personen, allergieën/dieetwensen en bericht.
- Cadeaulijst met reserveringen onder een lock om dubbele reserveringen te voorkomen.

## Laatste activatie: Google Apps Script (eenmalig door eigenaar)
1. Open https://script.google.com/ terwijl je bent ingelogd bij het Google-account dat toegang heeft tot het trouwbeheer-Sheet.
2. Klik op **Nieuw project**. Open het bestand `Code.gs` en vervang de inhoud door het bestand `backend/Code.gs` uit deze repository.
3. Voeg via het plusteken naast Bestanden een **HTML**-bestand toe met de exacte naam `Interface`. Plak de inhoud van `backend/Interface.html` erin.
4. Klik op **Implementeren / Deploy → Nieuwe implementatie / New deployment → Web app**.
5. Kies **Uitvoeren als: ik / Execute as: Me** en **Toegang: Iedereen / Who has access: Anyone**. Dit is nodig om gasten zonder Google-login te laten invullen. Lees de gevraagde machtigingen en keur ze alleen goed als de rechten overeenkomen met de code. Houd het Google Sheet zelf privé.
6. Kopieer de URL die eindigt op `/exec`. Deel de Apps Script-editor en Google Sheet **niet** met gasten.
7. Open het bestand `config.js` in de GitHub-repository en klik op het potlood (Edit). Vervang de lege waarde bij `backendUrl: ''` met de /exec-URL tussen de enkele aanhalingstekens. Klik op Commit changes.
8. Open de website, ververs en klik op **Bevestig je aanwezigheid**. Doe een testinzending en controleer dat er een regel verschijnt op het tabblad **RSVP antwoorden**.
9. Vul één echt cadeau in op tabblad **Cadeaulijst**: kolom A naam, B omschrijving, C winkellink (https), D richtprijs, E Beschikbaar, F leeg. Bezoek **Bekijk en reserveer een cadeau**, reserveer met een testnaam en controleer dat kolom E `Gereserveerd` toont en F de naam.
10. Verwijder testantwoorden en maak testcadeaus weer beschikbaar indien nodig.

## Beheer
- RSVP-antwoorden zijn alleen zichtbaar in jullie privé-Google Sheet.
- Cadeaulijst is leeg totdat je minstens één echt cadeau toevoegt. De backend publiceert alleen naam, omschrijving, winkellink, richtprijs en beschikbaarheid; niet de naam van de reserverende gast.
- Geef gasten nooit schrijfrechten op het Sheet.
- De publieke webapp kan zonder login worden gebruikt, en heeft beperkte antispambeveiliging. Controleer af en toe op ongewenste inzendingen; hergebruik geen gevoelige informatie in de cadeaulijst.
- De website toont een verborgen knop tot een geldige /exec-URL is ingevuld.
- Huidig maximum voor één RSVP is 15 personen en er is nog geen unieke uitnodigingscontrole. Indien jullie toegang op uitnodiging willen, vraagt dit extra beveiliging.
- Na het aanpassen van `Code.gs` of `Interface.html` in Apps Script moet je opnieuw een versie implementeren via Manage deployments; wijzigingen in GitHub zijn niet automatisch wijzigingen in Apps Script.
- Er is nog geen adres van de Sint-Arnolduszaal ingevoerd. Vul pas een routeknop en exacte tijden in wanneer je ze hebt bevestigd.
