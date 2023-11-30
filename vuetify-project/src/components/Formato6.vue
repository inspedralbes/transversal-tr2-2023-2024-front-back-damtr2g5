<template>
        <v-container>
            <div class="text-h5 font-weight-medium mb-2">
                {{ pregunta.pregunta }}
            </div>
            <ScatterLineChart />
        </v-container>
</template>

<script>
import ScatterLineChart from './scatterLineChart.vue';

export default {
    name: 'Formato6',
    components: {
        ScatterLineChart
    },
    props: {
        preguntaSeleccionada: {
            type: Object,
            required: true
        }
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
    created() {    
  
        this.pregunta = this.preguntaSeleccionada;      
    },
   
};
</script>

<style scoped></style>