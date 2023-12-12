<template>
    <v-app class="maya-blue-bg">
        <v-row style="width: fit-content; margin: auto; ">
            <v-col cols="5" style="text-align: center;" align-self="center">
                <img style="width: 100%; max-width: 1024px; height: auto;" src="@/assets/math_thai.png" alt="Logo"
                    class="logo">
            </v-col>
            <v-col cols="7">
                <v-container class="fill-height">

                    <LoginForm />
                </v-container>
            </v-col>
        </v-row>
    </v-app>
</template>

<style></style>
  
<script setup>

import LoginForm from '@/components/login/LoginForm.vue'
</script>
  