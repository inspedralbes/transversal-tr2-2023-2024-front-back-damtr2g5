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
import { useAppStore } from '@/store/app'
import {watch, ref} from 'vue'
export default {
    name: 'Formato4',
    props: {
        preguntaSeleccionada: {
            type: Object,
            required: true
        }
    },
    data() {
        const store = useAppStore();
        const model = ref(null);
        watch(model, (val) => {
            if (val !== undefined) {
                store.setRespuesta(this.preguntaSeleccionada.respuestas[val].respuesta);
            }else{
                store.setRespuesta('');
            }
        });
        return {
            store,
            pregunta: {               
            },
            selectedAnswer: null,
            estilo: {
                "border": '2px solid red',
            },
            model,
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
