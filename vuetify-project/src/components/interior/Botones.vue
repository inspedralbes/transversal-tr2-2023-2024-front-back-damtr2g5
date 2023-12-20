<template>
  <v-container>
    <v-row>
      <v-col cols="12" v-for="n in opciones">
        <button class="custom-btn" @click="onToggle(n)">
          <span class="shadow"></span>
          <span class="edge"></span>
          <span class="front text">
            <div class="myfont biggest-font">
            {{ isSelected ? 'Log In' : n }}
          </div>
          </span>
        </button>
      </v-col>
      <v-col style="text-align: end;" cols="12">
        <v-btn variant="plain outlined" class="mt-10 myfont oxford-blue-bg bitter-sweet" v-if="codigoNuevo == ''"
          @click="dialog = true">Unir-te a una aula</v-btn>
        <v-btn v-else class=" myfont oxford-blue-bg bitter-sweet" @click="dialog = true">{{ codigoNuevo }}</v-btn>
      </v-col>
    </v-row>
    </v-container>
  <v-dialog class="myfont" v-model="dialog" max-width="400">
    <v-card>
      <v-card-title class="big-font bg-grey-lighten-3">
        Codi d'aula
      </v-card-title>
      <v-text-field variant="outlined" v-model="this.codigo" label="Codi d'aula" class="ma-4 mb-0"></v-text-field>
      <div class="error-container ma-4 mb-0" v-if="error.error">
        <v-icon color="red darken-4" start>$alert</v-icon>
        <div class="error-message red--text">{{ error.message }}</div>
      </div>
      <v-divider></v-divider>
      
      <v-card-actions>
        <v-btn class="platinum-bg oxford-blue" variant="text" @click="dialog = false">
          Cancelar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn class="oxford-blue-bg bitter-sweet" variant="tonal" @click="toggleClassroom(this.codigo)">
          Aceptar
        </v-btn>
      </v-card-actions>
      
    </v-card>
  </v-dialog>
</template>
<script>
import { useAppStore } from '../../store/app'
import { getAula, getAulaById, joinAula } from '@/communicationsManager';
export default {
  name: 'Botones',
  setup() {
        const appStore = useAppStore()
        return {
            appStore
        };
        
    },
    created() {
      console.log("LoginInfo: ",this.appStore.getLoginInfo)
      if(this.appStore.getLoginInfo.id_classroom!=null) {
        getAulaById(this.appStore.getLoginInfo.id_classroom).then((res) => {
          if (res!=null) {
            this.appStore.setAulaInfo(res)
            this.codigoNuevo = res[0].name
          } else {
            console.log("No hay aulas asignadas!", this.appStore.getAulaInfo)
          }
        })
      }
      else {
        
        console.log("No hay aulas asignadas!", this.appStore.getAulaInfo)
      }
    },
  data() {
    const opciones = [
      'Entrenament',
      'Batalla',
    ]
    return {
      dialog: false,
      cambio: true,
      codigoNuevo: '',
      codigo: '',
      opciones,
      error: {
        error:false,
        message:""
      }
    };
  },
  methods:{
    toggleClassroom(room) {
      this.error = {error: false, message:''}
      if (!room) {
        this.error = {error: true,message: "Codi buit"}
      } else {
        getAula(room).then((res) => {
          if (res!=null) {
            this.appStore.setAulaInfo(res)
            joinAula(res[0]).then
            this.codigoNuevo = res[0].name
            this.dialog = false
            
          } else {
            this.error = {error: true,message: "Aquesta aula no existeix"}
          }

        })
      }
    },
    onToggle(route) {
      switch (route) {
        case 'Entrenament':
          this.$router.push({ name: 'Entrenamiento' })
          break;
        case 'Batalla':
          this.$router.push({ name: 'Batalla' })
          break;
      }
    }
  }
}
</script>
<style>
.super-cool-button {
  background-color: #ff4081;
  color: white;
  border: none;
  padding: 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px; 
  display: inline-flex; 
  min-width: 150px; 
  box-sizing: border-box; 
  justify-content: center; 
  align-items: center; 
}

.super-cool-button:hover {
  background-color: #ff80ab;
}
.error-container {
  display: flex;
  align-items: center;
}

.error-message {
  font-size: 14px;
}

.red--text {
  color: red;
}
</style>
