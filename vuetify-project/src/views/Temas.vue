<template>
    <BackButton :to="'/'"/>
    <v-app class="no-background" >
        <v-container class="fill-height" >
            <v-row >
                <v-col>
                    <ThemeSelector />
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script setup>
import BackButton from '@/components/fab/BackButton.vue';
import ThemeSelector from '@/components/training/ThemeSelector.vue'
</script>