# VSOPS

Kurssiprojekti sovelluskehityskurssia varten. Projekti on valmistunut 30.11.2022.

Lataaminen:

1. Lataa kansio/kloonaa git.
2. Kansion sisällä on 2 kansiota, joista yksi on backend ja toinen frontend. Mene kumpaakin kansioon terminaalissa, ja kirjoita:

```
npm install
```

Se lataa kaikki tarvittavat moduulit ja riippuvuudet. Kansiossa backend kirjoita konsolissa

```
node app.js
```

Käynnistääksesi backend ja saadaksesi yhteys tietokantaan, kansiossa frontend kirjoita konsolissa

```
npm run dev
```

Käynnistääksesi verkkosivun. Kopioi konsolissa oleva localhost omaan nettiselaimeesi.

3. Jos tilauksia ei näy, pitää sinun luoda ".env" niminen tiedosto backend kansioon ja lisätä sinne tietokannan tiedot.
4. Olet valmis käyttämään ohjelmaamme VSOP.

# Ominaisuudet ja Käyttö

VSOPS-niminen sovelluksemme koostuu kahdesta osasesta, frontend ja backend. Frontend sisältää Vue.js framework tehdyn verkkosivut Node:lla, ja backend sisältää MongoDB yhteyden ja siihen tapahtuvat kyselyt/muutokset. VSOPS- etusivulla, eli "/"- sivulla on kotisivu. Päänavigoinnista pääsee muille sivuille ja tekemään tietokantahaun, joka tuo kaikki tilaukset kirjoitetun etunimen perusteella.

Tilaukset sivulla on tuotu tietokannasta kaikki tilaukset esille. Niitä voi järjestää päivämäärän tai statuksen mukaan. Jokainen tilaus on div elementin sisällä, ja kun painaa sinistä "Info"-nappia, päästään näkemään kyseisen tilauksen tiedot tarkemmin. Tässä tilaukset yksityistiedot sivulla voidaan muuttaa tilauksen statusta tai poistaa kyseinen tilaus.

# Kuvat

## ![Picture of the page](/frontend/public/readmepic1.png "Picture of page")

Course project for Application Development course. The project is currently work-in-progress.
