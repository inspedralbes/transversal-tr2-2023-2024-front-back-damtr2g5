<template>
    <v-container>
        <v-btn elevation="6" border="lg opacity-12" rounded="lg" class="red-btn"
            :style="{ marginBottom: '20px', width: '40vw', marginLeft: 'auto', marginRight: 'auto', display: 'block' }">{{
                this.Ejercicio.nombre }}</v-btn>
        <v-sheet color="#f68b1f" elevation="6" border="lg opacity-12" max-width="2000" max-height="500" rounded="xl"
            width="1200" height="500" class="pa-4 text-center mx-auto">
            <v-card-title>Numero de preguntes: {{ this.cantidadEjerciciosH.length }}</v-card-title>
            <v-card-title>Tematica: {{ this.tema }}</v-card-title>
            <v-card-title>Realitzat: {{ estado }}</v-card-title>
            <v-card-title>Preguntes contestades: {{ this.cantidadEjercicios.length }} / {{ this.cantidadEjerciciosH.length }}</v-card-title>            
            <v-card-title>EXP: {{ this.exp }} xp</v-card-title>
        </v-sheet>
        <v-btn @click="empezarEjercicio" elevation="6" border="lg opacity-12" rounded="lg" class="blue-btn"
            :style="{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', display: 'block' }">Començar</v-btn>
    </v-container>
</template>
  
    
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