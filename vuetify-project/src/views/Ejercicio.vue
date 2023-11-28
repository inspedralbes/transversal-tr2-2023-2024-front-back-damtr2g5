<template>
    <v-container>
        Hola desde ejercicio
    </v-container>
</template>
  
    
<script>

//import { socket, state } from './socket';
export default {
    name: 'Ejercicio',
    data() {
        return {
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
                    id: 1,
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

<style>
.red-btn {
    background-color: #ff3547 !important;
    color: white !important;
}

.blue-btn {
    background-color: #007bff !important;
    color: white !important;
}
</style>