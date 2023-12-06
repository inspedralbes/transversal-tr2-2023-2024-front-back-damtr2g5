const express = require('express');
const http = require('http')
const bodyParser = require('body-parser');
const cors = require("cors");
const fs = require('fs');
const client = require('https');
const path = require('path');
const cookieParser = require('cookie-parser');
const mysqlConnection = require('./mySQL.js');
const corsOptions = {
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ['GET', 'POST', 'DELETE'],
    exposedHeaders: ['set-cookie', 'ajax-redirect'],
    preflightContinue: true,
    optionsSuccessStatus: 200,
};
const app = express();
const server = http.createServer(app);
const port = 3001;


const { getDocument, getCategorias, getPreguntas, getPregunta, insertInCollection, findRegisteredResult, findRegisteredResults,updateCollection, getActivities } = require("./mongoDB.js");
const { comprobarRectaLineal, requireLogin, getRemainingExp } = require("./utils.js");
const { connect } = require('http2');
const { Console } = require('console');
const { initializeSocket, filterRooms } = require("./socket.js");
initializeSocket(server, { cors: corsOptions });
const sessionMiddleware = require('./sessionMiddleware.js');

app.use(sessionMiddleware);
app.use(bodyParser.json());
app.use(cookieParser("mySecretKey"));
app.use(express.json())
app.use(cors(corsOptions));

server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});


