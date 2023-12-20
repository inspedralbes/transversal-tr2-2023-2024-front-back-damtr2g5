<template>
  <v-app class="no-background">
    <v-row>
      <v-col cols="12" sm="12" md="6" lg="6" style="align-self: center;">
        <Noticias style="text-align: center;" />
      </v-col>
      <v-col align-self="center" cols="12" sm="12" md="6" lg="6">
        <Botones />
      </v-col>

    </v-row>
  </v-app>
</template>
<script setup>
import BackButton from '@/components/fab/BackButton.vue';
import Noticias from '@/components/login/Noticias.vue';
import Botones from '@/components/interior/Botones.vue';
</script>
