const user = "a22osczapmar";
const password = "Nitrome7.";
module.exports = { getDocument, getPreguntas, getPregunta, insertInCollection, findRegisteredResult, updateCollection, findRegisteredResults, getCategorias, getActivities };
const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string                                                                                                                                        
const url = `mongodb+srv://${user}:${password}@cluster0.uiii7nf.mongodb.net/`;

// Database Name
const dbName = 'mathGameMongo';

// Create a new MongoClient
const client = new MongoClient(url);
// Connect to the Atlas cluster
client.connect();

async function getDocument(id) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection("activity");
        // Find and return the document
        const filter = {"id": id};
        console.log("Inside Mongo Method:", id)
        const document = await col.findOne(filter);
        console.log("Inside Mongo Method:", document)
        return document;
    } catch (err) {
        console.log(err.stack);
    }
}

async function getActivities(theme) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection("activity");
        const filter = { "id_tema": parseInt(theme)};
        const resultadoEncontrado = await col.find(filter).toArray();
        
        console.log(resultadoEncontrado); 

        return resultadoEncontrado; 
    } catch (err) {
        console.log(err.stack);
        return null; 
    }
}
async function getCategorias() {
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection("theme");
        const resultadoEncontrado = await col.find({}).toArray();
        
        console.log(resultadoEncontrado); 

        return resultadoEncontrado; 
    } catch (err) {
        console.log(err.stack);
        return null; 
    }
}

async function findRegisteredResult(id_user, id_activity, id_pregunta) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection("result");
        const resultadoEncontrado = await col.findOne({
            idUsuario: id_user,
            idEjercicio: id_ejercicio,
            idPregunta: id_pregunta
        });

        if (!resultadoEncontrado) {
            console.log("Documento no encontrado");
            return null;
        }

        console.log("Resultado encontrado:", resultadoEncontrado);
        return resultadoEncontrado;
    } catch (err) {
        console.log(err.stack);
        return null;
    }
}

async function findRegisteredResults(id_user, id_ejercicio) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection("result");
        let resultadoEncontrado = null
        if (id_ejercicio == null) {
            resultadoEncontrado = await col.find({ idUsuario: id_user }).toArray(function (err, resultado) {
                if (err) {
                    console.error('Error al realizar la consulta:', err);
                    return;
                }
                console.log('Resultado:', resultado)
            });
        } else {
            resultadoEncontrado = await col.find({ idUsuario: id_user, idEjercicio: id_ejercicio }).toArray(function (err, resultado) {
                if (err) {
                    console.error('Error al realizar la consulta:', err);
                    return;
                }
                console.log('Resultado:', resultado)
            });
        }

        return resultadoEncontrado;
    } catch (err) {
        console.log(err.stack);
        return null;
    }
}

async function insertInCollection(data, collection) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection(collection);
        col.insertOne(data, function (err, res) {
            if (err) throw err;
            console.log("1 result inserted")
        })
    } catch (err) {
        console.log(err.stack);
    }
}
async function updateCollection(conditionals, data, collection) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection(collection);
        col.updateOne(conditionals, data, function (err, res) {
            if (err) throw err;
            console.log("1 result updated")
        })
    } catch (err) {
        console.log(err.stack);
    }
}

async function getPreguntas(preguntas) {
    try {
        // Connect to the Atlas cluster
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection("question");
        // Find and return the document
        const filter = { "id": { $in: preguntas } };
        const document = await col.find(filter).toArray();
        return document;
    } catch (err) {
        console.log(err.stack);
    }
}

async function getPregunta(id) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection("question");

        const question = await col.findOne({ "id": id });
        //console.log(question)
        return question;
    } catch (err) {
        console.log(err.stack)
    }
}