<template>
    <v-sheet
      class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4"
      height="auto"
      max-width="800"
      width="100%"
    >
      <v-data-iterator :items="ejercicios">
        <template v-slot:default="{ items }">
          <v-row>
            <v-col v-for="item in items" :key="item.raw.id" cols="12" sm="6" md="4">
              <v-card class="mb-3" >
                <v-btn
                  class="d-flex align-center red-btn"
                  @click="seleccionarCategoria(item.raw.nombre)"
                >
                  <h4 class="m-0">{{ item.raw.nombre }}</h4>
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </v-sheet>
  </template>
  
    
<script>
import { useAppStore } from '../store/app'
const store = useAppStore();
import { getEjerciciosByCat } from '@/communicationsManager';


//import { socket, state } from './socket';
export default {
    name: 'Categoria',
    data() {

        return {
            categoria:null,
            selectedButton: null,
            ejercicioSeleccionada: null,
            ejercicios:[]
        };
    },

    methods: {
        seleccionarEjercicio(id) {
            if (id) {
                console.log(item);
                this.categoriaSeleccionada = item;
                 this.$router.push({ name: 'Ejercicio', params: { id: id } });
             } else {
                console.error('Invalid id');
            }
        }
    },
    created() {
        this.categoria = this.$route.params.categoria;
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