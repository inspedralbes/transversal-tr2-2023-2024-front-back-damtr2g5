<!--FORMATO ORDENAR-->
<template>
    <div class="mt-15 ml-15 mr-15">
        <div class="big-font font-weight-medium mb-2">
            {{ pregunta.pregunta }}
        </div>
        <v-container>
            <v-row class="justify-center">
                <v-col v-for="(valor, i) in respuesta" :key="i" cols="auto">
                    <v-card style="text-align: center; display: flex; justify-content: center;" :disabled="isDisabled" v-if="valor" class="mx-auto carta" width="80" height="80" color="#F87060"
                        @click="moverCarta(i, 'respuesta', 'posibles')">
                        <v-card-item>
                            <v-card-title>{{ valor }}</v-card-title>
                        </v-card-item>
                    </v-card>
                    <v-card style="text-align: center; display: flex; justify-content: center;" v-else class="mx-auto carta" width="80" height="80">

                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-container>
            <v-row class="justify-center">
                <v-col v-for="(valor, i) in posibles" :key="i" cols="auto">
                    <v-card style="text-align: center; display: flex; justify-content: center;" :disabled="isDisabled" v-if="valor" class="mx-auto" width="80" height="80" color="#102542"
                        @click="moverCarta(i, 'posibles', 'respuesta')">
                        <v-card-item>
                            <v-card-title>{{ valor }}</v-card-title>
                        </v-card-item>
                    </v-card>
                    <v-card style="text-align: center; display: flex; justify-content: center;" v-else class="mx-auto carta2" width="80" height="80" color="rgb(255,255,255)">

                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
  
<script>
import { useAppStore } from '@/store/app'
export default {
    name: 'Formato5',
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
            store: useAppStore(),
            pregunta: {
            },
            enviar: false,
            respuesta: [],
            posibles: [],
        };
    },
    computed: {
        respuestaCorrecta() {
            const respuesta = this.respuesta.filter(element => element === null || element === undefined)
            if (respuesta.length === this.respuesta.length) {
                return false
            } else if (respuesta.length === 0) {
                return true
            }
        }
    },
    methods: {
        moverCarta(index, origen, destino) {
            const carta = this[origen][index];

            if (destino === 'respuesta') {
                this.respuesta.find((element, indice) => {
                    if (element === null || element === undefined) {
                        this.respuesta[indice] = carta;
                        this.posibles[index] = null;
                        return true;
                    }
                })
            } else {
                this.posibles.find((element, indice) => {
                    if (element === null) {
                        this.posibles[indice] = carta;
                        this.respuesta[index] = null;
                        return true;
                    }
                })
            }

            const respuesta = this.respuesta.filter((element) => {
                (element === null || element === undefined)
            })
            if (!this.respuestaCorrecta) {
                this.store.setRespuesta('')
            } else {
                this.store.setRespuesta(this.respuesta)
            }
        },
    },
    created() {
        this.pregunta = this.preguntaSeleccionada;
        this.posibles = this.pregunta.componentes.slice();
        this.respuesta = Array.apply(null, Array(this.posibles.length)); // Copiar los valores para no modificar los originales
    },
};
</script>
  
<style>
.carta2{
    all: unset !important;
}</style>
  