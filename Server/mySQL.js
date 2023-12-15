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

        connection.query('SELECT u.*, c.access_code AS id_classroom_code FROM users u LEFT JOIN classrooms c ON u.id_classroom = c.id', [], (errorQuery, results, fields) => {
            connection.release(); // Liberar la conexión al terminar la consultas

            if (errorQuery) {
                console.error('Error al ejecutar la consulta:', errorQuery);
                throw errorQuery;
            }
            callback(results);
        });
    });
}
function SelectClassroomId(id,callback) {
    pool.getConnection((error, connection) => {
        if (error) {
            console.error('Error al obtener la conexión del pool:', error);
            throw error;
        }

        connection.query('SELECT * FROM classrooms WHERE id = ?',id, (errorQuery, results, fields) => {
            connection.release(); // Liberar la conexión al terminar la consulta

            if (errorQuery) {
                console.error('Error al ejecutar la consulta:', errorQuery);
                throw errorQuery;
            }
            callback(results);
        });
    }); 
}
function SelectClassroom(access_code,callback) {
    pool.getConnection((error, connection) => {
        if (error) {
            console.error('Error al obtener la conexión del pool:', error);
            throw error;
        }

        connection.query('SELECT * FROM classrooms WHERE access_code = ?',access_code, (errorQuery, results, fields) => {
            connection.release(); // Liberar la conexión al terminar la consulta

            if (errorQuery) {
                console.error('Error al ejecutar la consulta:', errorQuery);
                throw errorQuery;
            }
            callback(results);
        });
    });
}

//Selecionar un usuari per la seva ID
function SelectUserById(id,callback) {
    pool.getConnection((error, connection) => {
        if (error) {
            console.error('Error al obtener la conexión del pool:', error);
            throw error;
        }      

        connection.query('SELECT U.*, C.name AS nomaula FROM users U,classrooms C WHERE U.id=? AND U.id_classroom=C.id',id, (errorQuery, results, fields) => {
            connection.release(); // Liberar la conexión al terminar la consulta

            if (errorQuery) {
                console.error('Error al ejecutar la consulta:', errorQuery);
                throw errorQuery;
            }
            callback(results);
        });
    });
}

function SelectClassrooms(id,callback) {
    pool.getConnection((error, connection) => {
        if (error) {
            console.error('Error al obtener la conexión del pool:', error);
            throw error;
        }

        connection.query('SELECT * FROM classrooms WHERE professor_id=?',id, (errorQuery, results, fields) => {
            connection.release(); // Liberar la conexión al terminar la consulta

            if (errorQuery) {
                console.error('Error al ejecutar la consulta:', errorQuery);
                throw errorQuery;
            }
            callback(results);
        });
    });
}

function SelectProfessors(callback) {
    pool.getConnection((error, connection) => {
        if (error) {
            console.error('Error al obtener la conexión del pool:', error);
            throw error;
        }

        connection.query('SELECT * FROM professors', [], (errorQuery, results, fields) => {
            connection.release(); // Liberar la conexión al terminar la consulta

            if (errorQuery) {
                console.error('Error al ejecutar la consulta:', errorQuery);
                throw errorQuery;
            }
            //console.log(results);
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

//Selecionar acces_code de Aulas
function SelectAccesCode(callback) {
    pool.getConnection((error, connection) => {
        if (error) {
            console.error('Error al obtener la conexión del pool:', error);
            throw error;
        }

        connection.query('SELECT access_code FROM classrooms', [], (errorQuery, results, fields) => {
            connection.release();

            if (errorQuery) {
                console.error('Error al ejecutar la consulta:', errorQuery);
                throw errorQuery;
            }
            callback(results);
        });
    });
}

//AÑADIR UNA AULA NUEVA
function InsertAula(valores, callback) {
    pool.getConnection((error, connection) => {
        if (error) {
            console.error('Error al obtener la conexión del pool:', error);
            throw error;
        }
       
        connection.query('INSERT INTO classrooms (professor_id, name, access_code) VALUES (?, ?, ?)', valores, (errorQuery, results, fields) => {
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

        connection.query('UPDATE users SET name = ?, surname = ?, email = ? WHERE id = ?', valores, (errorQuery, results, fields) => {
            connection.release(); // Liberar la conexión al terminar la consulta

            if (errorQuery) {
                console.error('Error al ejecutar la consulta:', errorQuery);
                throw errorQuery;
            }
            callback(results);
        });
    });
}
function UpdateImage(valores, callback) {
    pool.getConnection((error, connection) => {
        if (error) {
            console.error('Error al obtener la conexión del pool:', error);
            throw error;
        }

        connection.query('UPDATE users SET image = ? WHERE id = ?', valores, (errorQuery, results, fields) => {
            connection.release(); // Liberar la conexión al terminar la consulta

            if (errorQuery) {
                console.error('Error al ejecutar la consulta:', errorQuery);
                throw errorQuery;
            }
            callback(results);
        });
    });
}

//Quitar un usuario de una aula
function RemoveUserFromClassroom(id, callback) {
    pool.getConnection((error, connection) => {
        if (error) {
            console.error('Error al obtener la conexión del pool:', error);
            throw error;
        }

        connection.query('UPDATE users SET id_classroom = NULL WHERE id = ?', id, (errorQuery, results, fields) => {
            connection.release(); // Liberar la conexión al terminar la consulta

            if (errorQuery) {
                console.error('Error al ejecutar la consulta:', errorQuery);
                throw errorQuery;
            }
            callback(results);
        });
    });
}

function UpdateUserClassroom(valores, callback) {
    pool.getConnection((error, connection) => {
        if (error) {
            console.error('Error al obtener la conexión del pool:', error);
            throw error;
        }

        connection.query('UPDATE users SET id_classroom = ? WHERE id = ?', valores, (errorQuery, results, fields) => {
            connection.release(); // Liberar la conexión al terminar la consulta

            if (errorQuery) {
                console.error('Error al ejecutar la consulta:', errorQuery);
                throw errorQuery;
            }
            callback(results);
        });
    });
}
function selectLevel(level, callback) {
    pool.getConnection((error, connection) => {
        if (error) {
            console.error('Error al obtener la conexión del pool:', error);
            throw error;
        }

        connection.query('SELECT * FROM Levelsxp WHERE lvl = ?', level, (errorQuery, results, fields) => {
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
    SelectUsersByAula,
    SelectUserById,
    SelectEmails,
    SelectClassrooms,
    InsertUser,
    InsertAula,
    UpdateUser,
    selectLevel,
    SelectAccesCode, 
    SelectProfessors,
    RemoveUserFromClassroom,   
    UpdateImage,
    SelectClassroom,
    UpdateUserClassroom,
    SelectClassroomId
    // Puedes añadir más funciones según tus necesidades...
};
