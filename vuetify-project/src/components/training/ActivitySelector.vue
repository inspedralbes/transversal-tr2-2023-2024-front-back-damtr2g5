<template>
    <v-card>
      <v-data-iterator
        :items="ejercicios"
        :items-per-page="9"
        :search="search"
      >
        <template v-slot:header>
          <v-toolbar class="px-2">
            <v-text-field
              v-model="search"
              clearable
              density="comfortable"
              hide-details
              placeholder="Search"
              prepend-inner-icon="$magnify"
              style="max-width: 300px;"
              variant="solo"
            ></v-text-field>
          </v-toolbar>
        </template>
  
        <template v-slot:default="{ items }">
          <v-container class="pa-2" fluid>
            <v-row dense>
              <v-col
                v-for="item in items"
                :key="item.nombre"
                cols="auto"
                md="4"
              >
                <v-card class="pb-3" flat>
                  <v-img :src="item.raw.img"></v-img>
  
                  <v-list-item class="mb-2" :subtitle="item.raw.tipo">
                    <template v-slot:title>
                      <strong class="text-h6 mb-2">{{ item.raw.nombre }}</strong>
                    </template>
                  </v-list-item>
  
                  <div class="d-flex justify-space-between px-4">
                    <div class="d-flex align-center text-caption text-medium-emphasis me-1">
                      <v-icon icon="$alertOctogram" start></v-icon>
  
                      <div class="text-truncate">Número de preguntas: {{ item.raw.preguntas.length }}</div>
                    </div>
  
                    <v-btn
                      border
                      flat
                      size="small"
                      class="text-none"
                      text="Comenzar"
                      @click="seleccionarEjercicio(item.raw)"
                    >
                    </v-btn>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </template>
  
        <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
          <div class="d-flex align-center justify-center pa-4">
            <v-btn
              :disabled="page === 1"
              icon="$arrowLeft"
              density="comfortable"
              variant="tonal"
              rounded
              @click="prevPage"
            ></v-btn>
  
            <div class="mx-2 text-caption">
              Página {{ page }} de {{ pageCount }}
            </div>
  
            <v-btn
              :disabled="page >= pageCount"
              icon="$arrowRight"
              density="comfortable"
              variant="tonal"
              rounded
              @click="nextPage"
            ></v-btn>
          </div>
        </template>
      </v-data-iterator>
    </v-card>
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
            categoria:null,
            selectedButton: null,
            ejercicioSeleccionado: null,
            ejercicios:[]
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
          console.log("Categoria de Actividades: ",this.categoria)
          getEjerciciosByCat(this.categoria).then(response => {
              this.ejercicios = response;
              console.log(response) 
          })
      },
  }
  
  </script>
  
  <style>
  .red-btn {
    background-color: #ff0000 !important;
    color: white !important;
    width: 100%;
  }
  
  .red-btn:hover {
    background-color: #b30000 !important;
  }
  
  .v-card {
    border: none !important;
  }
  
  .v-btn {
    border-radius: 8px;
  }
  
  .v-btn:hover {
    transform: translateY(-2px);
    transition: transform 0.3s ease;
  }
  </style>