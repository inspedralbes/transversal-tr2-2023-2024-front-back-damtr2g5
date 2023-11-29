<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="py-2">
                <v-btn-toggle v-model="selectedButton" rounded="0" color="deep-purple-accent-3" group mandatory>
                    <v-btn v-for="(boton, index) in Ejercicio[0].preguntas" :key="boton.id" :value="boton.id"
                        @click="botoncliclado(boton)">
                        {{ index + 1 }}
                    </v-btn>
                </v-btn-toggle>
            </v-col>
        </v-row>
    </v-container>
    <v-container>
        <component :is="componentSelecionat" v-if="componentSelecionat" :preguntaSeleccionada="preguntaSeleccionada" />
    </v-container>
</template>
  
    
<script>
import { getEjercicios } from '../communicationsManager';
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
            selectedButton: null,
            componentSelecionat: null,
            preguntaSeleccionada: null,
            Ejercicio: [{
                id: 1,
                nombre: "Ejercicio",
                tipo: "Practicas",
                id_tema: 1,
                preguntas: [{
                    id: 1,
                    pregunta: "¿Cuál es el resultado de 1 + 1 * 2?",
                    respuestas: [{ id: 1, respuesta: "43", correcta: false }, { id: 2, respuesta: "4", correcta: true }, { id: 3, respuesta: "21", correcta: false }, { id: 4, respuesta: "6", correcta: false }],
                    idTema: 1,
                    formato: "Seleccionar"
                },
                {
                    id: 2,
                    pregunta: "¿Cuál es el resultado de 5 + 3 * 2?",
                    respuestas: [{ id: 1, respuesta: "11", correcta: false }, { id: 2, respuesta: "16", correcta: true }, { id: 3, respuesta: "13", correcta: false }, { id: 4, respuesta: "10", correcta: false }],
                    idTema: 1,
                    formato: "Unir valores"
                },
                {
                    id: 3,
                    pregunta: "¿Cuál es el resultado de 5 + 3 * 2?",
                    respuestas: [{ id: 1, respuesta: "11", correcta: false }, { id: 2, respuesta: "16", correcta: true }, { id: 3, respuesta: "13", correcta: false }, { id: 4, respuesta: "10", correcta: false }],
                    idTema: 1,
                    formato: "Respuesta"
                },
                {
                    id: 4,
                    pregunta: "¿Cuál es el resultado de 5 + 3 * 2?",
                    respuestas: [{ id: 1, respuesta: "11", correcta: false }, { id: 2, respuesta: "16", correcta: true }, { id: 3, respuesta: "13", correcta: false }, { id: 4, respuesta: "10", correcta: false }],
                    idTema: 1,
                    formato: "Imagen"
                },
                {
                    id: 5,
                    pregunta: "¿Cuál es el resultado de 5 + 3 * 2?",
                    respuestas: [{ id: 1, respuesta: "11", correcta: false }, { id: 2, respuesta: "16", correcta: true }, { id: 3, respuesta: "13", correcta: false }, { id: 4, respuesta: "10", correcta: false }],
                    idTema: 1,
                    formato: "Ordenar valores"
                },
                {
                    id: 6,
                    pregunta: "¿Cuál es el resultado de 5 + 3 * 2?",
                    respuestas: [{ id: 1, respuesta: "11", correcta: false }, { id: 2, respuesta: "16", correcta: true }, { id: 3, respuesta: "13", correcta: false }, { id: 4, respuesta: "10", correcta: false }],
                    idTema: 1,
                    formato: "Grafica"
                }],
                xp: 100
            }]

        };
    },

    methods: {
        botoncliclado(pregunta) {
            this.preguntaSeleccionada = pregunta; // Guardar la pregunta seleccionada
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
        }
    },

    created() {
        getEjercicios().then(response => {
            this.Ejercicio = response;
        });
        //Llamar primero formato de la primera pregunta que va a venir
    },


}

</script>

<style></style>