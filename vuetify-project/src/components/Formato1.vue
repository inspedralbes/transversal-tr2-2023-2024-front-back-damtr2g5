<template>
        <div class="mt-15 ml-15 mr-15">
            <div class="text-h5 font-weight-medium mb-2 ">
                {{ pregunta.pregunta }}
            </div>
            <v-btn-toggle v-model="selectedAnswer" mandatory color="rgb(162, 210, 255)">
                <v-btn v-for="(respuesta, index) in pregunta.respuestas" :key="index" :value="respuesta.respuesta" outlined
                    rounded @click='guardado()'>
                    {{ respuesta.respuesta }}
                </v-btn>
            </v-btn-toggle>
        </div>
</template>

<script>
import { useAppStore } from '@/store/app'

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

