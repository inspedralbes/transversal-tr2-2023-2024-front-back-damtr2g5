<template>
    <v-container>
        <v-btn elevation="6" border="lg opacity-12"  rounded="lg" class="red-btn"
            :style="{ marginBottom: '20px', width: '40vw', marginLeft: 'auto', marginRight: 'auto', display: 'block' }">{{
                Ejercicio[0].nombre }}</v-btn>
        <v-sheet  color="#f68b1f"  elevation="6" border="lg opacity-12" max-width="2000" max-height="500" rounded="xl" width="1200" height="500" class="pa-4 text-center mx-auto" >
            <v-card-title>Numero de preguntes: {{ Ejercicio[0].preguntas.length }}</v-card-title>
            <v-card-title>Tematica: {{ Ejercicio[0].id_tema }}</v-card-title>
            <v-card-title>Realitzat: SI</v-card-title>
            <v-card-title>Preguntes contestades: 7/10</v-card-title>
        </v-sheet>
        <v-btn @click="" elevation="6" border="lg opacity-12"  rounded="lg" class="blue-btn"
            :style="{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', display: 'block' }">Començar</v-btn>
    </v-container>
</template>
  
    
<script>

//import { socket, state } from './socket';
export default {
    name: 'InfoEjercicio',
    data() {
        return {
            Ejercicio: [{
                id: 1,
                nombre: "Exercici 1",
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