<template>
    <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4" elevation="4" height="250"
        rounded max-width="800" width="100%">
        <div>
            <div class="text-h5 font-weight-medium mb-2">
                {{ pregunta.pregunta }}
            </div>
            <v-text-field v-model="selectedAnswer" placeholder="Escribe la respuesta aquí" variant="outlined"
                rounded></v-text-field>
        </div>
    </v-sheet>
</template>

<script>
import { useAppStore } from '@/store/app'
import { watch, ref } from 'vue'
export default {
    name: 'Formato3',
    props: {
        preguntaSeleccionada: {
            type: Object,
            required: true
        }
    },
    data() {
        const appStore = useAppStore()
        const selectedAnswer = ref('')
        watch(() => selectedAnswer, () => {
            if (selectedAnswer.value != '') {
                appStore.setRespuesta(selectedAnswer.value)
            }else{
                appStore.setRespuesta('')
            }
        }, { deep: true })
        return {
            appStore,
            pregunta: {},
            selectedAnswer
        };
    },
    created() {       
        this.pregunta = this.preguntaSeleccionada;
    },
    // Your component's logic goes here
};
</script>

<style scoped></style>
