<template>
    <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4" elevation="4" height="250"
        rounded max-width="800" width="100%">
        <div>
            <div class="text-h5 font-weight-medium mb-2">
                {{ pregunta.pregunta }}
            </div>
            <v-text-field v-model="selectedAnswer" placeholder="Escribe la respuesta aquí" variant="outlined" rounded></v-text-field>
        </div>
    </v-sheet>
</template>

<script>
export default {
    name: 'Formato1',
    data() {
        return {
            pregunta: {
                "pregunta": "Resuelve la ecuación: 2x + 5 = 17",
                "respuestas": [
                    { "respuesta": "x = 6" }
                ],
                "idTema": 2,
                "formato": "Respuesta"
            },
            selectedAnswer: null
        };
    },
    // Your component's logic goes here
};
</script>

<style scoped></style>
