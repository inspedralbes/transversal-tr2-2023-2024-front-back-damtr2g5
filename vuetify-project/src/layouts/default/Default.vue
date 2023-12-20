<template>
  <div class="background-container blurred">
        <img src="@/assets/thailand-wallpaper.jpg" alt="Background Image" class="background-image">
    </div>
  <v-app>
    <default-bar />
    <default-view />
  </v-app>
</template>
<script setup>
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
  import {useAppStore} from '@/store/app'
  import {updateExperienciaUsuario} from '@/communicationsManager' 
  import { onMounted } from 'vue';

  const store = useAppStore()

  function calculateExp() {
    updateExperienciaUsuario().then(message => {
      console.log("Datos de experiencia: ",message)
message

    })
  } 
  onMounted(() => {
    calculateExp();
  });
  
</script>
