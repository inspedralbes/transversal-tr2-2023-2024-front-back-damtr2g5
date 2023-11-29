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
    name: 'Formato4',
    props: {
        preguntaSeleccionada: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            pregunta: {            
            },
            selectedAnswer: null
        };
    },
    created() {       
        this.pregunta = this.preguntaSeleccionada;
    }
    // Your component's logic goes here
};
</script>

<style scoped>
</style>
