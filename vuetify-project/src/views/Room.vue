<template>
    
    <v-dialog width="500" persistent v-model="dialog">
        <v-card height="100" style="text-align: center;">
            <v-card-title>Escull el teu team</v-card-title>
            <v-row :no-gutters="true">
                <v-col cols="6">
                    <v-btn color="red" @click="joinTeam(1)">Team 1</v-btn>
                </v-col>
                <v-col cols="6">
                    <v-btn color="blue" @click="joinTeam(2)">Team 2</v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
    <v-dialog transition="dialog-top-transition" persistent width="200" v-model="countdownDialog">
        <v-sheet style="text-align: center; padding: 2em;">
            <h1>{{ countdown }}</h1>
            Iniciant partida...
        </v-sheet>
    </v-dialog>
    <v-container>

        <v-row>
            <v-col cols="4">
                <v-card color="red">
                    <v-card-title>Team 1</v-card-title>
                    <v-card-text>
                        <UserList team-color="red" :items="team1" />
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="4" style="text-align: center;">
                <v-card style="margin-bottom: 3em;">
                    <v-card-title style="margin-bottom: 1em;">
                        <h1>{{ room.name }}</h1>
                    </v-card-title>
                    <v-card-text>
                        <h2>Numero de jugadors: {{ team1.length + team2.length }}</h2>
                    </v-card-text>
                </v-card>
                <v-btn :disabled="startDisabled" @click="handleClick()" :text="buttonText"></v-btn>
            </v-col>
            <v-col cols="4">
                <v-card color="blue">
                    <v-card-title>Team 2</v-card-title>
                    <v-card-text>
                        <UserList team-color="blue" :items="team2" />
                    </v-card-text>
                </v-card>
            </v-col>

        </v-row>
    </v-container>
</template>

<script>
import { socket, state } from "@/socket.js";
import UserList from "@/components/rooms/UserList.vue";
import { useAppStore } from "@/store/app";
export default {
    name: 'Room',
    components: {
        UserList,
    },
    data() {
        return {
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
            if (this.room.owner == this.store.getLoginInfo.email) {
                return this.team1.length == 0 || this.team2.length == 0;
            }
            return true;
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
    mounted() {
        this.room = this.store.getRoom;
        console.log("current room", this.room);
        if (this.room.owner == this.store.getLoginInfo.email) {
            this.startDisabled = false;
        }
        if (this.room == null) {
            this.$router.push({ name: 'Home' });
        } else {
            socket.emit('getTeamUsers', this.room);
        }

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
        socket.on('startingGame', (room) => {
            console.log("starting game", room);
            if (this.dialog) {
                socket.emit('joinTeam', { team: 0, roomId: room.id });
                this.dialog = false;
            }
            this.startCountdown();
        });
        socket.on('gameStarted', (room) => {
            this.store.setRoom(room);
            this.$router.push({ name: 'Game', params: { room: room.name } });
        });
    },

}
</script>

<style scoped>
/* Your component's CSS styles go here */
</style>
