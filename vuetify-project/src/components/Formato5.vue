<template>
    <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4" elevation="4" height="250"
        rounded max-width="800" width="100%">
        <div>
            <div class="text-h5 font-weight-medium mb-2">
                {{ pregunta.pregunta }}
            </div>
            <v-container>
                <v-row>
                    <v-col v-for="(valor, i) in respuesta" :key="i" cols="auto">
                        <v-card v-if="valor" class="mx-auto carta" width="60" height="60" color="#ffc8dd"
                            @click="moverCarta(i, 'respuesta', 'posibles')">
                            <v-card-item>
                                <v-card-title>{{ valor }}</v-card-title>
                            </v-card-item>
                        </v-card>
                        <v-card v-else class="mx-auto carta" width="60" height="60">
                            HOLA
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
            <v-container>
                <v-row>
                    <v-col v-for="(valor, i) in posibles" :key="i" cols="auto">
                        <v-card class="mx-auto" width="60" height="60" color="#219ebc"
                            @click="moverCarta(i, 'posibles', 'respuesta')">
                            <v-card-item>
                                <v-card-title>{{ valor }}</v-card-title>
                            </v-card-item>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </v-sheet>
</template>
  
<script>
export default {
    name: 'Formato5',
    props: {
        preguntaSeleccionada: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            pregunta: {                
            },
            
            respuesta: [],
            posibles: [],
        };
    },
    methods: {
        moverCarta(index, origen, destino) {
            const carta = this[origen][index];
            this[origen].splice(index, 1); // Remover carta del origen

            if (destino === 'respuesta') {
                // Agregar la carta al destino (respuesta)
                this.respuesta.push(carta);
            } else {
                // Agregar la carta al destino (posibles)
                this.posibles.push(carta);
            }
        },
    },
    created() {     
        
  
        // Llenar los conjuntos de cartas con valores predefinidos
        this.respuesta = [];
        this.pregunta = this.preguntaSeleccionada;
        this.posibles = this.pregunta.componentes.slice(); // Copiar los valores para no modificar los originales
    },
};
</script>
  
<style scoped></style>
  