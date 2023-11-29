<template>
    <v-sheet class="d-flex align-center justify-center flex-wrap text-center mx-auto h-auto pa-4" elevation="4" rounded max-width="300" width="100%">
        <div>
            <div class="text-h5 font-weight-medium mb-2">
                LOGIN
            </div>
            <form>
                <v-text-field v-model="username" label="First name"></v-text-field>

                <v-text-field v-model="password" label="Password" ></v-text-field>

                <v-btn @click="guardar()" block class="mt-2">Login</v-btn>
            </form>
           <p class="mt-3"> Aun no estas registrado? <v-btn @click="" variant="plain">Registrate</v-btn></p>
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
            username: '',
            password: ''
        };
    },
    methods: {
        guardar(){
            console.log(this.username, this.password);
            this.appStore.setLoginInfo({name: this.username, contrasena: this.password,surname:'', email:'', rank:'', lifetotal:'', experience:'', image:''})
        }
    }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
