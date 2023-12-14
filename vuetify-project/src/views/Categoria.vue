<template>
  <v-app class="no-background">
      <v-container>
          <v-row justify="center">
              <v-col cols="12" sm="8" md="12" lg="10" xl="12">
                  <ActivitySelector />
              </v-col>
          </v-row>
      </v-container>
  </v-app>
</template>

<script setup>
import ActivitySelector from '@/components/training/ActivitySelector.vue'
</script>