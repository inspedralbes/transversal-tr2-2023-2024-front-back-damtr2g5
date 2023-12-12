<template>
    <div class="background-container">
        <img src="@/assets/ringUFC4.jpg" alt="Background Image" class="background-image">
    </div>
    <v-app>
        <v-row style="margin: auto;">
            <v-col cols="12" xs="12" md="6" lg="6" sm="12" style="text-align: center;" align-self="center">
                <img style="width: 100%; max-width: 1024px; height: auto;" src="@/assets/math_thai.png" alt="Logo"
                    class="logo">
            </v-col>
            <v-col cols="12" md="6" lg="6" sm="12">
                <v-container class="fill-height">

                    <LoginForm />
                </v-container>
            </v-col>
        </v-row>
    </v-app>
</template>

<style>
.background-container {
    position: fixed;
    top: -1em;
    left: -1em;
    width: 103vw;
    height: 103vh;
    overflow: hidden;
    filter: blur(10px);
}

.background-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
  
<script setup>

import LoginForm from '@/components/login/LoginForm.vue'
</script>
