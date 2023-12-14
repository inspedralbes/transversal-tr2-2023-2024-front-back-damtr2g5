<template>
    <v-container style="display: flex;justify-content: center;  text-align: center; align-items: center;">
        <v-card style="position: ;">
        <v-btn>{{this.Ejercicio.nombre }}</v-btn>
            <v-card-title>Numero de preguntes: {{ this.cantidadEjerciciosH.length }}</v-card-title>
            <v-card-title>Tematica: {{ this.tema }}</v-card-title>
            <v-card-title>Realitzat: {{ estado }}</v-card-title>
            <v-card-title>Preguntes contestades: {{ this.cantidadEjercicios.length }} / {{ this.cantidadEjerciciosH.length }}</v-card-title>            
            <v-card-title>EXP: {{ this.exp }} xp</v-card-title>
        <v-btn @click="empezarEjercicio">Començar</v-btn>
    </v-card>
    </v-container>

</template>
<style>

</style>
    
<script>
import { GetResueltas, getEjercicios, getExpEjer } from '@/communicationsManager';
import { useAppStore } from '@/store/app';
//import { socket, state } from './socket';
export default {
    name: 'InfoEjercicio',
    setup() {
          const appStore = useAppStore()
          return {
              appStore
          };
      },
    data() {
        return {
            estado:"No",
            ejercicioId: null,
            cantidadEjerciciosH: 0,
            cantidadEjercicios:0,
            tema: "Básico",
            exp:0,
            Ejercicio: {}
        };
    },

    methods: {
        empezarEjercicio() {
            
            this.$router.push({ name: 'Ejercicio', params: { id: this.Ejercicio.id }});
        }

    },

    created() {
        
        // Para guardar el parámetro 'id' de la ruta en 'ejercicioId'
        
        getEjercicios(this.$route.params.id).then((res)=> {
            this.Ejercicio = res
            console.log(this.Ejercicio.preguntas)
            this.appStore.setEjercicio(this.Ejercicio)
            let userid = this.appStore.getLoginInfo
            
            this.cantidadEjerciciosH = res.preguntas;
            
            res.preguntas.forEach(element => {
                
                //Se calcula la máxima experiencia que se puede conseguir en el ejercicio
                this.exp = this.exp + element.experiencia;
            })
            let dato = {
                "userId": parseInt(userid.id),
                "ejercicioid": res.id,
            }
            console.log(dato);
            GetResueltas(dato).then((res) => {
                this.cantidadEjercicios = res.filter(element => element.correcta == true);
                if (res.length > 0) {
                console.log("Preguntas respondidas: ",res)
                this.estado = "Si"
            }
            });
            //Calcular experiencia de intentos anteriores (se mostrará la experiencia restante por conseguir)
            getExpEjer(dato).then((res) => {
                this.exp = this.exp - res.xp
            })

            
        })
        
       
    },


}

</script>