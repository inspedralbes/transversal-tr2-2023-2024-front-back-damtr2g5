<template>
    <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4" elevation="4" height="250"
        rounded max-width="1000" width="100%">
        <div>
            <div class="text-h5 font-weight-medium mb-2">
                {{ pregunta.pregunta }}
            </div>
            <v-btn-toggle v-model="selectedAnswer" mandatory color="rgb(162, 210, 255)">
                <v-btn v-for="(respuesta, index) in pregunta.respuestas" :key="index" :value="respuesta.respuesta" outlined
                    rounded @click='guardado()'>
                    {{ respuesta.respuesta }}
                </v-btn>
            </v-btn-toggle>
        </div>
    </v-sheet>
</template>

<script>

export default {
    name: 'Formato1',
    props: {
        preguntaSeleccionada: {
            type: Object,
            required: true
        }
    },   
    data() {
        const selectedAnswer =''
        return {
            pregunta: {
                "id": 5,
                "pregunta": "Calcula el área de un triángulo con base de $$$ unidades y altura de &&& unidades",
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
                "idTema": "5",
                "formato": "Seleccionar"
            },
            selectedAnswer
        };
    },
    methods: {
        guardado() {
            this.appStore.setRespuesta(this.selectedAnswer)
        }
    },
    setup() {
        const appStore = useAppStore()
        return {
            appStore
        };
    },
    created() {
        this.pregunta = this.preguntaSeleccionada;
    },   

 
};
</script>

<style scoped></style>

