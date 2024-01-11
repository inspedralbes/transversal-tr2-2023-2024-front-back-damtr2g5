<template>
    <BackButton :to="'/home'" />
    <v-app class="no-background">
        <v-row align="center">
            <v-col>
                <RoomCreator />
                <RoomSeeker />
            </v-col>
        </v-row>

    </v-app>
</template>

<script>
import RoomSeeker from "@/components/rooms/RoomSeeker.vue";
import RoomCreator from "@/components/rooms/RoomCreator.vue";
import BackButton from "@/components/fab/BackButton.vue";

export default {
    name: "BuscadorBatalla",
    components: {
        RoomSeeker,
        RoomCreator,
        BackButton
    },
    methods: {

    },
};
</script>

<style scoped>
/* Your component styles go here */
</style>
