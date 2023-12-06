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
            room.users.push(socket.request.session.id);
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
            joined = rooms.joinRoom(room, socket.request.session.id);
            if (joined) {
                io.to(socket.request.session.id).emit("roomJoined", room);
            } else {
                io.to(socket.request.session.id).emit("roomNotJoined", room);
            }
        });

        socket.on('disconnecting', () => {
            removedFrom = rooms.removeUser(socket.request.session.id);
            console.log("removedFrom", removedFrom);
            io.to(removedFrom).emit("userLeft", socket.request.session.id);
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