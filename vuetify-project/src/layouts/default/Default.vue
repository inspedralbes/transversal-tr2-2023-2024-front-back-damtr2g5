<template>
  <div class="background-container blurred">
        <img src="@/assets/ringUFC.jpg" alt="Background Image" class="background-image">
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
