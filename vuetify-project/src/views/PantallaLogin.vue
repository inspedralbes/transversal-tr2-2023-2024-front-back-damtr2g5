<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="9" class="mr-5">
                    <Noticias />
                </v-col>
                <v-col>
                    <LoginForm />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <Botones />
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>
  
<script setup>
import Noticias from '@/components/login/Noticias.vue'
import LoginForm from '@/components/login/LoginForm.vue'
import Botones from '@/components/interior/Botones.vue'
</script>
  