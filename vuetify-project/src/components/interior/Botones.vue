<template>
  <v-item-group selected-class="bg-primary">
    <v-container>
      
      <v-row>
        <v-col v-for="n in opciones" :key="n" cols="4">
          <v-item v-slot="{ isSelected, selectedClass }">
            <v-card  :class="['d-flex align-center super-cool-button', selectedClass]" dark height="200" @click="onToggle(n)">
              <div class="text-h3 flex-grow-1 text-center"  >
                {{ isSelected ? 'Log In' : n }}
              </div>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
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
      'Entrenamiento',
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
      const isAuth = this.appStore.isLoggedIn;
      console.log(isAuth);
      if (!isAuth) {
        alert('Has de logearte para acceder');
        return;
      }
      console.log('Value of n:', route);
      switch(route) {
        case 'Entrenamiento':
          
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
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}

.super-cool-button:hover {
  background-color: #ff80ab;
}
</style>
