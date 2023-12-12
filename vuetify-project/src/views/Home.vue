<template>
  
  <v-row>
    <v-col cols="5">
      <Noticias class="myfont" />
    </v-col >
    <v-col cols="5">
      <Botones />
    </v-col>
  </v-row>
</template>
<script setup>
  import Noticias from '@/components/login/Noticias.vue'
  import Botones from '@/components/interior/Botones.vue';
</script>
