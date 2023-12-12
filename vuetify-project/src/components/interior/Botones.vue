<template>
  <v-item-group selected-class="bg-primary">
    <v-container>
      <v-item v-for="n in opciones" :key="n">
        <v-card class="d-flex align-center super-cool-button bitter-sweet oxford-blue-bg" dark height="200" @click="onToggle(n)">
          <div class="myfont bigger-font text-center">
            {{ isSelected ? 'Log In' : n }}
          </div>
        </v-card>
      </v-item>
    </v-container>
  </v-item-group>
  <v-container>
    <v-row>
      <v-col cols="10">
      </v-col>
      <v-col cols="2" class="d-flex flex-row-reverse mb-6">
        <v-btn v-if="codigo == ''" color="primary" @click="dialog = true">Unirte a una clase</v-btn>
        <v-btn v-else color="primary" @click="dialog = true">{{ codigo }}</v-btn>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-title class="text-h5 bg-grey-lighten-3">
        Codigo de Clase
      </v-card-title>
      <v-text-field v-model="codigo" label="Codigo de clase" class="ma-4 mb-0"></v-text-field>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn variant="text" @click="dialog = false">
          Cancelar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="deep-purple" variant="tonal" @click="dialog = false">
          Aceptar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { useAppStore } from '../../store/app'
export default {
  name: 'Botones',
  setup() {
        const appStore = useAppStore()
        return {
            appStore
        };
    },
  data() {
    const opciones = [
      'Entrenament',
      'Batalla',
    ]
    return {
      dialog: false,
      cambio: true,
      codigo: '',
      opciones
    };
  },
  methods:{
    
    onToggle(route) {
      var isAuth = this.appStore.isAuthenticated
      if (!isAuth) {
        alert('Has de logearte para acceder');
        return;
      }
      switch(route) {
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
</style>
