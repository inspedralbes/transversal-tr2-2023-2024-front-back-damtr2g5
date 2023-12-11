<template >
    <div class="mt-15 ml-15 mr-15">
        <div class="text-h5 font-weight-medium mb-2">
            {{ pregunta.pregunta }}
            <v-btn icon="$refresh" size="x-small" @click="reinicio"></v-btn>
        </div>

        <div class="mt-15 ml-15 mr-15 d-flex flex-row">
            <v-container>
                <v-row v-for="(card, index) in pregunta.respuestas[0]" :key="'first-row-' + index">
                    <v-col cols="auto">
                        <v-card :class="getCardClass(0, index)" @click="selectCard(0, index)">
                            <v-card-title>{{ card }}</v-card-title>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
            <v-container>
                <v-row v-for="(card, index) in pregunta.respuestas[1]" :key="'second-row-' + index">
                    <v-col cols="auto">
                        <v-card :class="getCardClass(1, index)" @click="selectCard(1, index)">
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
import { reactive, ref, toRefs } from 'vue';
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
    },
    methods: {

    }, setup() {
        const state = reactive({
            selectedCards: [{ row: null, index: null }, { row: null, index: null }],
            pairsFound: 0,
            matchedPairs: []
        });
        const pregunta = {
            "id": 2,
            "pregunta": "Convierte a metros las siguientes unidades(Pregunta2)",
            "respuestas": [
                [
                    "50 kilómetros",
                    "5 decimetros",
                    "0.5 metros",
                    "0.5 metros"
                ],
                [
                    "50000 metros",
                    "0.5 metros",
                    "5000 metros",
                    "0.005 metros"
                ]
            ],
            "idTema": "4",
            "formato": "Unir valores"
        }
        function selectCard(row, index) {
            const card = pregunta.respuestas[row][index]; // Obtener el contenido de la tarjeta seleccionada

            // Verificar si la tarjeta ya está seleccionada
            const isSelected = state.selectedCards.some(selected => selected.row === row && selected.index === index);

            if (!isSelected) {
                state.selectedCards.push({ row, index, content: card }); // Marcar la tarjeta como seleccionada

                // Lógica para verificar si se forma una pareja
                if (state.selectedCards.length === 2) {
                    const [card1, card2] = state.selectedCards;

                    if (card1.content === card2.content) {
                        // Encontró una pareja
                        // Realizar acciones adicionales si es necesario
                        state.selectedCards = []; // Reiniciar las tarjetas seleccionadas para el siguiente turno
                    } else {
                        // No es una pareja, deseleccionar las tarjetas después de un breve tiempo
                        setTimeout(() => {
                            state.selectedCards = [];
                        }, 1000); // Cambiar el tiempo de espera si es necesario
                    }
                }
            }
        }

        function isSelected(row, index) {
            return (
                state.selectedCards[row].row === row && state.selectedCards[row].index === index
            );
        }
        function getCardClass(row, index) {
            const colors = ['red', 'blue', 'green', 'yellow', 'purple']; // Lista de colores
            const colorIndex = row * pregunta.respuestas[0].length + index; // Índice único basado en la posición de la tarjeta

            return `card-color-${colors[colorIndex % colors.length]}`;
        }

        return {
            state,
            selectCard,
            getCardClass,
            pregunta
        };
    }
}
</script>
<style >
.selected {
    /* Add your custom style for selected cards */
    background-color: blueviolet;
    /* Change this to the color you want */
}

.card-color-red {
    background-color: red;
}

.card-color-blue {
    background-color: blue;
}

.card-color-green {
    background-color: green;
}

.card-color-yellow {
    background-color: yellow;
}

.card-color-purple {
    background-color: purple;
}
</style>