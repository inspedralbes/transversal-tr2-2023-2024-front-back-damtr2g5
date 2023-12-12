<template>
  <div class="background-container">
        <img src="@/assets/mural_mates2.png" alt="Background Image" class="background-image">
    </div>
  <v-app>
    <default-bar />

    <default-view />
  </v-app>
</template>
<script setup>
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
</script>
