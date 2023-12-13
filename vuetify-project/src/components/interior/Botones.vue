<template>
  <v-container class="fill-height" style="margin: 1em;">
    <v-row>
      <v-col cols="8" v-for="n in opciones">
        <v-card class="super-cool-button cream-bg black-olive" dark height="200" @click="onToggle(n)">
          <div class="myfont bigger-font">
            {{ isSelected ? 'Log In' : n }}
          </div>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-btn variant="plain outlined" class="mt-10 myfont oxford-blue-bg bitter-sweet" v-if="codigo == ''" @click="dialog = true">Unirte a una clase</v-btn>
        <v-btn v-else class=" myfont oxford-blue-bg bitter-sweet" @click="dialog = true">{{ codigo }}</v-btn>
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
  methods: {

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
  width: 100%;
  padding: 20px;
  cursor: pointer;
  margin-bottom: 20px;
  display: inline-flex;
  min-width: 150px;
  justify-content: center;
  align-items: center;
}
</style>
