<template>
        <div class="mt-15 ml-15 mr-15">
            <div class="text-h5 font-weight-medium mb-2">
                {{ pregunta.pregunta }}
            </div>
            <v-text-field :disabled="isDisabled" v-model="selectedAnswer" placeholder="Escribe la respuesta aquí" variant="outlined"
                rounded></v-text-field>
        </div>
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
        },
        isDisabled: {
            type: Boolean,
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
