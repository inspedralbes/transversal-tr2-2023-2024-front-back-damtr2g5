<!--FORMATO SELECCIONAR-->
<template>
    <div class="mt-15 ml-15 mr-15">
        <div class="big-font mb-8 ">
            {{ pregunta.pregunta }}
        </div>
        <v-row>
            <v-col v-for="(respuesta) in pregunta.respuestas" cols="12" md="6" sm="6" lg="3">
                <div class="radio-button">
                    <input :disabled="isDisabled" @click="guardado()" :value="respuesta.respuesta" v-model="selectedAnswer" type="radio"
                        class="radio-button__input " :id="respuesta.respuesta" name="radio-group">
                    <label class="radio-button__label" style="font-size: 1.3em;" :for="respuesta.respuesta">
                        <span class="radio-button__custom"></span>
                        {{ respuesta.respuesta }}
                    </label>
                </div>
            </v-col>
        </v-row>
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
        },
        isDisabled: {
            type: Boolean,
            required: true
        }
    },
    data() {
        const selectedAnswer = ''
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
            setTimeout(() => {
                console.log("selectedAnswer", this.selectedAnswer);
                this.appStore.setRespuesta(this.selectedAnswer)
            }, 10)

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