app.get('/getRooms', (req, res) => {
    var page = req.query.page || 1;
    var itemsPerPage = req.query.itemsPerPage || 10;
    var sortBy = req.query.sortBy.replace(/\s/g, "") || "";
    var order = req.query.order.replace(/\s/g, "") || "";
    var search = req.query.search.replace(/\s/g, "") || "";
    
    roomsFilter = filterRooms(search, sortBy, order);

    var roomsToSend = roomsFilter.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    var response = {
        rooms: roomsToSend,
        totalRooms: roomsFilter.length
    }
    res.json(response);
});
app.get('/getEjercicio', (req, res) => {
    getDocument(1).then((document) => {
        getPreguntas(document.preguntas).then((preguntas) => {
            var ejercicio = {
                "id": document.id,
                "nombre": document.nombre,
                "preguntas": []
            }
            for (var i = 0; i < preguntas.length; i++) {

                if (preguntas[i].muestra) {
                    shuffleArray(preguntas[i].muestra);
                }
                if (preguntas[i].componentes) {
                    shuffleArray(preguntas[i].componentes);
                }
                if (preguntas[i].respuestas) {
                    shuffleArray(preguntas[i].respuestas);
                }

                // Remove ejercicio.preguntas[i].correcta
                delete preguntas[i].correcta;

                ejercicio.preguntas.push(preguntas[i]);
            }
            //console.log(ejercicio.preguntas);

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

app.get('/getCategorias',async (req,res) => {
    categorias = await getCategorias();
    res.json(categorias)
})

app.post('/getActivities/:tema', async (req,res) => {
    idTema = req.params.tema;
    ejercicios = await getActivities(idTema)
    console.log(ejercicios)
    res.json(ejercicios);
})

app.post('/pregunta', async (req, res) => {
    var pregunta = await getPregunta(req.body.idPregunta);
    res.json(pregunta);
})
app.get("/imagen/:nombreArchivo", (req, res) => {
    const nombreArchivo = req.params.nombreArchivo;
    const rutaImagen = path.join(__dirname, "avatars", nombreArchivo);
    res.sendFile(rutaImagen);
});

//Coger ejercicios respondidos
app.post('/getResueltas', (req, res) => {
    let idUsuario = req.body.userId
    let idEjercicio = req.body.ejercicioid
    console.log(idUsuario, idEjercicio);
    findRegisteredResults(idUsuario, idEjercicio).then((result) => {
        res.json(result)
    })
})
app.post('/getExpEjer', async (req, res) => {
    try {
        let idUsuario = req.body.userId;
        let idEjercicio = req.body.ejercicioid;
        let xp = 0;
        let result;
        if (idEjercicio == null) {
            result = await findRegisteredResults(idUsuario);
        } else {
            result = await findRegisteredResults(idUsuario, idEjercicio);
        }
        const ejercicios = result.filter(element => element.correcta === true);

        const promises = ejercicios.map(async visual => {
            const document = await getPregunta(visual.idPregunta);
            xp += document.experiencia;
        });


        await Promise.all(promises);
        const exp = {
            xp: xp
        };

        res.json(exp);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la experiencia.' });
    }
});

//Comprobar si pregunta respondida es correcta o no
app.post('/comprobarPregunta/:id', async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.session);
        let idUser = req.session.user.userId;
        respuesta = req.body.respuesta;
        let correcto = false;
        let preguntaid = 0;
        let pregunta = await getPregunta(parseInt(req.params.id));

        console.log("Formato recibido: ", pregunta.formato);
        preguntaid = pregunta.id;
        switch (pregunta.formato) {
            case "Seleccionar":
            case "Imagen":
                if (respuesta === pregunta.correcta) {
                    console.log("Selección correcta");
                    correcto = true
                } else {
                    console.log("Selección incorrecta");
                    correcto = false
                }
                break;
            case "Ordenar valores":
                console.log("Respuesta: ", respuesta);
                console.log("Correcta: ", pregunta.correcta);
                if (JSON.stringify(respuesta) === JSON.stringify(pregunta.correcta)) {
                    console.log("Selección correcta");
                    correcto = true
                } else {
                    console.log("Selección incorrecta");
                    correcto = false
                }
                break;

            case "Respuesta":
                if (pregunta.correcta.includes(respuesta)) {
                    correcto = true
                } else {
                    correcto = false
                }
                break;

            case "Grafica":
                respuesta = comprobarRectaLineal(respuesta[0], respuesta[1]);
                console.log("Respuesta: ", respuesta);
                console.log("Correcta: ", pregunta.correcta);
                if (respuesta.tipo === pregunta.correcta.tipo) {
                    console.log("Tipo correcto");
                    if (respuesta.tipo === "horizontal" && respuesta.y === pregunta.correcta.y) {
                        correcto = true
                    } else if (respuesta.tipo === "vertical" && respuesta.x === pregunta.correcta.x) {
                        correcto = true
                    } else if (respuesta.tipo === "lineal" && respuesta.m === pregunta.correcta.m && respuesta.b === pregunta.correcta.b) {
                        correcto = true
                    } else {
                        correcto = false
                    }
                } else {
                    correcto = false
                }
                break;

            case "Unir valores":
                const respuestaString = respuesta.map(arr => arr.join(',')).sort().join(';');
                const correctaString = pregunta.correcta.map(arr => arr.join(',')).sort().join(';');

                if (respuestaString === correctaString) {
                    correcto = true
                } else {
                    correcto = false
                }
                break;

            default:
                correcto = false // Handle default case
                break;
        }
        findRegisteredResult(idUser, req.body.ejercicioid, preguntaid).then((result) => {
            if (result != null) {
                if (!result.correcta && correcta) {
                    updateCollection(
                        { "idUsuario": idUser, "idPregunta": preguntaid, "idEjercicio": req.body.ejercicioid }, // Filtro para encontrar el usuario por su ID
                        {
                            "$set": {
                                "correcta": correcto,
                                "respuesta": req.body.respuesta
                            }
                        }, 'result')
                }
            } else {
                insertInCollection({ "idUsuario": idUser, "idPregunta": preguntaid, "idEjercicio": req.body.ejercicioid, "respuesta": req.body.respuesta, "correcta": correcto }, 'result')
            }
        })
        res.json({ "correct": correcto });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




//LOGIN SECTION
app.get('/getLogin', (req, res) => {

    if (req.session.user?.email) {
        res.json(req.session.user);
    } else {
        usuariIndividual = { email: "" };
        res.json(usuariIndividual);
    }
});
app.post('/login', async (req, res) => {
    try {
        console.log("Login:id-session", req.session);

        req.session.user = {};
        const login = req.body;
        let usuariIndividual = {};
        let comprovacio = false;

        mysqlConnection.SelectUsers((usuaris) => {
            console.log("Query completed. Data retrieved:", usuaris);
            for (const usuari of usuaris) {
                if (usuari.email == login.email) {
                    console.log("Mail trobat");
                    if (usuari.contrasena != login.contrasena) {
                        console.log("Usuari o contrasenya incorrectes");
                        usuariIndividual = { email: "" };
                    } else {
                        console.log("pwd trobat");
                        usuariIndividual = {
                            id: req.session.id,
                            userId: usuari.id,
                            name: usuari.nom,
                            surname: usuari.cognoms,
                            email: usuari.email,
                        };
                        req.session.user = usuariIndividual;
                        comprovacio = true;
                        console.log(usuariIndividual);
                        res.json(usuariIndividual);
                        return; // Exit the loop if user found
                    }
                }
            }

            if (!comprovacio) {
                usuariIndividual = { email: "" };
                res.json(usuariIndividual);
            }
        })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Login fallido");
    }
});
app.get('/logout', (req, res) => {
    const sessionId = req.session.id;
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar la sesión:', err);
            res.status(500).json({ message: 'Error al cerrar la sesión' });
        } else {
            console.log("Sesión cerrada");
            io.in(sessionId).disconnectSockets();

            res.clearCookie('connect.sid'); // Elimina la cookie de sesión
            res.status(200).send();
        }
    });
});

//REGISTER USER
app.post('/registrarUsuari', (req, res) => {
    usuariDades = req.body; // Assuming req.body contains user data
    let comprovacio = true;

    mysqlConnection.SelectEmails((emails) => {
        console.log("Query completed. Data retrieved:", emails);
        emails.forEach(email => {
            if (email.email === usuariDades.email) {
                console.log("Aquest mail ja està en ús");
                comprovacio = false;
            }
        });

        if (comprovacio) {
            mysqlConnection.InsertUser([usuariDades.name, usuariDades.surname, usuariDades.email, usuariDades.contrasena], ((result) => { return result }));
        } else {
            // Mail en uso
            res.status(403).send();
            throw new Error("Mail en uso");
        }
    })
        .then(successMessage => {
            console.log("Operación completada:", successMessage);
            res.status(200).send("Registro exitoso");
        })
        .catch(error => {
            console.error("Error:", error);
            res.status(500).send("Error en el registro");
        });
});

//UPDATE USER
app.post('/actualitzarUsuari', requireLogin, (req, res) => {
    dades = (req.body)
    comprovacio = true
    mysqlConnection.UpdateUser([dades.name, dades.surname, dades.email, dades.userId], (successMessage) => {
        console.log("Operación completada:", successMessage);
        req.session.user.name = dades.name;
        req.session.user.surname = dades.surname;
        req.session.user.email = dades.email;
        console.log("Usuario actualizado correctamente: ", result)
        res.status(200).send("Registro exitoso");
    })
        .catch(error => {
            console.error("Error:", error);
            res.status(500).send("Error en el registro");
        });

    res.status(200).send()
})
//GET USUARIOS
app.get('/consultarUsuaris', (req, res) => {
    mysqlConnection.SelectUsers((usuaris) => {
        usuarisEnviar = []
        usuaris.forEach(usuari => {
            usuariIndividual = { id: usuari.id, contrasena: usuari.contrasena, name: usuari.name, surname: usuari.cognoms, email: usuari.email }
            usuarisEnviar.push(usuariIndividual)
        })

        res.json(usuarisEnviar)
    })
        .catch(error => {
            console.error("Error:", error);
            // Manejar el error de alguna manera
        });
});

//MONGO
app.get('/getEjercicio', (req, res) => {
    getDocument(1).then((document) => {
        getPreguntas(document.preguntas).then((preguntas) => {
            var ejercicio = {
                "nombre": document.nombre,
                "preguntas": []
            }
            for (var i = 0; i < preguntas.length; i++) {
                console.log(preguntas[i]);
                ejercicio.preguntas.push(preguntas[i]);
            }
            res.json(ejercicio);
        });

    });



});

//idPregunta: 1, respuesta: "1111"
app.post('/pregunta', async (req, res) => {
    var pregunta = await getPregunta(req.body.idPregunta);
    res.json(pregunta);
})
//Añadir datos de ejercicio respondido a MongoDB
/*const actividad = {userId: 123 ,testId: 1234 , preguntasRespondidas:[
    {idPregunta: 1, respuestaCorrecta: true },
    {idPregunta: 2, respuestaCorrecta: false },
    // ... más preguntas respondidas
]};*/
//INCOMPLETE
/*app.post('/subirResultado', async (req, res) => {
    var idPregunta = req.body.preguntasRespondidas;
    var idActividad = req.body.testId
    var idUsuario = req.body.userId

    var experienciaGanada = 0
    getDocument(re.body.testId).then((activity) => {
        const expPerActivity = activity.exp / activity.preguntas.length
        preguntasRespondidas.forEach((pregunta) => {
            var response = {}
            var questLocate = findRegisteredResult(idUsuario, idActividad, pregunta.idPregunta)
            if (questLocate != null) {
                if (!questLocate.respuestaCorrecta && pregunta.respuestaCorrecta) { //Si la pregunta ya respondida anteriormente se resuelve, cambia el estado
                    response = { $set: { respuestaCorrecta: true } }
                    experienciaGanada += expPerActivity;
                    updateCollection(response, { idUsuario })
                }
            } else {
                response = { idUser: idUser, idActivity, idQuestion, respuestaCorrecta }
                insertInCollection()


            }
        })
    })

})*/
//Comprobar si pregunta respondida es correcta o no
app.post('/comprobarPregunta/:id', async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.session);
        let idUser = req.session.user.userId;
        respuesta = req.body.respuesta;
        let correcto = false;
        let preguntaid = 0;
        let pregunta = await getPregunta(parseInt(req.params.id));

        console.log("Formato recibido: ", pregunta.formato);
        preguntaid = pregunta.id;
        switch (pregunta.formato) {
            case "Seleccionar":
            case "Imagen":
                if (respuesta === pregunta.correcta) {
                    console.log("Selección correcta");
                    correcto = true
                } else {
                    console.log("Selección incorrecta");
                    correcto = false
                }
                break;
            case "Ordenar valores":
                console.log("Respuesta: ", respuesta);
                console.log("Correcta: ", pregunta.correcta);
                if (JSON.stringify(respuesta) === JSON.stringify(pregunta.correcta)) {
                    console.log("Selección correcta");
                    correcto = true
                } else {
                    console.log("Selección incorrecta");
                    correcto = false
                }
                break;

            case "Respuesta":
                respuesta = respuesta.replace(/\s/g, "").toLowerCase();
                if (pregunta.correcta.includes(respuesta)) {
                    correcto = true
                } else {
                    correcto = false
                }
                break;

            case "Grafica":
                respuesta = comprobarRectaLineal(respuesta[0], respuesta[1]);
                console.log("Respuesta: ", respuesta);
                console.log("Correcta: ", pregunta.correcta);
                if (respuesta.tipo === pregunta.correcta.tipo) {
                    console.log("Tipo correcto");
                    if (respuesta.tipo === "horizontal" && respuesta.y === pregunta.correcta.y) {
                        correcto = true
                    } else if (respuesta.tipo === "vertical" && respuesta.x === pregunta.correcta.x) {
                        correcto = true
                    } else if (respuesta.tipo === "lineal" && respuesta.m === pregunta.correcta.m && respuesta.b === pregunta.correcta.b) {
                        correcto = true
                    } else {
                        correcto = false
                    }
                } else {
                    correcto = false
                }
                break;

            case "Unir valores":
                const respuestaString = respuesta.map(arr => arr.join(',')).sort().join(';');
                const correctaString = pregunta.correcta.map(arr => arr.join(',')).sort().join(';');

                if (respuestaString === correctaString) {
                    correcto = true
                } else {
                    correcto = false
                }
                break;

            default:
                correcto = false // Handle default case
                break;
        }
        findRegisteredResult(idUser, req.body.ejercicioid, preguntaid).then((result) => {
            if (result != null) {
                if (!result.correcta && correcta) {
                    updateCollection(
                        { "idUsuario": idUser, "idPregunta": preguntaid, "idEjercicio": req.body.ejercicioid }, // Filtro para encontrar el usuario por su ID
                        {
                            "$set": {
                                "correcta": correcto,
                                "respuesta": req.body.respuesta
                            }
                        }, 'result')
                }
            } else {
                insertInCollection({ "idUsuario": idUser, "idPregunta": preguntaid, "idEjercicio": req.body.ejercicioid, "respuesta": req.body.respuesta, "correcta": correcto }, 'result')
            }
        })
        res.json({ "correct": correcto });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




//LOGIN SECTION
app.get('/getLogin', (req, res) => {

    if (req.session.user?.email) {
        res.json(req.session.user);
    } else {
        usuariIndividual = { email: "" };
        res.json(usuariIndividual);
    }
});
app.post('/login', async (req, res) => {
    try {
        console.log("Login:id-session", req.session);

        req.session.user = {};
        const login = req.body;
        let usuariIndividual = {};
        let comprovacio = false;

        mysqlConnection.SelectUsers((usuaris) => {
            console.log("Query completed. Data retrieved:", usuaris);
            for (const usuari of usuaris) {
                if (usuari.email == login.email) {
                    console.log("Mail trobat");
                    if (usuari.contrasena != login.contrasena) {
                        console.log("Usuari o contrasenya incorrectes");
                        usuariIndividual = { email: "" };
                    } else {
                        console.log("pwd trobat");
                        usuariIndividual = {
                            sessionId: req.session.id,
                            id: usuari.id,
                            name : usuari.name,
                            contrasena : usuari.contrasena,
                                        surname : usuari.surname,
                            email : usuari.email,
                                        rank : usuari.rank,
                                        lvl : usuari.lvl,
                                        image : usuari.image
                        };
                        req.session.user = usuariIndividual;
                        comprovacio = true;
                        console.log(usuariIndividual);
                        res.json(usuariIndividual);
                        return; // Exit the loop if user found
                    }
                }
            }

            if (!comprovacio) {
                usuariIndividual = { email: "" };
                res.json(usuariIndividual);
            }
        })
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Login fallido");
    }
});
app.get('/logout', (req, res) => {
    const sessionId = req.session.id;
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar la sesión:', err);
            res.status(500).json({ message: 'Error al cerrar la sesión' });
        } else {
            console.log("Sesión cerrada");
            io.in(sessionId).disconnectSockets();

            res.clearCookie('connect.sid'); // Elimina la cookie de sesión
            res.status(200).send();
        }
    });
});

