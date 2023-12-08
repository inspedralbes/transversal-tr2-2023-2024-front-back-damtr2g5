<template>
    <h2>Team 1 hp: {{ team1hp }}/{{ team1maxhp }}</h2>
    <h2>Team 2 hp: {{ team2hp }}/{{ team2maxhp }}</h2>
    <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4" elevation="4" height="auto"
        rounded max-width="800" width="100%">
        <v-container>

            <v-row style="position: relative;" justify="center">
                <v-overlay v-model="overlay" :scrim="false" contained class="align-center justify-center">
                    <v-icon class="stamp" :color="coloricono" :icon="icono"
                        style="width: 1em; height: 1em; font-size: 10em;"></v-icon>
                </v-overlay>
                <v-col>
                    <component :isDisabled.sync="disableComponent" :key="key" :is="componentSelecionat"
                        v-if="componentSelecionat" :preguntaSeleccionada="preguntaSeleccionada" />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn :disabled="disabled" @click="comprobar(preguntaSeleccionada.id)" elevation="6"
                        border="lg opacity-12" rounded="lg" class="blue-btn mb-4"
                        :style="{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', display: 'block' }">{{
                            buttonText }}</v-btn>
                </v-col>

            </v-row>
        </v-container>
    </v-sheet>
</template>

<script>

import { getPreguntaRandom, comprobarRespuesta } from '../communicationsManager';
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
            team1hp: 0,
            team2hp: 0,
            team1maxhp: 0,
            team2maxhp: 0,
            buttonText: 'Comprobar',
            comprobado: false,
            overlay: false,
            key: 0,
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
                this.disableComponent = false;
                this.overlay = false;
                this.comprobado = false;
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
            getPreguntaRandom().then(response => {
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
            })
        }
    },
    computed: {
        disabled() {
            if (this.respuestaSelecionada == "" && this.comprobado == false) {
                return true;
            }
            else {
                return false;
            }
        }
    },

    created() {
        this.nuevaPregunta();

        this.team1hp = store.$state.room.teams.team1[0].hp;
            this.team2hp = store.$state.room.teams.team2[0].hp;
            this.team1maxhp = store.$state.room.teams.team1[0].maxHp;
            this.team2maxhp = store.$state.room.teams.team2[0].maxHp;

        store.$subscribe((mutation, state) => {
            console.log("state changed", state);
            this.respuestaSelecionada = state.respuesta;
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

    },


}

</script>

<style>
.blue-btn {
    background-color: #007bff !important;
    color: white !important;
}
</style>
