<template>
    <div class="background-container blurred">
        <img src="@/assets/Muay_Thai_Fight.jpeg" alt="Background Image" class="background-image">
    </div>
    <v-app>
    <v-dialog width="500" persistent v-model="dialog">
        <v-card class="myfont round-border" height="100" style="text-align: center;">
            <v-card-title class="big-font">Escull el teu team</v-card-title>
            <v-row :no-gutters="true">
                <v-col cols="6">
                    <v-btn color="#102542" @click="joinTeam(1)">Team 1</v-btn>
                </v-col>
                <v-col cols="6">
                    <v-btn color="#F87060" @click="joinTeam(2)">Team 2</v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
    <v-dialog transition="dialog-top-transition" persistent width="auto" v-model="countdownDialog">
        <v-sheet class="myfont bigger-font" style="text-align: center; padding: 2em;">
            <h1>{{ countdown }}</h1>
            Iniciant partida...
        </v-sheet>
    </v-dialog>
    <v-container class="fill-height">
        <v-row class="myfont" style="margin-top: 70px; height: 100%;">
            <v-col style="padding-right: 0;" cols="6" sm="6" md="4" lg="4" order="1">
                <v-card color="#102542">
                    <v-card-title class="big-font mt-3">Team 1</v-card-title>
                    <v-card-text>
                        <UserList team-color="#102542" :items="team1" />
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col align-self="center" cols="12" sm="12" md="4" lg="4" order-md="2" order-lg="2" order="3"
                style="text-align: center;">
                <v-card style="margin-bottom: 3em;" class="round-border">
                    <v-card-title style="margin-bottom: 1em;" class="mt-8">
                        <h1>{{ room?.name }}</h1>
                    </v-card-title>
                    <v-card-text>
                        <h2>Numero de jugadors: {{ team1.length + team2.length }}</h2>
                    </v-card-text>
                </v-card>
                <button @click="handleClick()" v-bind:class="'custom-btn ' + startDisabled" style="width: 100%;" text tile>
                    <span class="shadow"></span>
                    <span class="edge"></span>
                    <span class="front text">
                        <span class="myfont big-font">{{ buttonText }}</span>
                    </span>
                </button>
                <v-btn style="margin-top: 10px" color="#102542" @click="changeTeam()">Cambiar equipo</v-btn>
            </v-col>
            <v-col style="padding-left: 0px;" cols="6" sm="6" md="4" lg="4" order-md="3" order-lg="3" order="2">
                <v-card color="#F87060">
                    <v-card-title class="big-font mt-3">Team 2</v-card-title>
                    <v-card-text>
                        <UserList team-color="#F87060" :items="team2" />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</v-app>
</template>

