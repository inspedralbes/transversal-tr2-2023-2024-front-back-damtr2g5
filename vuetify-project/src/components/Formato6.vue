<template>
    <v-container>
        Hola desde formato 6
    </v-container>
</template>

<script>
export default {
    name: 'Formato6',
    props: {
        preguntaSeleccionada: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            pregunta: {
               
            },            
        };
    },
    methods: {
        
    },
    created() {              
        this.pregunta = this.preguntaSeleccionada;  
       
    },
};
</script>