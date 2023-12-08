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
                    <v-card-title>
                        <h1>Room</h1>
                    </v-card-title>
                    <v-card-text>
                        <h2>Numero de jugadores: {{ team1.length + team2.length }}</h2>
                    </v-card-text>
                </v-card>
                <v-btn @click="handleClick()" :text="buttonText"></v-btn>
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
import { socket,state } from "@/socket.js";
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
            buttonText: 'Iniciar partida',
            team1: [],
            team2: [],
            items: [{
                avatar: 'http://localhost:3001/imagen/avatar1.jpg',
                email: 'prueba'
            }, {
                avatar: 'http://localhost:3001/imagen/avatar2.jpg',
                email: 'prueba2'
            },
            {
                avatar: 'http://localhost:3001/imagen/avatar1.jpg',
                email: 'prueba3'
            }, {
                avatar: 'http://localhost:3001/imagen/avatar2.jpg',
                email: 'prueba4'
            },
            {
                avatar: 'http://localhost:3001/imagen/avatar1.jpg',
                email: 'prueba'
            }, {
                avatar: 'http://localhost:3001/imagen/avatar2.jpg',
                email: 'prueba2'
            },
            {
                avatar: 'http://localhost:3001/imagen/avatar1.jpg',
                email: 'prueba3'
            }, {
                avatar: 'http://localhost:3001/imagen/avatar2.jpg',
                email: 'prueba4'
            },
            {
                avatar: 'http://localhost:3001/imagen/avatar1.jpg',
                email: 'prueba'
            }, {
                avatar: 'http://localhost:3001/imagen/avatar2.jpg',
                email: 'prueba2'
            },
            {
                avatar: 'http://localhost:3001/imagen/avatar1.jpg',
                email: 'prueba3'
            }, {
                avatar: 'http://localhost:3001/imagen/avatar2.jpg',
                email: 'prueba4'
            },
            {
                avatar: 'http://localhost:3001/imagen/avatar1.jpg',
                email: 'prueba'
            }, {
                avatar: 'http://localhost:3001/imagen/avatar2.jpg',
                email: 'prueba2'
            },
            {
                avatar: 'http://localhost:3001/imagen/avatar1.jpg',
                email: 'prueba3'
            }, {
                avatar: 'http://localhost:3001/imagen/avatar2.jpg',
                email: 'prueba4'
            }
            ],
        };
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
            this.buttonText = 'Iniciando partida...';
            setTimeout(() => {
                this.buttonText = 'Iniciar partida';
            }, 3000);
        }
    },
    mounted() {
        this.room = this.store.getRoom;
        console.log("current room", this.room);
        if (this.room == null) {
            this.$router.push({ name: 'Home' });
        }else{
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
            } else if (user.team == 2){
                this.team2 = this.team2.filter((item) => {
                    return item.email != user.email;
                });
            }
        });
    },

    // Your component's JavaScript logic goes here
}
</script>

<style scoped>
/* Your component's CSS styles go here */
</style>
