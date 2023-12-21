<!--FORMATO UNIR-->
<template >
    <div class="mt-15 ml-15 mr-15">
        <div class="big-font font-weight-medium mb-2">
            {{ state.pregunta.pregunta }}
        </div>

        <div class="d-flex flex-row">

            <v-row>
                <v-col cols="6" sm="6" md="5" lg="5" order="1">
                    <v-card :disabled="isDisabled" variant="outlined" class="mt-4"
                        v-for="(card, index) in state.pregunta.respuestas[0]" :key="'first-row-' + index"
                        :style="{ backgroundColor: getColor(0, index) }" @click="selectCard(0, index)">
                        <v-card-title>{{ card }}</v-card-title>
                    </v-card>
                </v-col>
                <v-col cols="auto" sm="auto" md="2" lg="2" order="3" order-md="2"></v-col>
                <v-col cols="6" sm="6" md="5" lg="5" order="2" order-md="3">
                    <v-card :disabled="isDisabled" variant="tonal" class="mt-4 oxford-blue card2"
                        v-for="(card, index) in state.pregunta.respuestas[1]" :key="'second-row-' + index"
                        :style="{ backgroundColor: getColor(1, index) }" @click="selectCard(1, index)">
                        <v-card-title>{{ card }}</v-card-title>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </div>
</template>
<style>
.card2 {
    border: thin solid currentColor;
}
</style>
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
                { valor1: '', valor2: '', color: '#F87060' },
                { valor1: '', valor2: '', color: '#F7ACCF' },
                { valor1: '', valor2: '', color: '#53D8FB' },
                { valor1: '', valor2: '', color: '#E5E8B6' },

            ]),
            pregunta: {
                "_id": {
                    "$oid": "6576ff079e727e42ea7d5f90"
                },
                "id": 35,
                "pregunta": "Convierte a kilómetros las siguientes unidades:",
                "respuestas": [
                    [
                        "3500 metros",

                        "25 decámetros",

                        "120 hectómetros",

                        "800 milímetros"
                    ],
                    [
                        "0.8 kilómetros",
                        "3.5 kilómetros",
                        ,
                        "12 kilómetros",
                        "0.25 kilómetros"
                    ]
                ],
                "idTema": 4,
                "formato": "Unir valores",
                "correcta": [
                    ["3500 metros", "3.5 kilómetros"],
                    ["25 decámetros", "0.25 kilómetros"],
                    ["120 hectómetros", "12 kilómetros"],
                    ["800 milímetros", "0.8 kilómetros"]
                ],
                "experiencia": 10
            }

        });

        function selectCard(row, index) {
            const cardId = `${row}-${index}`;
            const card = state.pregunta.respuestas[row][index];
            const isSelected = state.seleccion.some(selected => selected.id1 === cardId || selected.id2 === cardId);
            if (!isSelected) {
                let foundEmptySlot = false
                for (let i = 0; i < state.seleccion.length; i++) {
                    if (!state.seleccion[i].valor1 && state.seleccion[i].valor2 && row === 0) {
                        state.seleccion[i].valor1 = card;
                        state.seleccion[i].id1 = cardId;
                        foundEmptySlot = true;
                        break;
                    } else if (state.seleccion[i].valor1 && !state.seleccion[i].valor2 && row === 1) {
                        state.seleccion[i].valor2 = card;
                        state.seleccion[i].id2 = cardId;
                        foundEmptySlot = true;
                        break;
                    }
                }
                for (let i = 0; i < state.seleccion.length && !foundEmptySlot; i++) {
                    if (!state.seleccion[i].valor1 && row === 0) {
                        state.seleccion[i].valor1 = card;
                        state.seleccion[i].id1 = cardId;
                        break;
                    } else if (!state.seleccion[i].valor2 && row === 1) {
                        state.seleccion[i].valor2 = card;
                        state.seleccion[i].id2 = cardId;
                        break;
                    }
                }
            } else {
                state.seleccion.forEach(objeto => {
                    if (objeto.id1 === cardId) {
                        objeto.valor1 = '';
                        objeto.id1 = '';
                    } else if (objeto.id2 === cardId) {
                        objeto.valor2 = '';
                        objeto.id2 = '';
                    }
                });
            }
        }

        function getColor(row, index) {
            const cardId = `${row}-${index}`;
            let valorEncontrado = state.seleccion
                .filter(objeto => objeto.id1 === cardId || objeto.id2 === cardId)
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