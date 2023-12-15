<!--FORMATO SELECCIONAR-->
<template>
    <div class="mt-15 ml-15 mr-15">
        <div class="text-h5 font-weight-medium mb-2 ">
            {{ pregunta.pregunta }}
        </div>
        <v-btn-toggle :disabled="isDisabled" v-model="selectedAnswer" mandatory color="rgb(0, 0, 0,0.9)"
            class="custom-btn-toggle">
            <v-btn v-for="(respuesta, index) in pregunta.respuestas" :key="index" :value="respuesta.respuesta" outlined
                rounded class="button-30" @click="guardado()">
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

<style >

/* CSS */
.button-30 {
  align-items: center;
  appearance: none;
  background-color: #FCFCFD;
  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
  box-sizing: border-box;
  color: #36395A;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono",monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
  font-size: 18px;
  margin-left: 20px;
}

.button-30:focus {
  box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
  color:white;
}

.button-30:hover {
  box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
  transform: translateY(-2px);
}

.button-30:active {
  box-shadow: #D6D6E7 0 3px 7px inset;
  transform: translateY(2px);
  color:white;
}
.custom-btn-toggle {
  border-radius: 0;
}
</style>



