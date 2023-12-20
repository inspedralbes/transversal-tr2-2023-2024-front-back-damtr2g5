<template>
    <div class="background-container blurred">
        <img src="@/assets/Muay_Thai_Fight.jpeg" alt="Background Image" class="background-image">
    </div>
    <v-app>
    <v-dialog transition="dialog-top-transition" persistent width="500" v-model="finishDialog">
        <v-sheet class="myfont" style="text-align: center; padding: 2em;">
            <h1>{{ endMessage }}</h1>
            <v-btn variant="plain outlined" class="myfont oxford-blue-bg bitter-sweet" @click="finalizarEjercicio()">Tornar
                al menu</v-btn>
        </v-sheet>
    </v-dialog>
    <v-container>
        <v-row justify="center">
            <v-col style="justify-content: center; " cols="12" sm="12" md="12" lg="6">
                <v-card flat class="no-background" style="width: 100%;">
                    <img :src="actualGif" alt="stage" style="width: 100%;">
                    <v-overlay class="mydisabled" :scrim="false" v-model="hpOverlay" contained persistent>
                        <v-row>
                            <v-col>
                                <h2 style="color: #102542;" class="sombra-texto">Team 1</h2>
                                <v-progress-linear class="custom-border" bg-opacity="0.5" v-model="team1hpPercent" color="#102542" height="25">
                                    <strong class="white">{{ Math.ceil(team1hpPercent) }}</strong>
                                </v-progress-linear>
                            </v-col>
                            <v-col style="text-align: right;">
                                <h2 style="color: #F87060;" class="sombra-texto">Team 2</h2>
                                <v-progress-linear class="custom-border2" bg-opacity="0.5" reverse v-model="team2hpPercent" color="#F87060" height="25">
                                    <strong class="white">{{ Math.ceil(team2hpPercent) }}</strong>
                                </v-progress-linear>
                            </v-col>
                        </v-row>
                    </v-overlay>

                </v-card>
            </v-col>

        </v-row>
    </v-container>

    <v-container class="centered">
        <v-row class="centered">
            <v-col class="white-bg round-border" cols="12" lg="8" md="10" sm="11">

                <v-col style="position: relative;">
                    <v-overlay v-model="overlay" :scrim="false" contained class="align-center justify-center">
                        <v-icon class="stamp" :color="coloricono" :icon="icono"
                            style="width: 1em; height: 1em; font-size: 10em;"></v-icon>
                    </v-overlay>
                    <component class="myfont" :isDisabled.sync="disableComponent" :key="key" :is="componentSelecionat"
                        v-if="componentSelecionat" :preguntaSeleccionada="preguntaSeleccionada" />
                </v-col>
                <v-col class="mt-4" cols="12">
                    <button v-bind:class="'custom-btn ' + disabled" style="width: 50%;"
                        @click="comprobar(preguntaSeleccionada.id)">
                        <span class="shadow"></span>
                        <span class="edge"></span>
                        <span class="myfont front text">
                            {{ buttonText }}
                        </span>
                    </button>
                </v-col>


            </v-col>
        </v-row>
    </v-container>
</v-app>
</template>
<style>
.sombra-texto{
    text-shadow: -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white;
}
.custom-border {
    border: 1px solid #102542;
}
.custom-border2 {
    border: 1px solid #F87060;
}
.v-overlay__content{
    width: 100%;
    height: 100%;
}
</style>
<script>
import idleGif from '../assets/gifs/idle.gif';
import purplePunch from '../assets/gifs/purplePunch.gif';
import redPunch from '../assets/gifs/redPunch.gif';
import { getPreguntaRandom, comprobarRespuesta, PostBatallas,getPreguntaBatalla } from '../communicationsManager';
import { useAppStore } from '../store/app';
import { socket, state } from "@/socket.js";
const store = useAppStore();

import Formato1 from '../components/Formato1.vue';
import Formato2 from '../components/Formato2.vue';
import Formato3 from '../components/Formato3.vue';
import Formato4 from '../components/Formato4.vue';
import Formato5 from '../components/Formato5.vue';
import Formato6 from '../components/Formato6.vue';


