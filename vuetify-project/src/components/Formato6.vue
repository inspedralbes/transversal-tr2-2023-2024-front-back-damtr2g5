<!--FORMATO GRAFICO-->
<template>
    <v-container style="padding-left: 0; padding-right: 0;">
        <div class="big-font font-weight-medium mb-2">
            {{ pregunta.pregunta }}
        </div>
        <v-row justify="center">
            <v-col style="padding-left: 0; padding-right: 0;" cols="12" lg="5" md="5" sm="8">
                <ScatterLineChart :isClickDisabled.sync="isDisabled" />
            </v-col>
        </v-row>
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
        },
        isDisabled: {
            type: Boolean,
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