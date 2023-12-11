<template>
    <v-sheet
      class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4"
      height="auto"
      max-width="800"
      width="100%"
    >
    <v-data-iterator :items="categorias">
      <template v-slot:default="{ items }">
        <v-row>
          <v-col v-for="item in items" :key="item.raw.id" cols="12" sm="6" md="6">
            <v-card class="mb-3">
              <v-btn
                class="red-btn"
                @click="seleccionarCategoria(item)"
                text
                tile
              >
                <span class="text-h5">{{ item.raw.nombre }}</span>
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
    </v-sheet>
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
            categorias:[]
        };
    },

    methods: {
        seleccionarCategoria(item) {
            if (item) {
                this.categoriaSeleccionada = item;
                this.appStore.setTema(item)
                 this.$router.push({ name: 'Categoria', params: { categoria: item.raw.nombre } });
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