<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="py-2">
                <v-btn-toggle v-model="selectedButton" rounded="0" color="deep-purple-accent-3" group mandatory>
                    <v-btn v-for="(boton, index) in Ejercicio[0].preguntas" :key="boton.id" :value="boton.id"
                        @click="botoncliclado(boton)">
                        {{ index + 1 }}
                    </v-btn>
                </v-btn-toggle>
            </v-col>
        </v-row>
    </v-container>
    <v-container>
        <component :is="componentSelecionat" v-if="componentSelecionat"/>
    </v-container>
</template>
  
    
<script>
import Hello from '../components/HelloWorld.vue';
import Prueba from '../components/prueba.vue';


//import { socket, state } from './socket';
export default {
    name: 'Ejercicio',
    components: {        
        Hello,
        Prueba
    },
    data() {
        return {
            selectedButton: null,
            componentSelecionat: null,
            Ejercicio: [{
                id: 1,
                nombre: "Ejercicio",
                tipo: "Practicas",
                id_tema: 1,
                preguntas: [{
                    id: 1,
                    pregunta: "¿Cuál es el resultado de 5 + 3 * 2?",
                    respuestas: [{ id: 1, respuesta: "11", correcta: false }, { id: 2, respuesta: "16", correcta: true }, { id: 3, respuesta: "13", correcta: false }, { id: 4, respuesta: "10", correcta: false }],
                    idTema: 1,
                    formato: "Seleccionar"
                },
                {
                    id: 2,
                    pregunta: "¿Cuál es el resultado de 5 + 3 * 2?",
                    respuestas: [{ id: 1, respuesta: "11", correcta: false }, { id: 2, respuesta: "16", correcta: true }, { id: 3, respuesta: "13", correcta: false }, { id: 4, respuesta: "10", correcta: false }],
                    idTema: 1,
                    formato: "Prueba"
                },
                {
                    id: 3,
                    pregunta: "¿Cuál es el resultado de 5 + 3 * 2?",
                    respuestas: [{ id: 1, respuesta: "11", correcta: false }, { id: 2, respuesta: "16", correcta: true }, { id: 3, respuesta: "13", correcta: false }, { id: 4, respuesta: "10", correcta: false }],
                    idTema: 1,
                    formato: "Seleccionar"
                },
                {
                    id: 4,
                    pregunta: "¿Cuál es el resultado de 5 + 3 * 2?",
                    respuestas: [{ id: 1, respuesta: "11", correcta: false }, { id: 2, respuesta: "16", correcta: true }, { id: 3, respuesta: "13", correcta: false }, { id: 4, respuesta: "10", correcta: false }],
                    idTema: 1,
                    formato: "Seleccionar"
                }],
                xp: 100
            }]

        };
    },

    methods: {
        botoncliclado(pregunta) {
            if(pregunta.formato=="Seleccionar"){
                this.componentSelecionat = Hello;
            }
            if(pregunta.formato=="Prueba"){
                this.componentSelecionat = Prueba;
            }




        }

    },

    created() {

        //Llamar primero formato de la primera pregunta que va a venir
    },


}

</script>

<style></style>