<template>
    <v-container class="centered">
        <v-row>
        <RoomCreator />
        <RoomSeeker />
    </v-row>
    </v-container>
</template>

<script>
import RoomSeeker from "@/components/rooms/RoomSeeker.vue";
import RoomCreator from "@/components/rooms/RoomCreator.vue";

export default {
    name: "BuscadorBatalla",
    components: {
        RoomSeeker,
        RoomCreator,
    },
    methods: {

    },
};
</script>

<style scoped>
/* Your component styles go here */
</style>
