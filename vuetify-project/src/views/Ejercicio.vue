<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="py-2">
                <v-btn-toggle v-model="selectedButton" rounded="0" color="deep-purple-accent-3" group mandatory>
                    <v-btn v-for="(boton, index) in Ejercicio.preguntas" :key="boton.id" :value="boton.id"
                        @click="botoncliclado(boton)">
                        {{ index + 1 }}
                    </v-btn>
                </v-btn-toggle>
            </v-col>
        </v-row>
    </v-container>
    <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4" elevation="4" height="auto"
        rounded max-width="800" width="100%">
        <v-container>
            <v-row>
                <v-col>
                    <component :isDisabled.sync="disableComponent" :key="key" :is="componentSelecionat" v-if="componentSelecionat"
                        :preguntaSeleccionada="preguntaSeleccionada" />
                </v-col>
            </v-row>
            <v-row>
                <v-col><v-btn :disabled="disabled" @click="comprobar(selectedButton)" elevation="6" border="lg opacity-12"
                        rounded="lg" class="blue-btn mb-10"
                        :style="{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', display: 'block' }">Comprobar</v-btn>
                    <v-icon :color="coloricono" :icon="icono" size="x-large"></v-icon>
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
    data() {

        return {
            key: 0,
            selectedButton: null,
            componentSelecionat: null,
            preguntaSeleccionada: null,
            respuestaSelecionada: "",
            icono:'',
            coloricono:'',
            disableComponent: false,
            Ejercicio: {
                id: 1,
                nombre: "Ejercicio",
                tipo: "Practicas",
                id_tema: 1,
                preguntas: [{
                    id: 1,
                    pregunta: "¿Cuál es el resultado de 1 + 1 * 2(Pregunta 1)?",
                    respuestas: [{ id: 1, respuesta: "43", correcta: false }, { id: 2, respuesta: "4", correcta: true }, { id: 3, respuesta: "21", correcta: false }, { id: 4, respuesta: "6", correcta: false }],
                    idTema: 1,
                    formato: "Seleccionar"
                },
                {
                    "_id": {
                        "$oid": "6565b1a56f122bd6cf8e9f0e"
                    },
                    "id": 2,
                    "pregunta": "Convierte a metros las siguientes unidades(Pregunta2)",
                    "respuestas": [
                        [
                            "50 kilómetros",
                            "50000 metros"
                        ],
                        [
                            "5 decimetros",
                            "0.5 metros"
                        ],
                        [
                            "50 hectómetros",
                            "5000 metros"
                        ],
                        [
                            "5 milímetros",
                            "0.005 metros"
                        ]
                    ],
                    "muestra": [
                        [
                            "10 kilómetros",
                            "0.005 metros"
                        ],
                        [
                            "5 decimetros",
                            "50000 metros"
                        ],
                        [
                            "5 milímetros",
                            "0.5 metros"
                        ],
                        [
                            "50 hectómetros",
                            "5000 metros"
                        ]
                    ],
                    "correcta": "50000 metros",
                    "idTema": "4",
                    "formato": "Unir valores"
                },
                {
                    "id": 3,
                    "pregunta": "Resuelve la ecuación: 3(x - 2) = 15(Pregunta 3)",
                    "correcta": [
                        "x = 7",
                        "x=7",
                        "x =7",
                        "x= 7"
                    ],
                    "idTema": 2,
                    "formato": "Respuesta"
                },
                {
                    "_id": {
                        "$oid": "6565d7516f122bd6cf8e9fa6"
                    },
                    "id": 4,
                    "pregunta": "¿Qué figura geométrica es un octógono?",
                    "respuestas": [
                        {
                            "respuesta": "Pentagon",
                            "imagen": "https://picsum.photos/500/300?image=232"
                        },
                        {
                            "respuesta": "Hexagon",
                            "imagen": "https://picsum.photos/500/300?image=232"
                        },
                        {
                            "respuesta": "Octógono",
                            "imagen": "https://picsum.photos/500/300?image=232"
                        },
                        {
                            "respuesta": "Triangle",
                            "imagen": "https://picsum.photos/500/300?image=232"
                        }
                    ],
                    "correcta": "Octógono",
                    "idTema": 5,
                    "formato": "Imagen"
                },
                {
                    "id": 5,
                    "pregunta": "Organiza los siguientes elementos para obtener un resultado de 24(Pregunta 5).",
                    "componentes": [
                        "4",
                        "*",
                        "3",
                        "+",
                        "12"
                    ],
                    "correcta": "4*3+12",
                    "idTema": 3,
                    "formato": "Ordenar valores"
                },
                {
                    "id": 6,
                    "pregunta": "Representa la función y = 3x + 2 en un gráfico",
                    "idTema": "3",
                    "formato": "Grafica"

                }],
                xp: 100
            }

        };
    },

    methods: {
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
            comprobarRespuesta({ respuesta: this.respuestaSelecionada }, idPregunta).then(response => {
                this.icono = response.correct ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline';
                this.coloricono = response.correct ? 'success' : 'red';
                this.respuestaSelecionada = "";
                this.disableComponent = true;
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
        getEjercicios().then(response => {
            this.Ejercicio = response;
            this.botoncliclado(this.Ejercicio.preguntas[0]);
            this.selectedButton = this.Ejercicio.preguntas[0].id;
        });

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