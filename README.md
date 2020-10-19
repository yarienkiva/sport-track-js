# M3104 WebJS : Sport-Track

> Aloïs de Souza & Boris Lickindorf - Groupe D

#### Installation

Lancez ``npm install`` dans les repertoires ``sport-track-db`` et ``express-webapp``.

#### Utilisation

Lancez simplement l'application en executant ``npm start`` dans le répertoire ``express-webapp``. 

Il vous faudra ensuite créer un utilisateur ou utiliser l'utilisateur``admin@sport-track.fr : Admin123`` pour vous connecter.



#### Upload de fichiers

Exemple de fichier ``.json`` à téléverser, ils doivent tous suivre la même structure.

```json
{
  "activity":{
    "date":"02/09/2018",
    "description": "RU -> IUT"
  },
  "data":[
    {"time":"15:25:12","cardio_frequency":81,"latitude":47.644793,"longitude":-2.776602,"altitude":18},
    {"time":"15:26:22","cardio_frequency":84,"latitude":47.646871,"longitude":-2.778913,"altitude":18},
    {"time":"15:27:32","cardio_frequency":88,"latitude":47.646192,"longitude":-2.780229,"altitude":18},
    {"time":"15:28:42","cardio_frequency":92,"latitude":47.646995,"longitude":-2.781068,"altitude":17},
    {"time":"15:29:52","cardio_frequency":95,"latitude":47.647863,"longitude":-2.781743,"altitude":16},
    {"time":"15:31:02","cardio_frequency":99,"latitude":47.648516,"longitude":-2.780144,"altitude":16}
  ]
}
```



