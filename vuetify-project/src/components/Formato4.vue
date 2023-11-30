<template>
    <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4" elevation="4" height="250"
        rounded max-width="800" width="100%">
        <div>
            <div class="text-h5 font-weight-medium mb-2">
                {{ pregunta.pregunta }}
            </div>
            <v-slide-group v-model="model" class="pa-4" selected-class="bg-success" show-arrows>
                <v-slide-group-item v-for="(respuesta, index) in pregunta.respuestas" :key="index"
                    v-slot="{ isSelected, toggle, selectedClass }">
                    <v-card color="grey-lighten-1" :class="['ma-4', selectedClass]" height="100" width="100"
                        :image="respuesta.imagen" @click="toggle" :style="{ border: isSelected ? '5px solid green' : 'none' }">
                        <!-- <v-icon v-if="isSelected" color="white" size="48" icon="mdi-close-circle-outline"></v-icon> -->
                    </v-card>
                </v-slide-group-item>
            </v-slide-group>
        </div>
    </v-sheet>
</template>

<script>
export default {
    name: 'Formato4',
    props: {
        preguntaSeleccionada: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            pregunta: {
                "_id": {
                    "$oid": "6565d7516f122bd6cf8e9fa6"
                },
                "id": 34,
                "pregunta": "¿Qué figura geométrica es un octógono?",
                "respuestas": [
                    {
                        "respuesta": "Pentagon",
                        "imagen": "https://picsum.photos/500/300?image=232"
                    },
                    {
                        "respuesta": "Hexagon",
                        "imagen": "https://picsum.photos/500/300?image=232"
                    },
                    {
                        "respuesta": "Octógono",
                        "imagen": "https://picsum.photos/500/300?image=232"
                    },
                    {
                        "respuesta": "Triangle",
                        "imagen": "https://picsum.photos/500/300?image=232"
                    }
                ],
                "correcta": "Octógono",
                "idTema": 5,
                "formato": "Imagen"
            },
            selectedAnswer: null,
            estilo: {
                "border": '2px solid red',
            },
            model: null,
        };
    },
    methods: {
        /*toggle() {
            this.estilo.border = '2px solid green'
        }*/
    },
    created() {       
        this.pregunta = this.preguntaSeleccionada;
    },
};
</script>
<style scoped></style>
