<template>
    <v-container class="myfont">
        <v-data-table-server id="partidas" class="round-border pa-4 platinum-bg" 
        style="padding-left: 0px !important; padding-right: 0px !important;" 
        v-model:items-per-page="itemsPerPage" :search="search" :headers="headers"
            :items-length="totalItems" :items="serverItems" :loading="loading" item-value="name" 
            :items-per-page-text="'Partides per pàgina'"
            @update:options="loadItems" >
            <template v-slot:header.private="{ header }">
                <v-icon size="35" :icon="`${mdiLock}`"></v-icon>
            </template>
            <template v-slot:item.private="{ item }">
                <v-icon :icon="`${item.private ? mdiLock : ''}`"></v-icon>
            </template>
            <template v-slot:tfoot>
                <tr>
                    <td></td>
                    <td>
                        <v-text-field style="border-radius: 20px;" variant="outlined" rounded v-model="name" hide-details placeholder="Buscar partida..." class="ma-2 mt-10 white-bg"
                            density="compact"></v-text-field>
                    </td>
                </tr>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn  class=" myfont oxford-blue-bg bitter-sweet" @click="isPrivate(item)">
                    Connectar
                </v-btn>
                <v-dialog class="myfont" v-model="dialog" max-width="400">
                    <v-alert v-model="wrongPassword" type="error" closable close-label="Close Alert" title="Contrasenya incorrecta">
                        </v-alert>
                    <v-card>
                        <v-card-title class="big-font bg-grey-lighten-3">
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
<style>
.v-data-table__thead{
    font-size: 2em;
}
#partidas tbody tr:nth-child(even){background-color: #CDD7D6;}
#partidas tbody tr:nth-child(odd){background-color: white;}

#partidas tbody tr:hover {background-color: #F87060;}
</style>
<script>
import { getRooms } from '@/communicationsManager.js';
import { useAppStore } from '@/store/app';
import { socket } from '@/socket';
import { mdiLock } from '@mdi/js';
export default {
    name: 'RoomSeeker',
    data() {
        return {
            store: useAppStore(),
            wrongPassword: false,
            dialog: false,
            mdiLock,
            itemsPerPage: 5,
            headers: [
                { title: 'Private', key: 'private', width: '3%', align: 'center' },
                {
                    title: 'Partida',
                    align: 'start',
                    sortable: false,
                    key: 'name',
                },

                { title: 'Mode', key: 'mode', align: 'end', sortable: false },
                { title: 'Jugadors', key: 'players', align: 'end' },
                { title: 'Propietari', key: 'owner', align: 'end' },
                { title: 'Accions', key: 'actions', sortable: false, align: 'center' },
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
            this.store.setRoom(room);
            this.$router.push({ name: 'Room', params: { room: room.name } });
            this.wrongPassword = false;
            //TODO: Go to room
        });
        socket.on('alreadyJoined', (room) => {
            console.log("alreadyJoined", room);
            this.store.setRoom(room);
            this.$router.push({ name: 'Room', params: { room: room.name } });
            this.wrongPassword = false;
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
        conectar(room){
            socket.connect();
            socket.emit('joinRoom', room);
        },
        joinRoom(room) {
            room.password = this.codigo;
            this.conectar(room);
        },
        isPrivate(room) {
            if (room.private) {
                this.dialog = true;
            } else {
                this.conectar(room);
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
