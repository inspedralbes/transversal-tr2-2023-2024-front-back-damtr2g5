const mysql = require('mysql2');


// Configuración del pool de conexiones a la base de datos
const pool = mysql.createPool({
    connectionLimit: 10, // Número máximo de conexiones en el pool
    host: 'dam.inspedralbes.cat',
    user: 'a22osczapmar_Usuario1',
    password: 'Usuario1',
    database: 'a22osczapmar_mathGame'
});

// Función para ejecutar consultas SQL utilizando el pool de conexiones
function ejecutarConsulta(sql, valores, callback) {
    pool.getConnection((error, connection) => {
        if (error) {
            console.error('Error al obtener la conexión del pool:', error);
            throw error;
        }

        connection.query(sql, valores, (errorQuery, results, fields) => {
            connection.release(); // Liberar la conexión al terminar la consulta

            if (errorQuery) {
                console.error('Error al ejecutar la consulta:', errorQuery);
                throw errorQuery;
            }
            callback(results);
        });
    });
}
function SelectUsers(callback) {
    pool.getConnection((error, connection) => {
        if (error) {
            console.error('Error al obtener la conexión del pool:', error);
            throw error;
        }

        connection.query('SELECT * FROM users', [], (errorQuery, results, fields) => {
            connection.release(); // Liberar la conexión al terminar la consulta

            if (errorQuery) {
                console.error('Error al ejecutar la consulta:', errorQuery);
                throw errorQuery;
            }
            callback(results);
        });
    });
}
function SelectEmails(callback) {
    pool.getConnection((error, connection) => {
        if (error) {
            console.error('Error al obtener la conexión del pool:', error);
            throw error;
        }

        connection.query('SELECT email FROM users', [], (errorQuery, results, fields) => {
            connection.release(); // Liberar la conexión al terminar la consulta

            if (errorQuery) {
                console.error('Error al ejecutar la consulta:', errorQuery);
                throw errorQuery;
            }
            callback(results);
        });
    });
}
function InsertUser(valores, callback) {
    pool.getConnection((error, connection) => {
        if (error) {
            console.error('Error al obtener la conexión del pool:', error);
            throw error;
        }

        connection.query('INSERT INTO users (name, surname, email, contrasena) VALUES (?, ?, ?, ?)', valores, (errorQuery, results, fields) => {
            connection.release(); // Liberar la conexión al terminar la consulta

            if (errorQuery) {
                console.error('Error al ejecutar la consulta:', errorQuery);
                throw errorQuery;
            }
            callback(results);
        });
    });
}
//UPDATE usuario SET name = ?, surname = ?, email = ? WHERE id = ?
function UpdateUser(valores, callback) {
    pool.getConnection((error, connection) => {
        if (error) {
            console.error('Error al obtener la conexión del pool:', error);
            throw error;
        }

        connection.query('UPDATE usuario SET name = ?, surname = ?, email = ? WHERE id = ?', valores, (errorQuery, results, fields) => {
            connection.release(); // Liberar la conexión al terminar la consulta

            if (errorQuery) {
                console.error('Error al ejecutar la consulta:', errorQuery);
                throw errorQuery;
            }
            callback(results);
        });
    });
}
module.exports = {
    ejecutarConsulta,
    SelectUsers,
    SelectEmails,
    InsertUser,
    UpdateUser
    // Puedes añadir más funciones según tus necesidades...
};
