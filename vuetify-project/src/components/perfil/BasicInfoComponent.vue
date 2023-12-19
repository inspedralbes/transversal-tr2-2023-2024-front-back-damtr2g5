<template>
  <div class="two-column-container">
    <div class="column">
      <!-- Contenido de la primera columna -->
      <v-img :src="user.image" alt="John"></v-img>
    </div>
    <div class="column">
      <!-- Contenido de la segunda columna -->
      <p>{{ user.name }} {{ user.surname }}</p>
      <p>{{ user.rank }}</p>
      <p>{{ user.lvl }} </p>
      <p>{{ user.experience }} </p>
      <p>{{ clase }} </p>
      <p>{{ total }} </p>
      <p>{{ prof }} </p>
    </div>

    <div class="column">
      <!-- Contenido de la segunda columna -->
      <v-infinite-scroll height="300">
        <template v-for="(item, index) in historial" :key="item">
          <div :class="['px-2', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
            {{ item.historial }} el {{ item.hora }}
          </div>
        </template>
        <template v-slot:loading>
          No hi ha més dades
        </template>
      </v-infinite-scroll>
    </div>
  </div>
</template>

<style>
.two-column-container {
  display: grid;
  grid-template-columns: 1fr 4fr 2fr;
  /* Dos columnas de ancho igual */
  gap: 20px;
  /* Espacio entre las columnas */
}

.column {
  /* Estilos opcionales para las columnas */
  padding: 10px;
  border: 1px solid #ccc;
  background-color: aliceblue;
}
</style>

<script>
import { useAppStore } from '@/store/app';
import { historial,GetDatosPerfil,getAulaById } from '@/communicationsManager'
export default {
  data() {
    return {
      user: useAppStore().getLoginInfo,
      clase: '',
      total: '',
      prof: '',
      historial: []
    };
  }, async mounted() {
    try{
      const res = await getAulaById(this.user.id_classroom);
      const res2 = await GetDatosPerfil({ idA: res[0].id, idP: res[0].professor_id });
      this.clase = res[0].name;
      this.total = res2.totalUsers
      this.prof = res2.professors[0].name
    }catch(error){
      console.log(error);
    }
      this.historial = await historial()
  }, methods: {
    load({ done }) {
      setTimeout(() => {
        this.historial.push(...Array.from({ length: 10 }, (k, v) => v + this.historial.at(-1) + 1))

        done('ok')
      }, 3000)
    },
  },
};
</script>
