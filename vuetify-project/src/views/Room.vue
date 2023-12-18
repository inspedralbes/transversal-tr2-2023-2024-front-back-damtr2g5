<template>
    <v-dialog width="500" persistent v-model="dialog">
        <v-card class="myfont round-border" height="100" style="text-align: center;">
            <v-card-title class="big-font">Escull el teu team</v-card-title>
            <v-row :no-gutters="true">
                <v-col cols="6">
                    <v-btn color="#F87060" @click="joinTeam(1)">Team 1</v-btn>
                </v-col>
                <v-col cols="6">
                    <v-btn color="#102542" @click="joinTeam(2)">Team 2</v-btn>
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
                <v-card color="#F87060">
                    <v-card-title class="big-font mt-3">Team 1</v-card-title>
                    <v-card-text>
                        <UserList team-color="#F87060" :items="team1" />
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col align-self="center" cols="12" sm="12" md="4" lg="4" order-md="2" order-lg="2" order="3" style="text-align: center;">
                <v-card style="margin-bottom: 3em;" class="round-border">
                    <v-card-title style="margin-bottom: 1em;" class="mt-8">
                        <h1>{{ room.name }}</h1>
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
            </v-col>
            <v-col style="padding-left: 0px;" cols="6" sm="6" md="4" lg="4" order-md="3" order-lg="3" order="2">
                <v-card color="#102542">
                    <v-card-title class="big-font mt-3">Team 2</v-card-title>
                    <v-card-text>
                        <UserList team-color="#102542" :items="team2" />
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
                if(this.team1.length == 0 || this.team2.length == 0){
                    return 'disabledTransparent';
                }
                return '';
            }
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
