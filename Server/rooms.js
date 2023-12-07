let rooms = [
    //Test rooms
    /*{
        private: true,
        name: 'Partida 1',
        mode: 'PvP',
        players: 2,
        owner: 'Oriol Zapatero',
    },
    {
        private: false,
        name: 'Partida 2',
        mode: 'PvP',
        players: 1,
        owner: 'Juanjo Pérez',
    },
    {
        private: true,
        name: 'Partida 3',
        mode: 'PvP',
        players: 2,
        owner: 'Maria Lopez',
    },
    {
        private: false,
        name: 'Partida 4',
        mode: 'PvP',
        players: 1,
        owner: 'Carlos Ramirez',
    },
    {
        private: true,
        name: 'Partida 5',
        mode: 'PvP',
        players: 6,
        owner: 'Laura Fernandez',
    },
    {
        private: false,
        name: 'Partida 6',
        mode: 'PvP',
        players: 3,
        owner: 'Pedro Martinez',
    },
    {
        private: true,
        name: 'Partida 7',
        mode: 'PvP',
        players: 2,
        owner: 'Ana Garcia',
    },
    {
        private: false,
        name: 'Partida 8',
        mode: 'PvP',
        players: 3,
        owner: 'Luisa Torres',
    },
    {
        private: true,
        name: 'Partida 9',
        mode: 'PvP',
        players: 2,
        owner: 'Roberto Sanchez',
    },
    {
        private: false,
        name: 'Partida 10',
        mode: 'PvP',
        players: 1,
        owner: 'Elena Rodriguez',
    },
    {
        private: true,
        name: 'Partida 11',
        mode: 'PvP',
        players: 2,
        owner: 'Diego Herrera',
    },
    {
        private: false,
        name: 'Partida 12',
        mode: 'PvP',
        players: 1,
        owner: 'Sara Navarro',
    }*/
];

module.exports = {
    getRooms: function() {
        return rooms;
    },
    getRoom: function(roomId) {
        return rooms.find((r) => r.id === roomId);
    },
    addRoom: function(room, id) {
        room.id = `GameRoom-${id}`;
        if(rooms.find((r) => r.id === room.id)){
            return false; //Room already exists
        }else{
            rooms.push(room);
            return true; //Room added
        }
        
    },
    removeRoom: function(room) {
        rooms = rooms.filter((r) => r.id !== room);
    },
    joinRoom: function(room, user) {
        const selectedRoom = rooms.find((r) => r.id === room.id);
        console.log("selectedRoom", selectedRoom);
        if (selectedRoom.users.includes(user)) {
            return false; // User has already joined the room
        } else {
            selectedRoom.users.push(user);
            selectedRoom.players++;
            return true; // User joined the room successfully
        }
    },
    removeUser: function(id) {
        let removedFrom;
        rooms.forEach((r) => {
            console.log("r.users", r.users);
            r.users.forEach((u) => {
                if (u.id == id) {
                    removedFrom = r;
                    r.users = r.users.filter((u) => u.id !== id);
                    r.players--;
                }
            });
            
        });
        return removedFrom;
    },
}