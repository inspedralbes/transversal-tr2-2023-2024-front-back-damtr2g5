<template>
    <v-container>
        <v-btn elevation="6" border="lg opacity-12" rounded="lg" class="red-btn"
            :style="{ marginBottom: '20px', width: '40vw', marginLeft: 'auto', marginRight: 'auto', display: 'block' }">{{
                Ejercicio[0].nombre }}</v-btn>
        <v-sheet color="#f68b1f" elevation="6" border="lg opacity-12" max-width="2000" max-height="500" rounded="xl"
            width="1200" height="500" class="pa-4 text-center mx-auto">
            <v-card-title>Numero de preguntes: {{ cantidadEjerciciosH.length }}</v-card-title>
            <v-card-title>Tematica: {{ Ejercicio[0].id_tema }}</v-card-title>
            <v-card-title>Realitzat: SI</v-card-title>
            <v-card-title>Preguntes contestades: {{ cantidadEjercicios.length }} / {{ cantidadEjerciciosH.length }}</v-card-title>            
            <v-card-title>EXP: {{ exp }} xp</v-card-title>
        </v-sheet>
        <v-btn @click="empezarEjercicio" elevation="6" border="lg opacity-12" rounded="lg" class="blue-btn"
            :style="{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', display: 'block' }">Començar</v-btn>
    </v-container>
</template>
  
    
<script>
import { GetResueltas, getEjercicios } from '@/communicationsManager';
import { useAppStore } from '@/store/app';
//import { socket, state } from './socket';
export default {
    name: 'InfoEjercicio',
    data() {
        return {
            ejercicioId: null,
            cantidadEjerciciosH: 0,
            cantidadEjercicios:0,
            exp:0,
            store: useAppStore(),
            Ejercicio: [{
                id: 1,
                nombre: "Exercici 1",
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
                    id: 1,
                    pregunta: "¿Cuál es el resultado de 5 + 3 * 2?",
                    respuestas: [{ id: 1, respuesta: "11", correcta: false }, { id: 2, respuesta: "16", correcta: true }, { id: 3, respuesta: "13", correcta: false }, { id: 4, respuesta: "10", correcta: false }],
                    idTema: 1,
                    formato: "Seleccionar"
                }]
            }]

        };
    },

    methods: {
        empezarEjercicio() {
            this.$router.push({ name: 'Ejercicio', params: { id: this.Ejercicio[0].id } });
        }

    },

    created() {
        // Para guardar el parámetro 'id' de la ruta en 'ejercicioId'
        this.ejercicioId = this.$route.params.id;
        let userid = this.store.getLoginInfo();
        let dato = {
            "userId": parseInt(userid.id),
            "ejercicioid": this.Ejercicio[0].id,
        }
        console.log(dato);
        this.cantidadEjerciciosH = GetResueltas(dato).then((res) => {
            this.cantidadEjercicios = res.filter(element => element.correcta == true);
        });
        const ejercicios = getEjercicios().then((res) => {            
            this.cantidadEjerciciosH = res.preguntas;
            res.preguntas.forEach(element => {
                this.exp = this.exp + element.experiencia;
            })
        })
    },


}

</script>

<style>
.red-btn {
    background-color: #ff3547 !important;
    color: white !important;
}

.blue-btn {
    background-color: #007bff !important;
    color: white !important;
}
</style>