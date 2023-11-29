<template>
    <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4" elevation="4" height="250"
        rounded max-width="1000" width="100%">
        <div>
            <div class="text-h5 font-weight-medium mb-2">
                {{ pregunta.pregunta }}
            </div>
            <v-btn-toggle v-model="selectedAnswer" mandatory color="rgb(162, 210, 255)">
                <v-btn v-for="(respuesta, index) in pregunta.respuestas" :key="index" :value="respuesta.respuesta" outlined
                    rounded>
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
                "_id": {
                    "$oid": "6565d7516f122bd6cf8e9f89"
                },
                "id": 5,
                "pregunta": "Calcula el área de un triángulo con base de 6 unidades y altura de 8 unidades",
                "respuestas": [
                    {
                        "respuesta": "24 unidades cuadradas"
                    },
                    {
                        "respuesta": "30 unidades cuadradas"
                    },
                    {
                        "respuesta": "40 unidades cuadradas"
                    },
                    {
                        "respuesta": "12 unidades cuadradas"
                    }
                ],
                "correcta": "24 unidades cuadradas",
                "idTema": "5",
                "formato": "Seleccionar"
            },
            selectedAnswer: null
        };
    },
    // Your component's logic goes here
};
</script>

<style scoped></style>
