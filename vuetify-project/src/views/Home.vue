<template>
  <v-row>
    <v-col cols="6">
      <Noticias style="text-align: center;"/>
    </v-col>
    <v-col cols="6">
      <Botones/>
    </v-col>
    
  </v-row>
</template>
<script setup>
  import Noticias from '@/components/login/Noticias.vue'
  import Botones from '@/components/interior/Botones.vue';
</script>