<script>
import { socket, state } from "@/socket.js";
import UserList from "@/components/rooms/UserList.vue";
import { useAppStore } from "@/store/app";
export default {
    name: 'Room',
    beforeRouteLeave(to, from, next) {
        if (this.leaveReason == '') {
            const answer = window.confirm('Segur que vols sortir de la partida?')
            if (answer) {
                socket.disconnect();
                next()
            } else {
                next(false)
            }
        }else if(this.leaveReason == 'roomDeleted'){
            window.alert('El propietari ha sortit de la partida.')
            socket.disconnect();
            next()
        }else if(this.leaveReason == 'gameStarted'){
            next()
        } else if(this.leaveReason == 'refresh') {
            socket.disconnect();
            next()
        }

    },
    components: {
        UserList,
    },
    data() {
        return {
            leaveReason: '',
            room: {},
            store: useAppStore(),
            dialog: true,
            countdownDialog: false,
            buttonText: 'Iniciar partida',
            team1: [],
            team2: [],
            countdown: 5,
        };
    },
    computed: {
        startDisabled() {
            if (this.room?.owner == this.store.getLoginInfo.email) {
                if (this.team1.length == 0 || this.team2.length == 0) {
                    return 'disabledTransparent';
                }
                return '';
            }
            this.store.size = this.team1.length + this.team2.length
            return 'disabledTransparent';
        }
    },
    methods: {
        joinTeam(team) {
            this.dialog = false;
            team = {
                team: team,
                roomId: this.room.id
            }
            socket.emit('joinTeam', team);
        },
        changeTeam() {
            var room = {roomId: this.room.id};
            socket.emit('changeTeam', room);
        },
        handleClick() {
            if (this.room.owner == this.store.getLoginInfo.email) {
                this.buttonText = 'Iniciando partida...';
                socket.emit('startGame', this.room);
            }
        },
        startCountdown() {
            this.countdownDialog = true;
            this.countdown = 5;
            const countdownInterval = setInterval(() => {
                if (this.countdown > 0) {
                    this.countdown--;
                } else {
                    clearInterval(countdownInterval);
                    // Perform action after countdown ends
                }
            }, 1000);
        },
    },
    created(){
        this.room = this.store.getRoom;
        if (this.room == null) {
            this.leaveReason = 'refresh';
            this.$router.push({ name: 'Home' });
        } else {
        console.log("current room", this.room);
        if (this.room.owner == this.store.getLoginInfo.email) {
            this.startDisabled = false;
        }
            socket.emit('getTeamUsers', this.room);

        socket.on('teamUsers', (teams) => {
            console.log(teams);
            this.team1 = teams.team1;
            this.team2 = teams.team2;
        });
        socket.on('teamJoined', (user) => {
            console.log("user joined", user);
            if (user.team == 1) {
                this.team1.push(user);
            } else {
                this.team2.push(user);
            }
        });
        socket.on('userLeft', (user) => {
            console.log("user left", user);
            if (user.team == 1) {
                this.team1 = this.team1.filter((item) => {
                    return item.email != user.email;
                });
            } else if (user.team == 2) {
                this.team2 = this.team2.filter((item) => {
                    return item.email != user.email;
                });
            }
        });
        socket.on('roomDeleted', (room) => {
            socket.disconnect();
            console.log("Room have been deleted!");
            this.leaveReason = 'roomDeleted';
            this.$router.push({ name: 'Batalla' });
        });
        socket.on('startingGame', (room) => {
            console.log("starting game", room);
            if (this.dialog) {
                socket.emit('joinTeam', { team: 0, roomId: room.id });
                this.dialog = false;
            }
            this.startCountdown();
        });
        socket.on('gameStarted', (room) => {
            this.leaveReason = 'gameStarted';
            this.store.setRoom(room);
            this.$router.push({ name: 'Game', params: { room: room.name } });
        });
    }
        
    },    
    mounted() {
        this.room = this.store.getRoom;
        if (this.room != null) {
        console.log("current room", this.room);
        if (this.room.owner == this.store.getLoginInfo.email) {
            this.startDisabled = false;
        }
            socket.emit('getTeamUsers', this.room);

        socket.on('teamUsers', (teams) => {
            console.log(teams);
            this.team1 = teams.team1;
            this.team2 = teams.team2;
        });
        socket.on('teamJoined', (user) => {
            console.log("user joined", user);
            if (user.team == 1) {
                this.team1.push(user);
            } else {
                this.team2.push(user);
            }
        });
        socket.on('userLeft', (user) => {
            console.log("user left", user);
            if (user.team == 1) {
                this.team1 = this.team1.filter((item) => {
                    return item.email != user.email;
                });
            } else if (user.team == 2) {
                this.team2 = this.team2.filter((item) => {
                    return item.email != user.email;
                });
            }
        });
        socket.on('roomDeleted', (room) => {
            socket.disconnect();
            this.leaveReason = 'roomDeleted';
            this.$router.push({ name: 'Batalla' });
        });
        socket.on('startingGame', (room) => {
            console.log("starting game", room);
            if (this.dialog) {
                socket.emit('joinTeam', { team: 0, roomId: room.id });
                this.dialog = false;
            }
            this.startCountdown();
        });
        socket.on('gameStarted', (room) => {
            this.leaveReason = 'gameStarted';
            this.store.setRoom(room);
            this.$router.push({ name: 'Game', params: { room: room.name } });
        });
    }
},
}
</script>

<style scoped>

</style>
