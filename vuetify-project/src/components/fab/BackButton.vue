<template>
    <v-btn @click="goBack()" class="mt-3 ml-3" icon style="position: absolute; z-index: 20">
    <v-icon>$arrowLeft</v-icon>
  </v-btn>
</template>

<script>
export default {
    name: 'BackButton',
    props: {
        to: {
            type: String,
            default: '/'
        }
    },
    methods: {
        goBack() {
            console.log("BackButton: ", this.to);
            this.$router.push(this.to)
        }
    }
}
</script>