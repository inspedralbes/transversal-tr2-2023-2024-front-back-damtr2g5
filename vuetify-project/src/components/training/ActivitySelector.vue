<template>
    <v-data-iterator class="myfont" :items="ejercicios" :items-per-page="6" :search="search">
      <template v-slot:header>
        <v-toolbar style="background: transparent;" class="px-2">
          <v-text-field v-model="search" clearable density="comfortable" hide-details placeholder="Search"
            prepend-inner-icon="$magnify" variant="solo" style="max-width: 300px;" ></v-text-field>
        </v-toolbar>
      </template>

      <template v-slot:default="{ items }">
        <v-container class="pa-2" fluid>
          <v-row dense>
            <v-col v-for="item in items" :key="item.nombre" cols="12" md="6" lg="6" xl="4">
              <v-card class="pb-3 platinum-bg" style="border-radius: 20px;" flat>
                <v-img :src="item.raw.img"></v-img>

                <v-list-item style="background-color: #69306D; color: white;" class="mb-4" :subtitle="item.raw.tipo">
                  <template v-slot:title>
                    <div class="big-font mb-2 mt-2">{{ item.raw.nombre }}</div>
                  </template>
                </v-list-item>

                <div class="d-flex justify-space-between px-4">
                  <div class="d-flex align-center text-caption text-medium-emphasis me-1">
                    <v-icon icon="$alertOctogram" start></v-icon>

                    <div class="myfont">Número de preguntes: {{ item.raw.preguntas.length }}</div>

                  </div>
                  <button class="custom-btn" style="width: 50%;" @click="seleccionarEjercicio(item.raw)" text tile>
                    <span class="shadow"></span>
                    <span class="edge"></span>
                    <span class="front text">
                      Començar 
                    </span>
                  </button>

                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </template>

      <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
        <div v-if="pageCount>1" class="d-flex  justify-center pa-4">
          <div class="d-flex align-center white-bg" style="border-radius: 18px;" >
          <v-btn :disabled="page === 1" variant="plain" icon="$arrowLeft" density="comfortable" elevation="0"
            @click="prevPage"></v-btn>

          <div class="mx-2 text-caption">
            Página {{ page }} de {{ pageCount }}
          </div>

          <v-btn :disabled="page >= pageCount" variant="plain" icon="$arrowRight" density="comfortable" elevation="0"
            @click="nextPage"></v-btn>
          </div>
        </div>
      </template>
    </v-data-iterator>
</template>

    
      
<script>

import { useAppStore } from '../../store/app'
import { getEjerciciosByCat } from '@/communicationsManager';


//import { socket, state } from './socket';
export default {
  name: 'Categoria',
  setup() {
    const appStore = useAppStore()
    return {
      appStore
    };
  },
  data() {

    return {
      search: '',
      categoria: null,
      selectedButton: null,
      ejercicioSeleccionado: null,
      ejercicios: []
    };
  },

  methods: {
    seleccionarEjercicio(ejercicio) {
      if (ejercicio) {
        this.$router.push({ name: 'InfoEjercicio', params: { id: ejercicio.id } });
      } else {
        console.error('Invalid id');
      }
    }
  },
  created() {
    this.categoria = decodeURIComponent(this.$route.params.categoria).toString()
    console.log("Categoria de Actividades: ", this.categoria)
    getEjerciciosByCat(this.categoria).then(response => {
      this.ejercicios = response;
      console.log(response)
    })
  },
}

</script>