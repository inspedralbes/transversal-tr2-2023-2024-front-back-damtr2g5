<template>
    <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto h-auto pa-4" elevation="4" rounded
        max-width="300" width="100%">
        <div>
            <div class="text-h5 font-weight-medium mb-2">
                LOGIN
            </div>
            <form>
                <v-text-field v-model="username" label="First name"></v-text-field>

                <v-text-field v-model="password" label="Password"></v-text-field>

                <v-btn @click="guardar()" block class="mt-2">Login</v-btn>
            </form>
            <p class="mt-3"> Aun no estas registrado? <a href="#" @click.stop.prevent="dialog = true"> Registrarse </a></p>
            <v-dialog v-model="dialog" max-width="400" persistent>
                <v-card>
                    <v-card-title class="text-h5 bg-grey-lighten-3">
                        Registrarse
                    </v-card-title>
                    <v-text-field v-model="username" label="Nombre" class="ma-4 mb-0"></v-text-field>
                    <v-text-field v-model="surname" label="Apellidos" class="ma-4 mt-0 mb-0"></v-text-field>
                    <v-text-field v-model="password" label="Contraseña" class="ma-4 mt-0 mb-0"></v-text-field>
                    <v-text-field v-model="email" label="Email" class="ma-4 mb-0 mt-0"></v-text-field>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn variant="text" @click="dialog = false">
                            Cancelar
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="deep-purple" variant="tonal" @click="dialog = false,guardar()">
                            Aceptar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </v-sheet>
</template>
  

<script>
import { useAppStore } from '../../store/app'
export default {
    setup() {
        const appStore = useAppStore()
        return {
            appStore
        };
    },
    data() {
        return {
            dialog: false,
            username: '',
            password: '',
            surname: '',
            email: '',
        };
    },
    methods: {
        guardar() {
            console.log(this.username, this.password);
            this.appStore.setLoginInfo({ name: this.username, contrasena: this.password, surname: this.surname, email: this.email, rank: '', lifetotal: '', experience: '', image: '' })
            
        }
    }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
