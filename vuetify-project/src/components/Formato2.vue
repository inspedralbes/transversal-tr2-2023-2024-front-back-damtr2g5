<template>
    <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4" elevation="4" height="250"
        rounded max-width="800" width="100%">
        <div>
            <div class="text-h5 font-weight-medium mb-2">
                {{ preguntas.pregunta }}
            </div>

            <v-row>
                <v-col cols="6">
                    <v-btn v-for="(respuestas, index) in preguntas.muestra" :key="index" class="respuesta-container">
                        <v-btn v-for="(respuesta, idx) in respuestas" :key="idx"
                            @click="toggleSeleccion(respuestas, respuesta)" outlined rounded
                            :color="getButtonColor(respuesta)">
                            {{ respuesta }}
                        </v-btn>
                    </v-btn>
                </v-col>

                <v-col cols="6">
                    <v-btn @click="reinicio"  outlined rounded color="primary">
                        Reinicio
                    </v-btn>
                </v-col>
            </v-row>
            {{ seleccionDer }}
            {{ seleccionIzq }}
        </div>
    </v-sheet>
</template>
  
<script>
export default {
    data() {
        return {
            respuestasSeleccionadas: {
                primeraColumna: null,
                segundaColumna: null
            },
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
            seleccionIzq:[],            
            seleccionDer:[],
            colors:['red', 'green', 'blue', 'yellow'],
            colors2:[],
        };
    },
    created() {
        this.seleccionIzq = this.preguntas.muestra.map(respuestas => respuestas[0]);
        this.seleccionDer = this.preguntas.muestra.map(respuestas => respuestas[1]);
    },
    methods: {
        toggleSeleccion(respuestas, respuesta) {
            if (this.respuestasSeleccionadas.primeraColumna === null) {
                this.respuestasSeleccionadas.primeraColumna = respuesta;
            } else if (this.respuestasSeleccionadas.segundaColumna === null) {
                this.respuestasSeleccionadas.segundaColumna = respuesta;
            } else {
                // Si ambos botones ya han sido seleccionados, reiniciar la selección
                this.respuestasSeleccionadas = {
                    primeraColumna: respuesta,
                    segundaColumna: null
                };
            }
        },
        reinicio() {
            this.respuestasSeleccionadas = {
                primeraColumna: null,
                segundaColumna: null
            };
        },
        getButtonColor(respuesta) {
            this.colors2.push(this.colors[1])
            this.colors.splice(1, this.colors.length-1);

            
            return colors[this.preguntas.respuestas.findIndex(respuestas => respuestas.includes(respuesta)) % colors.length];
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
}
</style>
  