//import { socket, state } from './socket';
export default {
    name: 'Ejercicio',
    components: {
        Formato1,
        Formato2,
        Formato3,
        Formato4,
        Formato5,
        Formato6
    },
    data() {

        return {
            absolute: false,
            hpOverlay: true,
            actualGif: idleGif,
            finishDialog: false,
            yourTeam: null,
            endMessage: '',
            pidiendoPregunta: false,
            respondidas:0,
            team1hp: 0,
            team2hp: 0,
            team1maxhp: 0,
            team2maxhp: 0,
            buttonText: 'Comprobar',
            comprobado: false,
            overlay: false,
            key: 0,
            ufs:[0,1,2,3,4,5],
            componentSelecionat: null,
            preguntaSeleccionada: null,
            respuestaSelecionada: "",
            icono: '',
            coloricono: '',
            disableComponent: false,
            Ejercicio: {
                id: 1,
                nombre: "Ejercicio",
                tipo: "Practicas",
                id_tema: 1,
                preguntas: [],
                xp: 100
            }

        };
    },

    methods: {
        finalizarEjercicio() {
            socket.disconnect();
            this.$router.push({ name: 'Home' });
        },
        botoncliclado(pregunta) {
            this.preguntaSeleccionada = pregunta; // Guardar la pregunta seleccionada
            store.setRespuesta("");
            this.icono = '';
            this.disableComponent = false;
            this.key += 1;
            switch (pregunta.formato) {
                case "Seleccionar":
                    this.componentSelecionat = Formato1;
                    break;
                case "Unir valores":
                    this.componentSelecionat = Formato2;
                    break;
                case "Respuesta":
                    this.componentSelecionat = Formato3;
                    break;
                case "Imagen":
                    this.componentSelecionat = Formato4;
                    break;
                case "Ordenar valores":
                    this.componentSelecionat = Formato5;
                    break;
                case "Grafica":
                    this.componentSelecionat = Formato6;
                    break;
            }
        },
        comprobar() {
            if (this.comprobado) {
                this.overlay = false;
                this.pidiendoPregunta = true;
                this.nuevaPregunta();
            } else {
                socket.emit('checkAnswer', { answer: this.respuestaSelecionada, question: this.preguntaSeleccionada, room: store.getRoom });
            }


        },
        respuestanula() {
            if (this.respuestaSelecionada == null) {
                return true;

            }
            else {
                return false;
            }

        },
        nuevaPregunta() {
            getPreguntaBatalla({nums:this.ufs}).then(response => {
                this.preguntaSeleccionada = response;
                this.key += 1;
                switch (this.preguntaSeleccionada.formato) {
                    case "Seleccionar":
                        this.componentSelecionat = Formato1;
                        break;
                    case "Unir valores":
                        this.componentSelecionat = Formato2;
                        break;
                    case "Respuesta":
                        this.componentSelecionat = Formato3;
                        break;
                    case "Imagen":
                        this.componentSelecionat = Formato4;
                        break;
                    case "Ordenar valores":
                        this.componentSelecionat = Formato5;
                        break;
                    case "Grafica":
                        this.componentSelecionat = Formato6;
                        break;
                }
                this.disableComponent = false;
                this.comprobado = false;
                this.buttonText = 'Comprobar';
                this.pidiendoPregunta = false;
            })
        }
    },
    computed: {
        team1hpPercent() {
            return (this.team1hp / this.team1maxhp) * 100;
        },
        team2hpPercent() {
            return (this.team2hp / this.team2maxhp) * 100;
        },
        disabled() {
            if(this.pidiendoPregunta){
                return 'disabledTransparent';
            }
            else if (this.respuestaSelecionada == "" && this.comprobado == false) {
                return 'disabledTransparent';
            }
            else {
                return '';
            }
        }
    },

    created() {
        this.nuevaPregunta();
        store.getRoom.users.forEach(user => {
            if (user.email == store.getLoginInfo.email) {
                this.yourTeam = user.team;
            }
        });

        this.team1hp = store.$state.room.teams.team1[0].hp;
        this.team2hp = store.$state.room.teams.team2[0].hp;
        this.team1maxhp = store.$state.room.teams.team1[0].maxHp;
        this.team2maxhp = store.$state.room.teams.team2[0].maxHp;

        store.$subscribe((mutation, state) => {
            console.log("state changed", state);
            this.respuestaSelecionada = state.respuesta;
            if (this.team1hp != state.room.teams.team1[0].hp) {
                this.actualGif = redPunch;
                setTimeout(() => {
                    this.actualGif = idleGif;
                }, 1600);
            } else if (this.team2hp != state.room.teams.team2[0].hp) {
                this.actualGif = purplePunch;
                setTimeout(() => {
                    this.actualGif = idleGif;
                }, 1600);
            }
            this.team1hp = state.room.teams.team1[0].hp;
            this.team2hp = state.room.teams.team2[0].hp;
            this.team1maxhp = state.room.teams.team1[0].maxHp;
            this.team2maxhp = state.room.teams.team2[0].maxHp;
            console.log("hp", state.room.teams);
        })
        socket.on('answerChecked', (data) => {
            console.log("data", data);
            this.overlay = true;
            this.icono = data.correct ? '$check' : '$close';
            this.coloricono = data.correct ? 'success' : 'red';
            this.disableComponent = true;
            this.respuestaSelecionada = "";
            this.comprobado = true;
            this.buttonText = 'Siguiente';
        })
        socket.on('updateTeams', (data) => {
            console.log("updateTeams", data.teams);
            store.setRoom(data);
        })
        socket.on('gameFinished', (data) => {
            console.log("gameFinished", data);
            if (data.winner == this.yourTeam) {
                this.endMessage = "Has guanyat!";
            } else {
                this.endMessage = "Has perdut...";
            }
            this.finishDialog = true;
        })

    },


}

</script>

<style>
.blue-btn {
    background-color: #007bff !important;
    color: white !important;
}
</style>
