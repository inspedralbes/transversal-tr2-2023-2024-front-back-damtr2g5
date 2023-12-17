<template>
    <v-container>
        <v-row class="myfont centered">
            <div class="violet-bg white biggest-font round-border pt-4 pl-6 pr-6 mb-12" style="margin-top: 70px;">{{
                Ejercicio.nombre }}</div>
            <v-col cols="12" class="py-2 centered">
                <v-btn-toggle style="overflow-x: auto;max-width: 800px; display: flex;" class="round-border"
                    v-model="selectedButton" divided mandatory>
                    <v-btn :active="false" color="#69306D" :class="buttonClass(index) + ' big-font'"
                        v-for="(boton, index) in Ejercicio.preguntas" :key="boton.id" :value="index"
                        @click="botoncliclado(boton)">
                        {{ index + 1 }}
                    </v-btn>
                </v-btn-toggle>
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
                <v-col cols="12">
                <button v-if="indexArray.indexOf(0) !== -1" v-bind:class="'custom-btn ' + disabled" style="width: 50%;"
                    @click="comprobar(Ejercicio.preguntas[selectedButton].id)">
                    <span class="shadow"></span>
                    <span class="edge"></span>
                    <span class="myfont front text">
                        Comprobar
                    </span>
                </button>
            </v-col>


            </v-col>
        </v-row>
    </v-container>
</template>
  
    
<script>

import { getEjercicios, comprobarRespuesta } from '../communicationsManager';
import { useAppStore } from '../store/app'
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
    setup() {
        const appStore = useAppStore()
        return {
            appStore
        };
    },
    data() {

        return {
            overlay: false,
            indexArray: [],
            key: 0,
            selectedButton: null,
            componentSelecionat: null,
            preguntaSeleccionada: null,
            respuestaSelecionada: "",
            icono: '',
            coloricono: '',
            disableComponent: false,
            Ejercicio: {}

        };
    },

    methods: {
        finalizarEjercicio() {
            this.$router.push({ name: 'InfoEjercicio', params: { id: this.Ejercicio.id } });
        },
        isButtonDisabled(index) {
            console.log("deshabilidado", this.indexArray[index] != 0);
            return this.indexArray[index] != 0;
        },
        buttonClass(index) {
            let parametros = '';
            if (this.indexArray[index] == 1) {
                parametros = 'correcta';
            } else if (this.indexArray[index] == 2) {
                parametros = 'fallada';
            } else {
                return '';
            }
            if (this.isButtonDisabled(index)) {
                parametros += ' mydisabled';
            }
            return parametros;
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
        comprobar(idPregunta) {
            let correcta = '';
            comprobarRespuesta({ respuesta: this.respuestaSelecionada, ejercicioid: this.Ejercicio.id }, idPregunta).then(response => {
                this.overlay = true;
                this.icono = response.correct ? '$check' : '$close';
                this.indexArray[this.selectedButton] = response.correct ? 1 : 2;
                this.coloricono = response.correct ? 'success' : 'red';
                this.disableComponent = true;
                correcta = response.correct;
                this.respuestaSelecionada = "";
                console.log("index", this.indexArray.indexOf(0) === -1);
                if(this.indexArray.indexOf(0) === -1){
                    setTimeout(() => {
                        this.finalizarEjercicio();
                    }, 2000);
                }
            });


        },
        respuestanula() {
            if (this.respuestaSelecionada == null) {
                return true;

            }
            else {
                return false;
            }

        },
        respondida() {

        }
    },
    computed: {
        disabled() {
            if (this.respuestaSelecionada == "") {
                return 'disabledTransparent';
            }
            else {
                return '';
            }
        }
    },

    created() {
        this.Ejercicio = getEjercicios(this.$route.params.id).then((res) => {
            this.Ejercicio = res;
            console.log("Ejercicio: ", this.Ejercicio)
            this.botoncliclado(this.Ejercicio.preguntas[0]);
            this.selectedButton = 0;
            this.indexArray = Array.from(Array(this.Ejercicio.preguntas.length));
            this.indexArray = this.indexArray.map(() => 0);
        })

        store.$subscribe((mutation, state) => {
            console.log(state);
            this.respuestaSelecionada = state.respuesta;

        })

    },


}

</script>

<style>
.blue-btn {
    background-color: #007bff !important;
    color: white !important;
}</style>