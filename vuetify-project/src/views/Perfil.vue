<template>
    <BackButton :to="'/home'" />
    <v-app class="no-background">
        <v-container class="fill-height" style="justify-content: center; text-align: center;">
            <v-row justify="center">
                <v-col cols="12" sm="12" md="8" lg="12">
                    <v-card class="round-border myfont">
                        <v-card-title class="bigger-font violet-bg white pt-6 pb-6">{{ user.name }} {{ user.surname
                        }}</v-card-title>
                        <v-card-subtitle class="big-font violet-bg white pt-6 pb-6">{{ user.email }}</v-card-subtitle>

                        <v-row>
                            <v-col class="platinum-bg mt-3 mb-3 ml-3 centered" cols="12" sm="12" md="12" lg="4">
                                <v-img :src="user.image" max-width="200" alt="John"></v-img>
                            </v-col>
                            <v-col cols="12" sm="12" md="12" lg="4">
                                <div style="margin-left: 1em; text-align: left;" class="mt-4 pb-4 big-font">
                                    <ul>
                                        <li>Nivell {{ user.lvl }} </li>
                                        <li>Aqui va la vida</li>
                                        <li>Aqui va la exp </li>
                                    </ul>
                                </div>
                            </v-col>
                            <v-col class="centered big-font platinum-bg mt-3">
                                {{ user.rank }}
                            </v-col>
                        </v-row>

                    </v-card>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="6">
                    <v-card style="height: 100%;" class="round-border myfont">
                        <v-card-title class="bigger-font violet-bg white pt-6 pb-6">Classe</v-card-title>
                        <div class="mt-4 pb-4 big-font big-font">
                            <ul>
                                <li>{{ clase }} </li>
                                <li>Alumnes: {{ total }} </li>
                                <li>Kru: {{ prof }} </li>
                            </ul>
                        </div>

                    </v-card>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="6">
                    <v-card class="round-border myfont">
                        <v-card-title class="bigger-font violet-bg white pt-6 pb-6">Historial</v-card-title>
                        <v-card-text>
                            <v-infinite-scroll height="300">
                                <template v-for="(item, index) in historial" :key="item">
                                    <div :class="['px-2', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
                                        {{ item.historial }} el {{ item.hora }}
                                    </div>
                                </template>
                                <template v-slot:loading>
                                    No hi ha més dades
                                </template>
                            </v-infinite-scroll>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<style>
ul {
    list-style-type: none;
}
</style>

<script>
import { useAppStore } from '@/store/app';
import { historial, GetDatosPerfil, getAulaById } from '@/communicationsManager'
import BackButton from '@/components/fab/BackButton.vue';
export default {
    name: 'Perfil',
    data() {
        return {
            user: useAppStore().getLoginInfo,
            clase: '',
            total: '',
            prof: '',
            historial: []
        };
    }, async mounted() {
        try {
            console.log(this.user.experience);
            const res = await getAulaById(this.user.id_classroom);
            const res2 = await GetDatosPerfil({ idA: res[0].id, idP: res[0].professor_id });
            this.clase = res[0].name;
            this.total = res2.totalUsers;
            this.prof = res2.professors[0].name;
        }
        catch (error) {
            console.log(error);
        }
        this.historial = await historial();
    }, methods: {
        load({ done }) {
            setTimeout(() => {
                this.historial.push(...Array.from({ length: 10 }, (k, v) => v + this.historial.at(-1) + 1));
                done('ok');
            }, 3000);
        },
    },
    components: { BackButton }
};
</script>

