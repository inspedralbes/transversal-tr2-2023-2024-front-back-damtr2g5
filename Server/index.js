const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const cors = require('cors');
const { getDocument, getPreguntas, getPregunta, insertInCollection, findRegisteredResult, updateCollection } = require("./mongoDB.js");
const { comprobarRectaLineal } = require("./utils.js");
app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/getEjercicio',(req,res) => {
    getDocument(1).then((document) => {
        getPreguntas(document.preguntas).then((preguntas) => {
            var ejercicio = {
                "nombre": document.nombre,
                "preguntas": []
            }
            for(var i = 0; i < preguntas.length; i++){
                console.log(i,preguntas[i]);

                if (preguntas[i].muestra) {
                    shuffleArray(preguntas[i].muestra);
                }
                if (preguntas[i].componentes) {
                    shuffleArray(preguntas[i].componentes);
                }
                if (preguntas[i].respuestas) {
                    shuffleArray(preguntas[i].respuestas);
                }

                ejercicio.preguntas.push(preguntas[i]);
            }
            res.json(ejercicio);
        });

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        
    });
    
    
    
});

//idPregunta: 1, respuesta: "1111"
app.post('/pregunta', async (req,res) => {
    var pregunta  = await getPregunta(req.body.idPregunta);
    res.json(pregunta);
})
//Añadir datos de ejercicio respondido a MongoDB
/*const actividad = {userId: 123 ,testId: 1234 , preguntasRespondidas:[
    {idPregunta: 1, respuestaCorrecta: true },
    {idPregunta: 2, respuestaCorrecta: false },
    // ... más preguntas respondidas
]};*/
app.post('/subirResultado', async (req,res) => {
    var idPregunta = req.body.preguntasRespondidas;
    var idActividad = req.body.testId
    var idUsuario = req.body.userId
    
    var experienciaGanada = 0
    getDocument(re.body.testId).then((activity) =>{
        const expPerActivity = activity.exp / activity.preguntas.length 
        preguntasRespondidas.forEach((pregunta)=> {
            var response = {}
            var questLocate = findRegisteredResult(idUsuario,idActividad,pregunta.idPregunta)
            if (questLocate!= null) {
                if(!questLocate.respuestaCorrecta && pregunta.respuestaCorrecta) { //Si la pregunta ya respondida anteriormente se resuelve, cambia el estado
                    response = {$set:{respuestaCorrecta:true}}
                    experienciaGanada += expPerActivity;
                    updateCollection(response,{idUsuario})
                }
            } else{
                response = {idUser,idActivity,idQuestion,respuestaCorrecta}
                insertInCollection()


            }
        })
    })
    
    actividad.forEach(element => {
        if (findRegisteredResult(idUsuario,)) {}
    });
    preguntas = req.body.preguntas //Preguntas respondidas

    numPreguntas = preguntas.length;
    expPerEx = actividadModel.exp / numPreguntas;
    
    resultado = 
    {
        "idUser": idUsuario, 
        "idActivity": idActividad, 
        "preguntas":[], 
        "expRestante":1
    }
    if (!findRegisteredResult(idActividad, idUsuario)) {
        insertInCollection(resultado,'result')
    } else {

        query = { idActivity: idActividad, idUser: idUsuario};
        updateCollection(query, resultado,'result')
    }

})
//Comprobar si pregunta respondida es correcta o no
app.post('/comprobarPregunta/:id', async (req, res) => {
    try {
        console.log(req.body.respuesta);
        console.log(req.params.id);
        respuesta = req.body.respuesta;       
        preguntas = await getPregunta((parseInt(req.params.id)));
        console.log("Preguntas: ",preguntas);
        preguntas.forEach((pregunta) => {
            console.log("Formato recibido: ", pregunta.formato);

            switch (pregunta.formato) {
                case "Seleccionar":
                case "Imagen":
                    if (respuesta === pregunta.correcta) {
                        console.log("Selección correcta");
                        res.json({ "correct": true });
                    } else {
                        console.log("Selección incorrecta");
                        res.json({ "correct": false });
                    }
                    break;
                case "Ordenar valores":
                    console.log("Respuesta: ", respuesta);
                    console.log("Correcta: ", pregunta.correcta);
                    if (JSON.stringify(respuesta) === JSON.stringify(pregunta.correcta)) {
                        console.log("Selección correcta");
                        res.json({ "correct": true });
                    } else {
                        console.log("Selección incorrecta");
                        res.json({ "correct": false });
                    }
                    break;

                case "Respuesta":
                    if (pregunta.correcta.includes(respuesta)) {
                        res.json({ "correct": true });
                    } else {
                        res.json({ "correct": false });
                    }
                    break;

                case "Grafica":
                    respuesta = comprobarRectaLineal(respuesta[0], respuesta[1]);
                    console.log("Respuesta: ", respuesta);
                    console.log("Correcta: ", pregunta.correcta);
                    if (respuesta.tipo === pregunta.correcta.tipo) {
                        console.log("Tipo correcto");
                        if (respuesta.tipo === "horizontal" && respuesta.y === pregunta.correcta.y) {
                            res.json({ "correct": true });
                        } else if (respuesta.tipo === "vertical" && respuesta.x === pregunta.correcta.x) {
                            res.json({ "correct": true });
                        } else if (respuesta.tipo === "lineal" && respuesta.m === pregunta.correcta.m && respuesta.b === pregunta.correcta.b) {
                            res.json({ "correct": true });
                        } else {
                            res.json({ "correct": false });
                        }
                    } else {
                        res.json({ "correct": false });
                    }
                    break;

                case "Unir valores":
                    const respuestaString = respuesta.map(arr => arr.join(',')).sort().join(';');
                    const correctaString = pregunta.correcta.map(arr => arr.join(',')).sort().join(';');

                    if (respuestaString === correctaString) {
                        res.json({ "correct": true });
                    } else {
                        res.json({ "correct": false });
                    }
                    break;

                default:
                    res.json({ "correct": false }); // Handle default case
                    break;
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

function calculateDifferenceExp() {

}