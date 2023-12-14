<!--FORMATO UNIR-->
<template >
    <div class="mt-15 ml-15 mr-15">
        <div class="text-h5 font-weight-medium mb-2">
            {{ state.pregunta.pregunta }}
        </div>

        <div class="mt-15 ml-15 mr-15 d-flex flex-row">
            <v-container>
                <v-row v-for="(card, index) in state.pregunta.respuestas[0]" :key="'first-row-' + index">
                    <v-col cols="auto">
                        <v-card :style="{ backgroundColor: getColor(0, index) }" @click="selectCard(0, index)">
                            <v-card-title>{{ card }}</v-card-title>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
            <v-container>
                <v-row v-for="(card, index) in state.pregunta.respuestas[1]" :key="'second-row-' + index">
                    <v-col cols="auto">
                        <v-card :style="{ backgroundColor: getColor(1, index) }" @click="selectCard(1, index)">
                            <v-card-title>{{ card }}</v-card-title>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>
<script>
import { useAppStore } from '@/store/app'
import { reactive, ref, watch } from 'vue';
export default {
    name: 'Formato2',
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
        };
    },
    created() {
        this.state.pregunta = this.preguntaSeleccionada;
    },
    methods: {

    }, setup() {
        const appStore = useAppStore()
        const state = reactive({
            selectedCards: [],
            pairsFound: 0,
            matchedPairs: [],
            seleccion: ref([
                { valor1: '', valor2: '', color: 'red' },
                { valor1: '', valor2: '', color: 'blue' },
                { valor1: '', valor2: '', color: 'green' },
                { valor1: '', valor2: '', color: 'purple' },

            ]),
            pregunta: {
            }
        });

        function selectCard(row, index) {
            console.log(state.seleccion);
            const card = state.pregunta.respuestas[row][index];
            const isSelected = state.seleccion.some(selected => selected.valor1 === card || selected.valor2 === card);
            if (!isSelected) {
                let foundEmptySlot = false
                for (let i = 0; i < state.seleccion.length; i++) {
                    if (!state.seleccion[i].valor1 && state.seleccion[i].valor2 && row === 0) {
                        state.seleccion[i].valor1 = card;
                        foundEmptySlot = true;
                        break;
                    } else if (state.seleccion[i].valor1 && !state.seleccion[i].valor2 && row === 1) {
                        state.seleccion[i].valor2 = card;
                        foundEmptySlot = true;
                        break;
                    }
                }
                for (let i = 0; i < state.seleccion.length && !foundEmptySlot; i++) {
                    if (!state.seleccion[i].valor1 && row === 0) {
                        state.seleccion[i].valor1 = card;
                        break;
                    } else if (!state.seleccion[i].valor2 && row === 1) {
                        state.seleccion[i].valor2 = card;
                        break;
                    }
                }
            } else {
                state.seleccion.forEach(objeto => {
                    if (objeto.valor1 === card || objeto.valor2 === card) {
                        objeto.valor1 = '';
                        objeto.valor2 = '';
                    }
                });

            }
        }
        function getColor(row, index) {
            let valorEncontrado = state.seleccion
                .filter(objeto => objeto.valor1 === state.pregunta.respuestas[row][index] || objeto.valor2 === state.pregunta.respuestas[row][index])
                .map((objetoFiltrado) => { return objetoFiltrado.color });
            return valorEncontrado[0];
        }
        watch(() => state.seleccion, () => {
            if (state.seleccion.filter(objeto => objeto.valor1 === "" || objeto.valor2 === "").length === 0) {
                const nuevo = state.seleccion.map(objeto => [objeto.valor1, objeto.valor2]);
                appStore.setRespuesta(nuevo)
            } else {
                appStore.setRespuesta('')
            }
        }, { deep: true })
        return {
            state,
            selectCard,
            getColor,

            appStore
        };
    }
}
</script>
<style ></style>