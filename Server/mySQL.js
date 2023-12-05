const mysql = require('mysql');
module.exports = {conectar,cerrarConexion,getData,manageData, connection}

const connection = mysql.createPool({
    host: 'dam.inspedralbes.cat', 
    user: 'a22osczapmar_Usuario1', 
    password: 'Usuario1', 
    database: 'a22osczapmar_mathGame',
    connectionLimit: 20,
    queueLimit: 5,
    waitForConnections: true,
});
/*function conectar() {
    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                reject(err);
                return;
            }
            console.log('Conexión a la base de datos establecida correctamente');
            resolve();
        });
    });
}*/
function cerrarConexion() {
    return new Promise((resolve, reject) => {
        connection.end((err) => {
            if (err) {
                reject(err);
                return;
            }
            console.log('Conexión cerrada correctamente');
            resolve();
        });
    });
}
function getData(query) {
    return new Promise((resolve, reject) => {

        connection.query(query, function(err, data, fields) {

            if (err) {
                reject(err);
            } else {
                resolve(data); 
            }
        });   
    })
}
function manageData(query) {
    return new Promise((resolve, reject) => {

        connection.query(query, function(err, data, fields) {

            if (err) {
                reject(err); 
            } else {
                resolve("Query completada"); 
            }
        });
    });
}