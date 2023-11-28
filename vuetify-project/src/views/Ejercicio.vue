<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="py-2">
                <v-btn-toggle v-model="selectedButton" rounded="0" color="deep-purple-accent-3" group mandatory>
                    <v-btn v-for="boton in Ejercicio[0].preguntas" :key="boton.id" :value="boton.id">
                        {{ boton.id }}
                    </v-btn>
                </v-btn-toggle>
            </v-col>
        </v-row>
    </v-container>
    <v-container>
        Aqui ira el div de los
    </v-container>
</template>
  
    
<script>

//import { socket, state } from './socket';
export default {
    name: 'Ejercicio',
    data() {
        return {
            selectedButton: null,
            Ejercicio: [{
                id: 1,
                nombre: "Ejercicio",
                tipo: "Practicas",
                id_tema: 1,
                preguntas: [{
                    id: 1,
                    pregunta: "¿Cuál es el resultado de 5 + 3 * 2?",
                    respuestas: [{ id: 1, respuesta: "11", correcta: false }, { id: 2, respuesta: "16", correcta: true }, { id: 3, respuesta: "13", correcta: false }, { id: 4, respuesta: "10", correcta: false }],
                    idTema: 1,
                    formato: "Seleccionar"
                },
                {
                    id: 2,
                    pregunta: "¿Cuál es el resultado de 5 + 3 * 2?",
                    respuestas: [{ id: 1, respuesta: "11", correcta: false }, { id: 2, respuesta: "16", correcta: true }, { id: 3, respuesta: "13", correcta: false }, { id: 4, respuesta: "10", correcta: false }],
                    idTema: 1,
                    formato: "Seleccionar"
                }, 
                {
                    id: 3,
                    pregunta: "¿Cuál es el resultado de 5 + 3 * 2?",
                    respuestas: [{ id: 1, respuesta: "11", correcta: false }, { id: 2, respuesta: "16", correcta: true }, { id: 3, respuesta: "13", correcta: false }, { id: 4, respuesta: "10", correcta: false }],
                    idTema: 1,
                    formato: "Seleccionar"
                }, 
                {
                    id: 4,
                    pregunta: "¿Cuál es el resultado de 5 + 3 * 2?",
                    respuestas: [{ id: 1, respuesta: "11", correcta: false }, { id: 2, respuesta: "16", correcta: true }, { id: 3, respuesta: "13", correcta: false }, { id: 4, respuesta: "10", correcta: false }],
                    idTema: 1,
                    formato: "Seleccionar"
                }],
                xp: 100
            }]

        };
    },

    methods: {

    },

    created() {

    },


}

</script>

<style></style>