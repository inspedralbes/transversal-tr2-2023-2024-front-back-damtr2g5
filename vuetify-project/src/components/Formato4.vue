<!--FORMATO IMAGEN-->
<template>
        <div class="mt-15 ml-15 mr-15">
            <div class="text-h5 font-weight-medium mb-2">
                {{ pregunta.pregunta }}
            </div>
            <v-slide-group v-model="model" class="pa-4" selected-class="br-success" show-arrows>
                <v-slide-group-item v-for="(respuesta, index) in pregunta.respuestas" :key="index"
                    v-slot="{ isSelected, toggle, selectedClass }">
                    <v-card :disabled="isDisabled" color="white lighten-1" :class="['ma-4', selectedClass]" height="100" width="100"
                    :style="{ border: isSelected ? '5px solid green' : 'none' }">
                    <div class="card-image" :style="{ backgroundImage: 'url(' + getImage(respuesta.imagen) + ')' }"
                        @click="toggle"></div>
                    </v-card>
                </v-slide-group-item>
            </v-slide-group>
        </div>
</template>

<script>
import { useAppStore } from '@/store/app'
import {watch, ref} from 'vue'
import { getAnswerImage } from '@/communicationsManager';
export default {
    name: 'Formato4',
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
        getImage(fileName) {
            const image =`http://localhost:3001/imagenPregunta/${fileName}`
            return image
        },
        
        toggle() {
            this.estilo.border = '2px solid red'
        }
    },
    created() {       
        this.pregunta = this.preguntaSeleccionada;
    },
};
</script>
<style scoped>
.card-image {
  width: 100%;
  height: 100%;
  background-size: contain; /* or 'contain' based on preference */
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
