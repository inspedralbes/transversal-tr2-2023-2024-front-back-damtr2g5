<template>
    <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4" elevation="4" height="250"
        rounded max-width="800" width="100%">
        <div>
            <div class="text-h5 font-weight-medium mb-2">
                {{ preguntas.pregunta }}
                <v-btn icon="mdi-cached" size="x-small" @click="reinicio"></v-btn>
            </div>

            <v-btn-toggle>
                <v-btn v-for="(respuesta, index) in preguntas.muestra" :key="index" class="respuesta-container" outlined
                    rounded :color="getButtonColor(index)" @click="recoger(respuesta[0], 'cero') "
                    :disabled="isDisabled(respuesta[0])">
                    {{ respuesta[0] }}
                </v-btn>
            </v-btn-toggle>
            <v-btn-toggle>
                <v-btn v-for="(respuesta, index) in preguntas.muestra" :key="index" class="respuesta-container" outlined stacked
                    rounded :color="getButtonColor(index)" @click="recoger(respuesta[1], 'uno')"
                    :disabled="isDisabled(respuesta[1])">
                    {{ respuesta[1] }}
                </v-btn>
            </v-btn-toggle>
        </div>
    </v-sheet>
</template>
  
<script>
export default {
    data() {
        return {
            preguntas: {
                "_id": {
                    "$oid": "6565b1a56f122bd6cf8e9f0e"
                },
                "id": 4,
                "pregunta": "Convierte a metros las siguientes unidades",
                "respuestas": [
                    [
                        "50 kilómetros",
                        "50000 metros"
                    ],
                    [
                        "5 decimetros",
                        "0.5 metros"
                    ],
                    [
                        "50 hectómetros",
                        "5000 metros"
                    ],
                    [
                        "5 milímetros",
                        "0.005 metros"
                    ]
                ],
                "muestra": [
                    [
                        "50 kilómetros",
                        "0.005 metros"
                    ],
                    [
                        "5 decimetros",
                        "50000 metros"
                    ],
                    [
                        "5 milímetros",
                        "0.5 metros"
                    ],
                    [
                        "50 hectómetros",
                        "5000 metros"
                    ]
                ],
                "correcta": "50000 metros",
                "idTema": "4",
                "formato": "Unir valores"
            },
            seleccion: [],
            colors: ['red', 'green', 'purple', 'yellow'],
            indice1: 0,
            puesto1: false,
            puesto2: false,
        };
    },
    created() {
        this.reinicio()
    },
    methods: {
        reinicio() {
            this.seleccion = JSON.parse(JSON.stringify(this.preguntas.muestra));
            for (let i = 0; i < this.preguntas.muestra.length; i++) {
                for (let j = 0; j < this.preguntas.muestra[i].length; j++) {
                    this.seleccion[i][j] = ''
                }
            }
        },
        getButtonColor(respuesta) {
            return this.colors[this.indice1]
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
                if (this.indice1 == this.preguntas.muestra.length) {
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
    },
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
</style>
  