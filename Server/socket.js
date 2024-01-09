const socketIo = require('socket.io');
const rooms = require('./rooms.js');
const mysqlConnection = require('./mySQL.js');
const sessionMiddleware = require('./sessionMiddleware.js');
const { checkQuestion, calcularTiempoTranscurrido, obtenerFechaYHoraActual } = require('./utils.js')
const { getPregunta, insertInCollection } = require('./mongoDB.js');
const e = require('express');
let io;
function initializeSocket(server, cors) {
    io = socketIo(server, cors);

    io.engine.use(sessionMiddleware)

    io.on('connection', (socket) => {
        console.log("a user connected", socket.request.session.id);

        socket.join(socket.request.session.id);
        socket.on('createRoom', (room) => {
            room.players = 1;
            room.started = false;
            room.owner = socket.request.session.user?.email || "???"; // TODO: Change this to the user's name
            room.ownerId = socket.request.session.id;
            room.users = [];
            room.users.push({
                id: socket.request.session.id, email: socket.request.session.user?.email || "???",
                image: socket.request.session.user?.image, level: socket.request.session.user?.lvl, preguntas: []
            });
            room.starttime = ''
            room.endtime = ''       
            console.log("socket rooms", socket.rooms);
            socket.join("GameRoom-" + socket.request.session.id);
            created = rooms.addRoom(room, socket.request.session.id);
            if (created) {
                io.to(socket.request.session.id).emit("roomCreated", room);
            } else {
                io.to(socket.request.session.id).emit("roomNotCreated", room);
            }
            console.log("rooms", rooms.getRooms());
        });

        socket.on('joinRoom', (room) => {
            roomsFilter = rooms.getRooms().filter((r) => r.id === room.id)[0];
            //check if room is private and if password is correct
            if (roomsFilter.private && room.password !== roomsFilter.password) {
                console.log("wrong password");
                io.to(socket.request.session.id).emit("wrongPassword", room);
                return;
            }
            //check if user is already in room
            if (rooms.getRoom(room.id).users.find((u) => u.id === socket.request.session.id)) {
                io.to(socket.request.session.id).emit("alreadyJoined", room);
                return;
            }
            //check if room has started
            if (rooms.getRoom(room.id).started) {
                io.to(socket.request.session.id).emit("roomNotJoined", room);
                return;
            }
            socket.join(room.id);
            joined = rooms.joinRoom(room, {
                id: socket.request.session.id, email: socket.request.session.user?.email || "???",
                image: socket.request.session.user?.image, level: socket.request.session.user?.lvl, preguntas: []
            });
            if (joined) {
                io.to(socket.request.session.id).emit("roomJoined", room);
            } else {
                io.to(socket.request.session.id).emit("roomNotJoined", room);
            }
        });
        socket.on('joinTeam', (team) => {
            console.log("socket rooms", socket.rooms);
            const room = rooms.getRoom(team.roomId);
            room.users.forEach((user) => {
                if (user.id === socket.request.session.id) {
                    if (user.team === 0) {
                        const team1Count = room.users.filter((u) => u.team === 1).length;
                        const team2Count = room.users.filter((u) => u.team === 2).length;
                        user.team = (team1Count <= team2Count) ? 1 : 2;
                    }
                    user.team = team.team;
                    const teams = {
                        team1: [],
                        team2: [],
                    };
                    room.users.forEach((user) => {
                        if (user.team === 1) {
                            teams.team1.push(user);
                        } else if (user.team === 2) {
                            teams.team2.push(user);
                        }
                    });
                    io.to(team.roomId).emit("teamUsers", teams);
                }
            });            
            console.log("joinTeam", rooms.getRoom(team.roomId));
        });

        socket.on('getTeamUsers', (room) => {
            teams = {
                team1: [],
                team2: [],
            };
            rooms.getRoom(room.id).users.forEach((user) => {
                if (user.team === 1) {
                    teams.team1.push(user);
                } else if (user.team === 2) {
                    teams.team2.push(user);
                }
            });
            io.to(socket.request.session.id).emit("teamUsers", teams);
        });

        socket.on('disconnecting', () => {
            rooms.getRooms().forEach((room) => {
                if (room.users.find((u) => u.id === socket.request.session.id)) {
                    u = room.users.find((u) => u.id === socket.request.session.id);
                    io.to(room.id).emit("userLeft", u);
                }
                removedFrom = rooms.removeUser(socket.request.session.id);
                console.log("removedFrom", removedFrom);
                if(socket.request.session.id === room.ownerId && room.started === false){
                    rooms.removeRoom(room.id);
                    io.to(room.id).emit("roomDeleted", room);
                }
                
            });
        });

        socket.on('startGame', (room) => {
            if (socket.request.session.id !== room.ownerId) return;
            console.log("startGame", room.id);
            rooms.getRoom(room.id).started = true;
            team1hp = 0;
            const team1Users = rooms.getRoom(room.id).users.filter((u) => u.team === 1);
            const team1Promises = team1Users.map((u) => {
                return new Promise((resolve) => {
                    mysqlConnection.selectLevel(u.level, (results) => {
                        team1hp += results[0].health;
                        resolve();
                    });
                });
            });
            team2hp = 0;
            const team2Users = rooms.getRoom(room.id).users.filter((u) => u.team === 2);
            const team2Promises = team2Users.map((u) => {
                return new Promise((resolve) => {
                    mysqlConnection.selectLevel(u.level, (results) => {
                        team2hp += results[0].health;
                        resolve();
                    });
                });
            });
            Promise.all([...team1Promises, ...team2Promises]).then(() => {
                rooms.getRoom(room.id).teams = {
                    team1: [
                        {
                            hp: team1hp,
                            maxHp: team1hp,
                        }
                    ],
                    team2: [
                        {
                            hp: team2hp,
                            maxHp: team2hp,
                        }
                    ],
                };
                io.to(room.id).emit("startingGame", room);

                //wait 5 seconds
                setTimeout(() => {
                    io.to(room.id).emit("gameStarted", rooms.getRoom(room.id));
                    let inicio = obtenerFechaYHoraActual()
                    rooms.getRoom(room.id).starttime = inicio
                    console.log("INICIO " + room.starttime);
                }, 5000);
            });
        });

        socket.on('checkAnswer', (data) => {
            getPregunta(data.question.id)
                .then((pregunta) => {
                    answer = data.answer;
                    let room = data.room;
                    console.log("to check", data.question, answer);
                    correcto = checkQuestion(data.question, answer);
                    io.to(socket.request.session.id).emit("answerChecked", { "correct": correcto });
                    if (correcto) {
                        team = rooms.getRoom(room.id).users.find((u) => u.id === socket.request.session.id).team;
                        room.users.filter((u) => u.id === socket.request.session.id).answers++
                        if (team === 1) {
                            rooms.getRoom(room.id).teams.team2[0].hp -= 1;
                        } else if (team === 2) {
                            rooms.getRoom(room.id).teams.team1[0].hp -= 1;
                        }
                        io.to(room.id).emit("updateTeams", rooms.getRoom(room.id));
                    }
                    rooms.getRoom(room.id).users.filter((u)=>u.id===socket.request.session.id)[0].preguntas.push({"pregunta":pregunta.id,"correcta":correcto})

                    console.log("team1 hp ", rooms.getRoom(room.id).teams.team1[0].hp);
                    console.log("team2 hp", rooms.getRoom(room.id).teams.team2[0].hp);
                    if (rooms.getRoom(room.id).teams.team1[0].hp <= 0 || rooms.getRoom(room.id).teams.team2[0].hp <= 0) {
                        rooms.getRoom(room.id).winner = (rooms.getRoom(room.id).teams.team1[0].hp <= 0) ? 2 : 1;
                        io.to(room.id).emit("gameFinished", rooms.getRoom(room.id));
                        let fin = obtenerFechaYHoraActual()
                        rooms.getRoom(room.id).endtime = fin

                        let equipo1 =  rooms.getRoom(room.id).users.filter((u)=>u.team===1)
                        const resultado1 = equipo1.map(item => {
                            return {
                                email: item.email,
                                preguntas: item.preguntas
                            };
                        });
                        let equipo2 =  rooms.getRoom(room.id).users.filter((u)=>u.team===2)
                        const resultado2 = equipo2.map(item => {
                            return {
                                email: item.email,
                                preguntas: item.preguntas
                            };
                        });
                        let batalla = {
                            "battle": rooms.getRoom(room.id).name,
                            "ganador": rooms.getRoom(room.id).winner,
                            "equipo1": resultado1,
                            "equipo2": resultado2,
                            "matchsize": rooms.getRoom(room.id).players,
                            "experiencia": 5 * rooms.getRoom(room.id).players,
                            "time": rooms.getRoom(room.id).starttime,
                            "duration": calcularTiempoTranscurrido(rooms.getRoom(room.id).starttime, rooms.getRoom(room.id).endtime)
                        }
                        insertInCollection(batalla, 'Battles')
                    }
                })
                .catch((error) => {
                    console.error("Error getting pregunta:", error);
                });
        });

        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
    });

    io.of("/").adapter.on("create-room", (room) => {
        console.log(`room ${room} was created`);
    });

    io.of("/").adapter.on("delete-room", (room) => {
        rooms.removeRoom(room);
        console.log(`room ${room} has been deleted`);
    });
}
function filterRooms(search, sortBy, order) {
    var roomsFilter = rooms.getRooms().filter((room) => room.name.toLowerCase().includes(search.toLowerCase()));

    if (sortBy === "players") {
        if (order === "asc") {
            roomsFilter.sort((a, b) => a.players - b.players);
        } else {
            roomsFilter.sort((a, b) => b.players - a.players);
        }
    } else if (sortBy === "owner") {
        console.log("sort by owner");
        if (order === "asc") {
            console.log("asc");
            roomsFilter.sort((a, b) => a.owner.localeCompare(b.owner));
        } else {
            roomsFilter.sort((a, b) => b.owner.localeCompare(a.owner));
        }
    }

    // Remove room.password and room.users from roomsFilter
    roomsFilter = roomsFilter.map(({ password, users, ownerId, started, ...rest }) => rest);
    return roomsFilter;
}
function getIo() {
    if (!io) {
        throw new Error('Must call initializeSocket before getting io');
    }
    return io;
}

module.exports = { initializeSocket, filterRooms, getIo };