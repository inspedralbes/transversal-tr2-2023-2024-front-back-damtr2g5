<template>
    <v-app>
        <v-container>
            <v-row>
                
                <v-col>
                    <LoginForm />
                </v-col>
            </v-row>
            <pruebas />
        </v-container>
    </v-app>
</template>
  
<script setup>
import pruebas from '@/components/pruebas.vue';
import LoginForm from '@/components/login/LoginForm.vue'
</script>
  