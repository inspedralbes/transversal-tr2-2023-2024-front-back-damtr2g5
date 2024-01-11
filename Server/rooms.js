let rooms = [
    
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