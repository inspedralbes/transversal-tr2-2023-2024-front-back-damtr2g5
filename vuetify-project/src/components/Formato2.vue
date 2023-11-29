<template>
    <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4" elevation="4" height="250"
        rounded max-width="800" width="100%">
        <div>
            <div class="text-h5 font-weight-medium mb-2">
                {{ pregunta.pregunta }}
                <v-btn icon="mdi-cached" size="x-small" @click="reinicio"></v-btn>
            </div>

            <v-btn-toggle :key="chartKey">
                <v-btn v-for="(respuesta, index) in preguntas.muestra" :key="index" class="respuesta-container" outlined
                    rounded @click="recoger(respuesta[0], 'cero')" :color="getButtonColor()"
                    :disabled="isDisabled(respuesta[0])" :class="{ 'disable-input': disabled }">
                    {{ respuesta[0] }}
                </v-btn>
            </v-btn-toggle>
            <v-btn-toggle :key="chartKey1">
                <v-btn v-for="(respuesta, index) in preguntas.muestra" :key="index" class="respuesta-container" outlined
                    stacked rounded @click="recoger(respuesta[1], 'uno')" :color="getButtonColor()"
                    :disabled="isDisabled(respuesta[1])" :class="{ 'disable-input': disabled }" >
                    {{ respuesta[1] }}
                </v-btn>
            </v-btn-toggle>
        </div>
    </v-sheet>
</template>
  
<script>

import { watch, ref } from 'vue'
export default {
    name: 'Formato2',
    props: {
        preguntaSeleccionada: {
            type: Object,
            required: true
        }
    },
    data() {        

        const chartKey = ref(0)
        const chartKey1 = ref(0)
        const modelo = ref(0)
        const updateChartData = () => {
            chartKey.value += 1
            chartKey1.value += 1
        }

        watch(() => modelo, () => {
            updateChartData()
        }, { deep: true })
        return {            
            pregunta:{},
            seleccion: [],
            colors: ['red', '#8ecae6', 'purple', 'yellow'],
            indice1: 0,
            indiceColors:0,
            puesto1: false,
            puesto2: false,
            disabled: true,
            modelo,
            chartKey, chartKey1,
        };
    },
    created() {        
        this.pregunta = this.preguntaSeleccionada;
        this.reinicio();
        
        
    },
    methods: {
        reinicio() {
            this.seleccion = JSON.parse(JSON.stringify(this.pregunta.muestra));
            for (let i = 0; i < this.pregunta.muestra.length; i++) {
                for (let j = 0; j < this.pregunta.muestra[i].length; j++) {
                    this.seleccion[i][j] = ''
                }
            }
            this.modelo++
        },
        getButtonColor() {
            return 'blue'
        },
        getDisabledColor() {
            this.indiceColors++
            return this.colors[this.indiceColors]
        },
        recoger(respuesta, pos) {
            if (pos == 'cero') {
                this.seleccion[this.indice1][0] = respuesta
                this.puesto1 = true
            } else {
                this.seleccion[this.indice1][1] = respuesta
                this.puesto2 = true
            }
            if (this.puesto1 && this.puesto2) {
                this.indice1++
                this.puesto1 = false
                this.puesto2 = false
                if (this.indice1 == this.pregunta.muestra.length) {
                    this.indice1 = 0
                }
            }
        },
        isDisabled(index) {
            for (let i = 0; i < this.seleccion.length; i++) {
                if (this.seleccion[i].includes(index)) {
                    return true
                }
            }
        },
    }
    
};
</script>
  
<style>
.respuesta-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    cursor: pointer;
    flex-direction: column;
}

.disable-input:disabled {
    background-color: v-bind(getDisabledColor()) !important;
}

</style>
  