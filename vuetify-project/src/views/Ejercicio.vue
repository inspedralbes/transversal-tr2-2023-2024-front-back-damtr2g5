<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="py-2">
                <v-btn-toggle v-model="selectedButton" rounded="0" color="deep-purple-accent-3" group mandatory>
                    <v-btn :disabled="isButtonDisabled(index)" :class="indexColor(index)"
                        v-for="(boton, index) in Ejercicio.preguntas" :key="boton.id" :value="index"
                        @click="botoncliclado(boton)">
                        {{ index + 1 }}
                    </v-btn>
                </v-btn-toggle>
            </v-col>
        </v-row>
    </v-container>
    <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4" elevation="4" height="auto"
        rounded max-width="800" width="100%"  >
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
                    <v-btn :disabled="disabled" @click="comprobar(Ejercicio.preguntas[selectedButton].id)" elevation="6"
                        border="lg opacity-12" rounded="lg" class="blue-btn mb-4"
                        :style="{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', display: 'block' }">Comprobar</v-btn>
                    <v-btn v-if="indexArray.indexOf(0) === -1" @click="finalizarEjercicio" elevation="6"
                        border="lg opacity-12" rounded="lg" class="mb-10" color="red"
                        :style="{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', display: 'block' }">Finalizar
                        Ejercicio</v-btn>



                </v-col>
            </v-row>
        </v-container>
    </v-sheet>
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
            this.$router.push({ name: 'Home' });
        },
        isButtonDisabled(index) {
            console.log("deshabilidado", this.indexArray[index] != 0);
            return this.indexArray[index] != 0;
        },
        indexColor(index) {
            if (this.indexArray[index] == 1) {
                return 'correcta';
            } else if (this.indexArray[index] == 2) {
                return 'fallada';
            } else {
                return 'deep-purple-accent-3';
            }
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
                return true;
            }
            else {
                return false;
            }
        }
    },

    created() {
            this.Ejercicio = getEjercicios(this.$route.params.id).then((res) => {
                this.Ejercicio = res;
                console.log("Ejercicio: ",this.Ejercicio)
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
}
</style>