//REGISTER USER
app.post('/registrarUsuari', (req, res) => {
    usuariDades = req.body; // Assuming req.body contains user data
    let comprovacio = true;

    mysqlConnection.SelectEmails((emails) => {
        console.log("Query completed. Data retrieved:", emails);
        emails.forEach(email => {
            if (email.email === usuariDades.email) {
                console.log("Aquest mail ja està en ús");
                comprovacio = false;
            }
        });

        if (comprovacio) {
            mysqlConnection.InsertUser([usuariDades.name, usuariDades.surname, usuariDades.email, usuariDades.contrasena], ((result) => { return result }));
        } else {
            // Mail en uso
            res.status(403).send();
            throw new Error("Mail en uso");
        }
    })
        .then(successMessage => {
            console.log("Operación completada:", successMessage);
            res.status(200).send("Registro exitoso");
        })
        .catch(error => {
            console.error("Error:", error);
            res.status(500).send("Error en el registro");
        });
});

//UPDATE USER
app.post('/actualitzarUsuari', requireLogin, (req, res) => {
    dades = (req.body)
    comprovacio = true
    mysqlConnection.UpdateUser([dades.name, dades.surname, dades.email, dades.userId], (successMessage) => {
        console.log("Operación completada:", successMessage);
        req.session.user.name = dades.name;
        req.session.user.surname = dades.surname;
        req.session.user.email = dades.email;
        console.log("Usuario actualizado correctamente: ", result)
        res.status(200).send("Registro exitoso");
    })
        .catch(error => {
            console.error("Error:", error);
            res.status(500).send("Error en el registro");
        });

    res.status(200).send()
})
//GET USUARIOS
app.get('/consultarUsuaris', (req, res) => {
    mysqlConnection.SelectUsers((usuaris) => {
        usuarisEnviar = []
        usuaris.forEach(usuari => {
            usuariIndividual = { id: usuari.id, contrasena: usuari.contrasena, name: usuari.name, surname: usuari.cognoms, email: usuari.email }
            usuarisEnviar.push(usuariIndividual)
        })

        res.json(usuarisEnviar)
    })
        .catch(error => {
            console.error("Error:", error);
            // Manejar el error de alguna manera
        });
});

