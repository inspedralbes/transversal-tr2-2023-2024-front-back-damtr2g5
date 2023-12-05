<template>
    <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto h-auto pa-4" elevation="4" rounded
        max-width="300" width="100%">
        <div>
            <div class="text-h5 font-weight-medium mb-2">
                LOGIN
            </div>
            <form>
                <v-text-field v-model="email" label="Email"></v-text-field>

                <v-text-field v-model="password" :append-icon="show0 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show0 ? 'text' : 'password'" label="Contrasenya"
                            @click:append="show0 = !show0"></v-text-field>

                <v-btn @click="guardar()" block class="mt-2">Login</v-btn>
            </form>
            <p class="mt-3"> Aun no estas registrat? <a href="#" @click.stop.prevent="dialog = true,step=1"> Regist'rat </a></p>
            <v-dialog v-model="dialog" class="w-50">
                <v-card class="mx-auto" max-width="800" width="500">
                    <v-card-title class="text-h6 font-weight-regular justify-space-between">
                        <span>{{ currentTitle }}</span>
                        <v-avatar color="primary" size="24" v-text="step"></v-avatar>
                    </v-card-title>

                    <v-window v-model="step">
                        <v-window-item :value="1">
                            <v-card-text>
                                <v-text-field label="Email" placeholder="ejemplo@ejemplo.com" v-model="emailD"></v-text-field>
                                <v-row>
                                    <v-col cols="6">
                                        <v-text-field label="Nombre" v-model="username"></v-text-field></v-col>
                                    <v-col cols="6"><v-text-field label="Apellidos"
                                            v-model="surname"></v-text-field></v-col>
                                </v-row>
                                <span class="text-caption text-grey-darken-1">
                                    Este es el email que usaras para el login
                                </span>

                            </v-card-text>
                        </v-window-item>

                        <v-window-item :value="2">
                            <v-container>
                                <v-card-text>
                                    <v-row>
                                        <v-text-field :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'" label="Contrasenya"
                            @click:append="show1 = !show1"
                                            v-model="passwordD"></v-text-field></v-row>
                                    <v-row>
                                        <v-text-field :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show2 ? 'text' : 'password'" label="Contrasenya"
                            @click:append="show2 = !show2"
                                            v-model="passwordComprobacion"></v-text-field></v-row>
                                </v-card-text> </v-container>
                        </v-window-item>
                    </v-window>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-btn v-if="step > 1" variant="text" @click="step--">
                            Back
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn v-if="step < 2" color="primary" variant="flat" @click="step++">
                            Next
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
            passwordD: '',
            passwordComprobacion: '',
            surname: '',
            email: '',
            emailD: '',
            step: 1,
            show0:false,
            show1: false,
            show2: false,
        };
    },
    methods: {
        guardar() {
            console.log(this.username, this.password);
            this.appStore.setLoginInfo({ name: this.username, contrasena: this.password, surname: this.surname, email: this.email})

        }
    }, computed: {
        currentTitle() {
            switch (this.step) {
                case 1: return 'Sign-up'
                case 2: return 'Create a password'
                default: return 'Account created'
            }
        },
    },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
