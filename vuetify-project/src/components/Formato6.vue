<template>
    <v-sheet class="d-flex align-center justify-center text-center mx-auto px-4" elevation="4" rounded max-width="800"
        width="100%">
        <v-container>
            <div class="text-h5 font-weight-medium mb-2">
                {{ pregunta.pregunta }}
            </div>
            <ScatterLineChart />
        </v-container>

    </v-sheet>
</template>

<script>
import ScatterLineChart from './scatterLineChart.vue';

export default {
    name: 'Formato1',
    components: {
        ScatterLineChart
    },
    data() {
        return {
            pregunta:
            {
                "id": 3,
                "pregunta": "Representa la función y = 3x + 2 en un gráfico",
                "idTema": "3",
                "formato": "Grafica"

            },
            selectedAnswer: null
        };
    },
    // Your component's logic goes here
};
</script>

<style scoped></style>
