<template>
    <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4" elevation="4" height="250" rounded max-width="800" width="100%">
        <div>
            <div class="text-h5 font-weight-medium mb-2">
                {{ pregunta.pregunta }}
            </div>
            <v-btn-toggle v-model="selectedAnswer" mandatory color="rgb(162, 210, 255)">
                <v-btn v-for="(respuesta, index) in pregunta.respuestas" :key="index" :value="respuesta.respuesta" outlined rounded>
                    {{ respuesta.respuesta }}
                </v-btn>
            </v-btn-toggle>
        </div>
    </v-sheet>
</template>

<script>
export default {
    name: 'Formato1',
    data() {
        return {
            pregunta: {
                pregunta: '¿Cuál es el resultado de 5 + 3 * 2?',
                respuestas: [
                    { respuesta: '11', correcta: false },
                    { respuesta: '16', correcta: true },
                    { respuesta: '13', correcta: false },
                    { respuesta: '10', correcta: false }
                ],
                idTema: 1,
                formato: 'Seleccionar'
            },
            selectedAnswer: null
        };
    },
    // Your component's logic goes here
};
</script>

<style scoped>
</style>
