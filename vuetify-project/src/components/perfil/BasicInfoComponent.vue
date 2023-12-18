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
      <v-infinite-scroll height="300"  >
        <template v-for="(item, index) in historial" :key="item">
          <div :class="['px-2', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
            {{ item }}
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
import { getAulaById, GetDatosPerfil, getBatallas, GetResueltas, getEjercicios } from '@/communicationsManager'
export default {
  data() {
    return {
      user: useAppStore().getLoginInfo,
      clase: '',
      total: '',
      prof: '',
      batalla: '',
      ejercicio: '',
      mensajeB: '',
      mensajeE: '',
      historial: []
    };
  }, async mounted() {
    try {
      const res = await getAulaById(this.user.id_classroom);
      const res2 = await GetDatosPerfil({ idA: res[0].id, idP: res[0].professor_id });
      const res3 = await getBatallas();
      const res4 = await GetResueltas({ ejercicioid: null });
      this.clase = res[0].name;
      this.total = res2.totalUsers
      this.prof = res2.professors[0].name
      this.batalla = res3
      this.ejercicio = res4

      Promise.all(res4.map(async (ejercicio) => {
        const res = await getEjercicios(ejercicio.idEjercicio);
        let resultadoEjercicio = '';
        if (res.correcta) {
          resultadoEjercicio = 'bé';
        } else {
          resultadoEjercicio = 'malament';
        }
        this.historial.push("Has resolt " + resultadoEjercicio + " l'activitat " + ejercicio.idPregunta + " de l'exercici " + res.nombre + " el " + ejercicio.time);
      }))
        .then(() => {
          // Ordenar el historial por fecha en orden descendente
          this.historial.sort((a, b) => {
            const tiempoA = new Date(a.match(/\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}/)[0]);
            const tiempoB = new Date(b.match(/\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}/)[0]);
            return tiempoB - tiempoA;
          });
        })
      this.batalla.forEach(element => {
        let resultadoBatalla = ''
        if (element.ganador === 1) {
          // Verificar si el email está en el equipo1
          const equipo1 = element.equipo1.find(member => member.email === this.user.email);
          resultadoBatalla = equipo1 ? "guanyat" : "perdut";
        } else if (element.ganador === 2) {
          // Verificar si el email está en el equipo2
          const equipo2 = element.equipo2.find(member => member.email === this.user.email);
          resultadoBatalla = equipo2 ? "guanyat" : "perdut";
        }
        this.historial.push("Has " + resultadoBatalla + " la batalla " + element.battle + " el " + element.time)
      });

    } catch (error) {
      console.error(error);
      // Manejar errores si la promesa es rechazada
    }
  },methods: {
      load ({ done }) {
        setTimeout(() => {
          this.historial.push(...Array.from({ length: 10 }, (k, v) => v + this.historial.at(-1) + 1))

          done('ok')
        }, 3000)
      },
    },
};
</script>