//MONGO
app.get('/getEjercicio', (req, res) => {
    getDocument(1).then((document) => {
        getPreguntas(document.preguntas).then((preguntas) => {
            var ejercicio = {
                "nombre": document.nombre,
                "preguntas": []
            }
            for (var i = 0; i < preguntas.length; i++) {
                console.log(preguntas[i]);
                ejercicio.preguntas.push(preguntas[i]);
            }
            res.json(ejercicio);
        });

    });



});

//idPregunta: 1, respuesta: "1111"
app.post('/pregunta', async (req, res) => {
    var pregunta = await getPregunta(req.body.idPregunta);
    res.json(pregunta);
})
//Añadir datos de ejercicio respondido a MongoDB
/*const actividad = {userId: 123 ,testId: 1234 , preguntasRespondidas:[
    {idPregunta: 1, respuestaCorrecta: true },
    {idPregunta: 2, respuestaCorrecta: false },
    // ... más preguntas respondidas
]};*/
//INCOMPLETE
/*app.post('/subirResultado', async (req, res) => {
    var idPregunta = req.body.preguntasRespondidas;
    var idActividad = req.body.testId
    var idUsuario = req.body.userId

    var experienciaGanada = 0
    getDocument(re.body.testId).then((activity) => {
        const expPerActivity = activity.exp / activity.preguntas.length
        preguntasRespondidas.forEach((pregunta) => {
            var response = {}
            var questLocate = findRegisteredResult(idUsuario, idActividad, pregunta.idPregunta)
            if (questLocate != null) {
                if (!questLocate.respuestaCorrecta && pregunta.respuestaCorrecta) { //Si la pregunta ya respondida anteriormente se resuelve, cambia el estado
                    response = { $set: { respuestaCorrecta: true } }
                    experienciaGanada += expPerActivity;
                    updateCollection(response, { idUsuario })
                }
            } else {
                response = { idUser: idUser, idActivity, idQuestion, respuestaCorrecta }
                insertInCollection()


            }
        })
    })

})*/
//Comprobar si pregunta respondida es correcta o no
app.post('/comprobarPregunta', async (req, res) => {
    try {
        respuesta = req.body.respuesta;
        preguntas = await getPregunta(req.body.idPregunta);
        preguntas.forEach((pregunta) => {


            console.log("Formato recibido: ", pregunta.formato);

            if (pregunta.formato === "Seleccionar" || pregunta.formato === "Imagen" || pregunta.formato === "Ordenar valores") {
                if (respuesta === pregunta.correcta) {
                    console.log("Selección correcta")
                    res.json({ "correct": true });
                } else {
                    console.log("Selección incorrecta")
                    res.json({ "correct": false });
                }
            } else if (pregunta.formato === "Respuesta") {
                if (pregunta.correcta.includes(respuesta)) {
                    res.json({ "correct": true });
                } else {
                    res.json({ "correct": false });
                }
            } else if (pregunta.formato === "Grafica") {
                formatoRespuesta = comprobarRectaLineal(respuesta.x, respuesta.y)
                if (JSON.stringify(formatoRespuesta) == JSON.stringify(pregunta.correcta)) {
                    res.json({ "correct": true });
                }
                else {
                    res.json({ "correct": false });
                }
            } else if (pregunta.formato === "Unir valores") {
                const respuestaString = respuesta.map(arr => arr.join(',')).sort().join(';');
                const correctaString = pregunta.correcta.map(arr => arr.join(',')).sort().join(';');

                if (respuestaString === correctaString) {
                    res.json({ "correct": true });
                } else {
                    res.json({ "correct": false });
                }
            } else {
                res.json({ "correct": false }); // Handle default case
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});
