const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const { getDocument, getPreguntas } = require("./mongoDB.js");
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});
var ejercicioMates = {
    "_id": {
      "$oid": "6565b24d6f122bd6cf8e9f24"
    },
    "id": 1,
    "nombre": "Práctica general",
    "tipo": "practica",
    "id_tema": null,
    "preguntas": [
      1,
      2,
      4,
      5
    ],
    "xp": 200
  }
var pregunta1 = {
    "_id": {
      "$oid": "6565b1a56f122bd6cf8e9f0b"
    },
    "id": 1,
    "pregunta": "¿Cuál es el resultado de 5 + 3 * 2?",
    "respuestas": [
      {
        "respuesta": "11"
      },
      {
        "respuesta": "16"
      },
      {
        "respuesta": "13"
      },
      {
        "respuesta": "10"
      }
    ],
    "correcta": "16",
    "idTema": 1,
    "formato": "Seleccionar"
  }
var pregunta2 = {
    "_id": {
      "$oid": "6565b1a56f122bd6cf8e9f0c"
    },
    "id": 2,
    "pregunta": "Resuelve la ecuación: 2x + 5 = 17",
    "correcta": [
      "x = 6",
      "x= 6",
      "x =6",
      "x=6"
    ],
    "idTema": 2,
    "formato": "Respuesta"
  }
var pregunta3 = {
    "_id": {
      "$oid": "6565b1a56f122bd6cf8e9f0d"
    },
    "id": 3,
    "pregunta": {
      "texto": "Representa la función y = 3x + 2 en un gráfico"
    },
    "respuestas": [
      {
        "respuesta": "Gráfico generado"
      }
    ],
    "correcta": "Gráfico generado",
    "idTema": "3",
    "formato": "Grafico"
  }
var pregunta4 = {
    "_id": {
      "$oid": "6565b1a56f122bd6cf8e9f0e"
    },
    "id": 4,
    "pregunta": "Convierte a metros las siguientes unidades",
    "respuestas": [
      [
        "50 kilómetros",
        "50000 metros"
      ],
      [
        "5 decimetros",
        "0.5 metros"
      ],
      [
        "50 hectómetros",
        "5000 metros"
      ],
      [
        "5 milímetros",
        "0.005 metros"
      ]
    ],
    "muestra": [
      [
        "50 kilómetros",
        "0.005 metros"
      ],
      [
        "5 decimetros",
        "50000 metros"
      ],
      [
        "5 milímetros",
        "0.5 metros"
      ],
      [
        "50 hectómetros",
        "5000 metros"
      ]
    ],
    "correcta": "50000 metros",
    "idTema": "4",
    "formato": "Unir valores"
  }
  var pregunta5 = {
    "_id": {
      "$oid": "6565b1a56f122bd6cf8e9f0f"
    },
    "id": 5,
    "pregunta": "Calcula el área de un triángulo con base de 6 unidades y altura de 8 unidades",
    "respuestas": [
      {
        "respuesta": "24 unidades cuadradas"
      },
      {
        "respuesta": "30 unidades cuadradas"
      },
      {
        "respuesta": "40 unidades cuadradas"
      },
      {
        "respuesta": "12 unidades cuadradas"
      }
    ],
    "correcta": "24 unidades cuadradas",
    "idTema": "5",
    "formato": "Seleccionar"
  }
app.get('/getEjercicio',(req,res) => {
    getDocument().then((document) => {
        getPreguntas(document.preguntas).then((preguntas) => {
            var ejercicio = {
                "nombre": document.nombre,
                "preguntas": []
            }
            for(var i = 0; i < preguntas.length; i++){
                console.log(preguntas[i]);
                ejercicio.preguntas.push(preguntas[i]);
            }
            res.json(ejercicio);
        });
        
    });
    
    
    
});

app.post('/comprobarPregunta',(req,res) => {
    var respuesta = req.body.respuesta;
    var correcta = ejercicioMates.correcta;
    if(respuesta == correcta){
        res.json({"correcta":true});
    }else{
        res.json({"correcta":false});
    }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
