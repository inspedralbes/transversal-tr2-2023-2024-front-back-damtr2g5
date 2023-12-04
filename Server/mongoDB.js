const user = "a22osczapmar";
const password = "Nitrome7.";
module.exports = { getDocument, getPreguntas, getPregunta, insertInCollection, findRegisteredResult, updateCollection, getCategorias, getActivities };
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
        
         const db = client.db(dbName);
         const col = db.collection("activity");
         // Find and return the document
         const filter = { "id": id };
         const document = await col.findOne(filter);
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
        const resultadoEncontrado = await col.findOne({},{idUser: id_user, idActivity: id_activity, idQuestion: id_pregunta})
        if (resultadoEncontrado == null) {
            return null
        }
        else {
            return resultadoEncontrado
        }
    } catch(err) {
        console.log(err.stack);
    }
}
async function findRegisteredResult(id_user, id_activity) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection("result");
        const resultadoEncontrado = await col.find({},{idUser: id_user, idActivity: id_activity}).toArray(function(err,result) {
            if (err) throw err;
            console.log("Resultados encontrados")
        })
        if (resultadoEncontrado.length == 0) {
            return null
        }
        else {
            return resultadoEncontrado
        }
    } catch(err) {
        console.log(err.stack);
    }
}
async function insertInCollection(data, collection){
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection(collection);
        col.insertOne(data, function(err, res) {
            if (err) throw err;
            console.log("1 result inserted")
        })
    } catch(err) {
        console.log(err.stack);
    }
}
async function updateCollection(data, conditionals, collection) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection(collection);
        col.updateOne(conditionals, data, function(err, res) {
            if (err) throw err;
            console.log("1 result updated")
        })
    } catch(err) {
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
        //Find question from collection
        
        const question = await col.find({"id":id}).toArray();
        console.log(question)
        return question;
    } catch (err) {
        console.log(err.stack)
    }
}