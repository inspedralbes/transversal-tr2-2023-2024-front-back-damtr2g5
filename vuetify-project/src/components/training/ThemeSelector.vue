
<template>
  <v-row>
    <v-col v-for="item in categorias" :key="item.id" cols="12" sm="6" md="6">
        <button class="custom-btn" @click="seleccionarCategoria(item)" text tile>
          <span class="shadow"></span>
          <span class="edge"></span>
          <span class="front text">
            <span class="myfont big-font">{{ item.nombre }}</span>
          </span>
        </button>
    </v-col>
  </v-row>
</template>
  
    
<script>
import { useAppStore } from '../../store/app'
const store = useAppStore();
import { getCategorias } from '@/communicationsManager';


//import { socket, state } from './socket';
export default {
  setup() {
    const appStore = useAppStore()
    return {
      appStore
    };
  },
  name: 'ListaCategorias',
  data() {

    return {
      selectedButton: null,
      categoriaSeleccionada: null,
      categorias: []
    };
  },

  methods: {
    seleccionarCategoria(item) {
      if (item) {
        this.categoriaSeleccionada = item;
        this.$router.push({ name: 'Categoria', params: { categoria: item.nombre } });
      } else {
        console.error('Invalid item or item.id');
      }
    }
  },
  created() {

    getCategorias().then(response => {

      try {
        this.categorias = response;

        console.log("Categorias obtenidas: ", this.categorias);

        // Check for empty or undefined items
        const nonEmptyItems = this.categorias.filter(item => !!item);
        console.log("Number of non-empty items in categorias: ", nonEmptyItems.length);
        console.log("Content of non-empty items in categorias: ", nonEmptyItems);

        // Check for unique keys
        const uniqueKeys = new Set(this.categorias.map(item => item.id));
        console.log("Number of unique keys in categorias: ", uniqueKeys.size);
        console.log("Unique keys: ", uniqueKeys);
      } catch (error) {
        console.error("Error fetching categorias:", error);
      }
    })
  },
}

</script>