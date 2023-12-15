<template>
  <div class="two-column-container">
    <div class="column">
      <!-- Contenido de la primera columna -->
        <v-img :src="user.image" alt="John"></v-img>
    </div>
    <div class="column">
      <!-- Contenido de la segunda columna -->
      <p>{{user.name}} {{ user.surname }}</p>
      <p>{{user.rank}}</p>
      <p>{{user.lvl}} </p>
      <p>{{user.experience}} </p>
      <p>{{user.class}} </p>
    </div>
  </div>
</template>

<style>
.two-column-container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  /* Dos columnas de ancho igual */
  gap: 20px;
  /* Espacio entre las columnas */
}

.column {
  /* Estilos opcionales para las columnas */
  padding: 10px;
  border: 1px solid #ccc;
}
</style>

<script>
import { useAppStore } from '@/store/app';
export default {
  data() {
    return {
      user: useAppStore().getLoginInfo,
    };
  },
};
</script>
