<template>
    <v-container>
        <v-data-table-server v-model:items-per-page="itemsPerPage" :search="search" :headers="headers"
            :items-length="totalItems" :items="serverItems" :loading="loading" item-value="name"
            @update:options="loadItems">
            <template v-slot:header.private="{ header }">
                <v-icon :icon="`${mdiLock}`"></v-icon>
            </template>
            <template v-slot:item.private="{ item }">
                <v-icon :icon="`${item.private ? mdiLock : ''}`"></v-icon>
            </template>
            <template v-slot:tfoot>
                <tr>
                    <td></td>
                    <td>
                        <v-text-field v-model="name" hide-details placeholder="Buscar partida..." class="ma-2"
                            density="compact"></v-text-field>
                    </td>
                </tr>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn @click="isPrivate(item)">
                    Conectar
                </v-btn>
                <v-dialog v-model="dialog" max-width="400">
                    <v-alert v-model="wrongPassword" type="error" closable close-label="Close Alert" title="Contrasenya incorrecta">
                        </v-alert>
                    <v-card>
                        <v-card-title class="text-h5 bg-grey-lighten-3">
                            Contrasenya
                        </v-card-title>
                        <v-text-field v-model="codigo" label="Contrasenya" class="ma-4 mb-0"></v-text-field>
                        
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-btn variant="text" @click="dialog = false; wrongPassword = false">
                                Cancelar
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="deep-purple" variant="tonal" @click="joinRoom(item)">
                                Acceptar
                            </v-btn>
                        </v-card-actions>
                        
                    </v-card>
                </v-dialog>
                <v-dialog  max-width="400">

                </v-dialog>
            </template>

        </v-data-table-server>
    </v-container>
</template>

<script>
import { getRooms } from '@/communicationsManager.js';
import { socket } from '@/socket';
import { mdiLock } from '@mdi/js';
export default {
    name: 'RoomSeeker',
    data() {
        return {
            wrongPassword: false,
            dialog: false,
            mdiLock,
            itemsPerPage: 5,
            headers: [
                { title: 'Private', key: 'private', width: '3%' },
                {
                    title: 'Partida',
                    align: 'start',
                    sortable: false,
                    key: 'name',
                },

                { title: 'Mode', key: 'mode', align: 'end', sortable: false },
                { title: 'Jugadors', key: 'players', align: 'end' },
                { title: 'Propietari', key: 'owner', align: 'end' },
                { title: 'Actions', key: 'actions', sortable: false, align: 'center' },
            ],
            serverItems: [],
            loading: true,
            totalItems: 0,
            name: '',
            codigo: '',
            search: '',
        };
    },
    created() {
        this.initialize();
        socket.on('roomJoined', (room) => {
            console.log("roomJoined", room);
            this.wrongPassword = false;
            //TODO: Go to room
        });
        socket.on('roomNotJoined', (room) => {
            console.log("roomNotJoined", room);
        });
        socket.on('wrongPassword', (room) => {
            this.wrongPassword = true;
        });
    },
    watch: {
        name() {
            this.search = String(Date.now())
        },
    },
    methods: {
        joinRoom(room) {
            room.password = this.codigo;
            socket.emit('joinRoom', room);
        },
        isPrivate(room) {
            if (room.private) {
                this.dialog = true;
            } else {
                socket.emit('joinRoom', room);
                //this.$router.push({ name: 'Game', params: { room: item.name } });
            }
        },
        loadItems({ page, itemsPerPage, sortBy }) {
            this.loading = true;
            console.log(sortBy);
            getRooms(page, itemsPerPage, sortBy, this.name).then((response) => {
                console.log(response);
                this.serverItems = response.rooms;
                this.totalItems = response.totalRooms;
                this.loading = false;
            });
        },
        initialize() {
            this.serverItems = [
                {
                    public: true,
                    name: 'Partida 1',
                    mode: 'PvP',
                    players: 2,
                    owner: 'Oriol Zapatero',
                },
                {
                    public: false,
                    name: 'Partida 2',
                    mode: 'PvP',
                    players: 2,
                    owner: 'Oriol Zapatero',
                }
            ]
            this.loading = false;
            this.totalItems = this.serverItems.length;
        }
        // Your component's methods go here
    },
    computed: {
        // Your computed properties go here
    },
    mounted() {
        // Code to run when the component is mounted goes here
    },
    // Other component options (e.g., props, watch, etc.) go here
};
</script>

<style scoped>
/* Your component's styles go here */
</style>
