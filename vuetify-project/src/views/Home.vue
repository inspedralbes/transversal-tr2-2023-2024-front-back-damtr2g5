<template>
  <v-row>
    <v-col cols="12" sm="12" md="6" lg="6" style="align-self: center;">
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
