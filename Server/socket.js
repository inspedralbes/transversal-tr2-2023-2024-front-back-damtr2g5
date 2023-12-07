const socketIo = require('socket.io');
const rooms = require('./rooms.js');
const sessionMiddleware = require('./sessionMiddleware.js');
let io;
function initializeSocket(server, cors) {
    io = socketIo(server, cors);

    io.engine.use(sessionMiddleware)

    io.on('connection', (socket) => {
        console.log("a user connected", socket.request.session.id);

        socket.join(socket.request.session.id);

        socket.on('createRoom', (room) => {
            room.players = 1;
            room.owner = socket.request.session.user?.email || "???"; // TODO: Change this to the user's name
            room.users = [];
            room.users.push({ id: socket.request.session.id, email: socket.request.session.user?.email || "???", image: socket.request.session.user?.image });
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
            if (roomsFilter.private && room.password !== roomsFilter.password) {
                console.log("wrong password");
                io.to(socket.request.session.id).emit("wrongPassword", room);
                return;
            }

            socket.join(room.id);
            joined = rooms.joinRoom(room, { id: socket.request.session.id, email: socket.request.session.user?.email || "???", image: socket.request.session.user?.image });
            if (joined) {
                io.to(socket.request.session.id).emit("roomJoined", room);
            } else {
                io.to(socket.request.session.id).emit("roomNotJoined", room);
            }
        });

        socket.on('joinTeam', (team) => {
            console.log("joinTeam", rooms.getRoom(team.roomId));
            console.log("socket rooms", socket.rooms);
            rooms.getRoom(team.roomId).users.forEach((user) => {
                if (user.id === socket.request.session.id) {
                    user.team = team.team;
                    teams = {
                        team1: [],
                        team2: [],
                    };
                    rooms.getRoom(team.roomId).users.forEach((user) => {
                        if (user.team === 1) {
                            teams.team1.push(user);
                        } else if (user.team === 2) {
                            teams.team2.push(user);
                        }
                    });
                    io.to(team.roomId).emit("teamUsers", teams);
                }
            });
            
        
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
                if(room.users.find((u) => u.id === socket.request.session.id)){
                    u = room.users.find((u) => u.id === socket.request.session.id);
                    io.to(room.id).emit("userLeft", u);
                }
            removedFrom = rooms.removeUser(socket.request.session.id);
            console.log("removedFrom", removedFrom);
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
    roomsFilter = roomsFilter.map(({ password, users, ...rest }) => rest);
    return roomsFilter;
}
function getIo() {
    if (!io) {
        throw new Error('Must call initializeSocket before getting io');
    }
    return io;
}

module.exports = { initializeSocket, filterRooms, getIo };