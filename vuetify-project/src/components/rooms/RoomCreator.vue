<template>
  <v-container>
    <v-expansion-panels class="myfont">
      <v-alert v-model="alert" class="mb-3" density="compact" type="warning" title="Ja has creat una partida!"
        text="Sembla que ja has creat una partida, i només es pot crear una a la vegada. Prova de tancar totes les finestres o torna a entrar a l'anterior partida."></v-alert>
      <v-expansion-panel class="round-border violet-bg" expand-icon="$plus" collapse-icon="$minus">
        <v-expansion-panel-title class="big-font white">
          Crear Partida
        </v-expansion-panel-title>
        <v-expansion-panel-text class="platinum-bg"
          style="border-bottom-left-radius: 40px !important; border-bottom-right-radius: 40px !important;">
          <v-form class="mt-6" @submit.prevent="createRoom">
            <v-text-field variant="outlined" bg-color="white" density="compact" rounded :rules="rules"
              label="Nom de la partida" v-model="name"></v-text-field>
            <v-row>
              <v-col cols="6" sm="6" md="3" lg="3">
                <v-checkbox label="Sala privada" v-model="privateRoom"></v-checkbox>
              </v-col>
              <v-col cols="6" sm="6" md="3" lg="3">
                <v-select variant="solo-filled" bg-color="white" label="Tipus de partida" v-model="gameType"
                  :items="gameTypes"></v-select>
              </v-col>
              <v-col cols="6" sm="6" md="3" lg="3">

                <v-chip-group v-model="selectedCategorias" filter multiple>
                  <v-chip v-for="categoria in categorias" enabled>{{ categoria.nombre }}</v-chip>
                </v-chip-group>
              </v-col>
            </v-row>
            <v-text-field v-if="privateRoom" :rules="rules" variant="outlined" bg-color="white" density="compact" rounded
              label="Contrasenya" v-model="password"></v-text-field>
            <v-btn class=" myfont oxford-blue-bg bitter-sweet mb-2" type="submit">Crear Partida</v-btn>
          </v-form>
        </v-expansion-panel-text>
      </v-expansion-panel>

    </v-expansion-panels>
  </v-container>
</template>

<script>
import { getCategorias } from '@/communicationsManager';
import { socket, state } from '@/socket.js';
import { useAppStore } from '@/store/app';
export default {
  name: 'RoomCreator',
  data() {
    return {
      store: useAppStore(),
      alert: false,
      categorias: [],
      selectedCategorias: [],
      gameTypes: ['PvP', 'PvE'],
      gameType: 'PvP',
      privateRoom: false,
      name: '',
      password: '',
      rules: [
        value => {
          if (value) return true

          return 'Requerit.'
        },
      ],
    };
  },
  methods: {
    createRoom() {
      this.alert = false;
      if ((this.privateRoom && this.password !== '' && this.name !== '') || (!this.privateRoom && this.name !== '')) {
        socket.connect();
        socket.emit('createRoom', { name: this.name, private: this.privateRoom, mode: this.gameType, password: this.password, categorias: this.selectedCategorias });
      }
    },
  },
  created() {
    getCategorias().then(response => {
      try {
        this.categorias = response;

        
        //Sort by id
        this.categorias.sort((a, b) => (a.id > b.id) ? 1 : -1);
        console.log("Categorias obtenidas: ", this.categorias);
        for (let i = 0; i < this.categorias.length; i++) {
          this.selectedCategorias.push(i);
        }

      } catch (error) {
        console.error("Error fetching categorias:", error);
      }
    })
    socket.on('roomCreated', (room) => {
      console.log("roomCreated", room);
      this.store.setRoom(room);
      this.$router.push({ name: 'Room' });
    });

    socket.on('roomNotCreated', (room) => {
      console.log("roomNotCreated", room);
      this.alert = true;
    });
  },
};
</script>

<style scoped>
/* Add your component styles here */
</style>
