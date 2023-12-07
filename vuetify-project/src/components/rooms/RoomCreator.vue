<template>
  <v-expansion-panels>
    <v-alert v-model="alert" class="mb-3" density="compact" type="warning" title="Ja has creat una partida!"
          text="Sembla que ja has creat una partida, i només es pot crear una a la vegada. Prova de tancar totes les finestres o torna a entrar a l'anterior partida."></v-alert>
    <v-expansion-panel  title="Crear Partida" expand-icon="$plus" collapse-icon="$minus">
      <v-expansion-panel-text>
        <v-form @submit.prevent="createRoom">
          <v-text-field :rules="rules" label="Nom de la partida" v-model="name"></v-text-field>
          <v-checkbox label="Sala privada" v-model="privateRoom"></v-checkbox>
          <v-text-field v-if="privateRoom" :rules="rules" label="Contrasenya" v-model="password"></v-text-field>
          <v-select label="Tipus de partida" v-model="gameType" :items="gameTypes"></v-select>
          <v-btn type="submit">Crear Partida</v-btn>
        </v-form>
      </v-expansion-panel-text>
    </v-expansion-panel>

  </v-expansion-panels>
</template>

<script>
import { socket, state } from '@/socket.js';
import { useAppStore } from '@/store/app';
export default {
  name: 'RoomCreator',
  data() {
    return {
      store: useAppStore(),
      alert: false,
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

        socket.emit('createRoom', { name: this.name, private: this.privateRoom, mode: this.gameType, password: this.password });
      }
    },
  },
  created() {
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
