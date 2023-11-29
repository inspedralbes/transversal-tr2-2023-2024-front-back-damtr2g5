const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const { getDocument, getPreguntas } = require("./mongoDB.js");
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});
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
    /*var respuesta = req.body.respuesta;
    var correcta = ejercicioMates.correcta;
    if(respuesta == correcta){
        res.json({"correcta":true});
    }else{
        res.json({"correcta":false});
    }*/
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
