# Frontend Admin

Das Adminfrontend stellt alle Funktionen zur Verfügung, die das Restaurant nutzen können soll.
Da zum Benutzen dieses Frontends ein Account benötigt wird haben wir der Einfachheit halber einen Dummyaccount erstellt (im Deploy und in der Dockerversion des Backends)

    username: normaluser@gmail.de
    password: adsdfhjngegra

## Das Projekt starten

Im Docker:

    docker-compose up

Das Adminfrontend ist dann erreichbar auf Port [4002](http://localhost:4002/login)

Normal mit npm:

    npm i
    npm run start

Das Adminfrontend ist dann erreichbar auf Port [3000](http://localhost:3000/login)

Tests:
(Setzen das laufende Frontend über npm voraus)
    
    npm run cypress:run

oder

    npm run cypress:open


Component Tests:
(Setzen das laufende Frontend über npm voraus)

    npm run cypress:ct-run
    
oder

    npm run cypress:ct

## Deploy

Das gehostete Admin Frontend ist [hier](https://admin.dopeshot.coffee/login) erreichbar
