<template>
    
    <v-dialog v-model="loginIncorrectDialog" width="auto">
        <v-card>
            <v-card-title>Login incorrecto</v-card-title>
            <v-card-text>El nombre de usuario o la contraseña son incorrectos.</v-card-text>
            <v-card-actions>
                <v-btn color="primary" text @click="loginIncorrectDialog = false">Cerrar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>    
    <v-sheet class="round-border myfont bitter-sweet d-flex align-center justify-center flex-wrap text-center mx-auto h-auto pa-9" elevation="4" >
        <div>
            <div class="big-font mb-2">
                Et donem la benvinguda
            </div>
            <form>
                <v-text-field variant="underlined" v-model="email" label="Email"></v-text-field>

                <v-text-field variant="underlined" @input="handleHashing($event.target.value)" :append-icon="show0 ? '$eye' : '$eyeOff'"
                            :type="show0 ? 'text' : 'password'" label="Contrasenya"
                            @click:append="show0 = !show0" @keyup.enter="guardar()"></v-text-field>

                <v-btn @click="guardar()" block class="mt-2 pa-6 button bitter-sweet oxford-blue-bg">LOGIN</v-btn>
            </form>
            <GoogleLogin :callback="callback" prompt/>
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
            <p class="mt-3 black-olive"> Encara no t'has registrat? <a href="#" class="lavender-pink" @click.stop.prevent="dialog = true,step=1"> Registra't </a></p>
            <v-dialog v-model="dialog" class="w-50 myfont">
                <v-card class="mx-auto" max-width="800" width="500">
                    <v-card-title class="text-h6  justify-space-between">
                        {{ currentTitle }}
                        <v-avatar class="text-h6 bitter-sweet-bg" style="color: white;" size="20" v-text="step"></v-avatar>
                    </v-card-title>

                    <v-window v-model="step">
                        <v-window-item class="bitter-sweet" :value="1">
                            <v-card-text>
                                <v-text-field variant="outlined" label="Email" placeholder="ejemplo@ejemplo.com" v-model="emailD"></v-text-field>
                                <v-row>
                                    <v-col cols="6">
                                        <v-text-field variant="outlined" label="Nom" v-model="username"></v-text-field></v-col>
                                    <v-col cols="6"><v-text-field variant="outlined" label="Cognoms"
                                            v-model="surname"></v-text-field></v-col>
                                </v-row>
                                <span  class="bitter-sweet">
                                    Aquest és el correu que faràs servir per al login
                                </span>
                            </v-card-text>
                        </v-window-item>

                        <v-window-item class="bitter-sweet" :value="2">
                            <v-container>
                                <v-card-text>
                                    <v-row>
                                        <v-text-field variant="outlined" :append-icon="show1 ? '$eye' : '$eyeOff'"
                            :type="show1 ? 'text' : 'password'" label="Contrasenya"
                            @click:append="show1 = !show1"
                                            v-model="passwordD"></v-text-field></v-row>
                                    <v-row>
                                        <v-text-field variant="outlined" :append-icon="show2 ? '$eye' : '$eyeOff'"
                            :type="show2 ? 'text' : 'password'" label="Confirmar contrasenya"
                            @click:append="show2 = !show2"
                                            v-model="passwordComprobacion"></v-text-field></v-row>
                                </v-card-text> </v-container>
                        </v-window-item>

                        <v-window-item :value="3">
                            <v-container>
                                <v-img src="https://i.pinimg.com/originals/a7/01/b4/a701b416f376c51673ffe421d2b2d7b0.jpg"></v-img>
                            </v-container>
                        </v-window-item>

                        <v-window-item :value="4">
                            <v-container>
                                <v-card-text>
                                    {{ this.errorMessage }}
                                </v-card-text>
                            </v-container>
                        </v-window-item>
                    </v-window>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-btn class="platinum-bg oxford-blue" v-if="step == 2" variant="text" @click="step--">
                            Enrere
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn class="oxford-blue-bg bitter-sweet" v-if="step < 2"  variant="flat" @click="step++">
                            Seguent
                        </v-btn>
                        <v-btn class="oxford-blue-bg bitter-sweet" v-if="step == 2 && this.passwordD == this.passwordComprobacion && this.passwordD != '' " color="primary" variant="flat" @click="register()">
                            Registrar-se
                        </v-btn>
                        <v-btn  v-if="step > 2" class="oxford-blue-bg bitter-sweet" variant="flat" @click="dialog=false">
                            Exit
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            
        </div>
    </v-sheet>
</template>


  

<script>
import { useAppStore } from '../../store/app'
import { registrarUsuari } from '../../communicationsManager'
import md5 from 'md5';
import { decodeCredential } from 'vue3-google-login'
import { googleLogout } from "vue3-google-login"



export default {
    setup() {
        
        const appStore = useAppStore()
        return {
            appStore
        };
    },
    data() {

        return {
            dialogL: false,
            loading: false,
            loginIncorrectDialog : false,
            allowed: false,
            dialog: false,
            errorMessage: '',
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
        callback(response) {
        const userData = decodeCredential(response.credential)
        this.appStore.setEmail(userData.email);
        this.appStore.setPassword("")
        this.appStore.setImageG(userData.picture)
        console.log("Login Google Info: ",this.appStore.getLoginInfo)
        this.appStore.loginGoogle()
        .then(async (result) => {
            console.log("Login Google Result: ",result)
            if (result) {
                this.$router.push({ name: 'Home' });
            }
            else {
                var usuario = {name: userData.given_name, surname: userData.family_name, email: userData.email, contrasena: ""}
                const response =  await registrarUsuari(usuario)
                if(response.success) {
                    this.email = userData.email
                    this.password = ""
                    this.$router.push({ name: 'Home' });          
                } else {
                    this.loginIncorrectDialog = true
                    
                }
            }
        })
        console.log("Handle the userData", userData)
        },

        onSuccess(userInfo) {
            this.userInfo = userInfo;
        },
        onError(error) {
            console.error('Google Sign-In Error:', error);
        },
        guardar() {
            console.log(this.email+" "+this.password);
            this.loading = true;
            this.appStore.setEmail(this.email);
            this.appStore.setPassword(this.password);
            this.appStore.login()
            .then((result)=> {
                if (result) {
                    console.log(this.appStore.getAulaInfo)
                    console.log("Go Home");
                        this.$router.push({ name: 'Home' });
                } else {
                    console.log("Login failed")
                    this.loginIncorrectDialog = true;
                    
                }
            })
            .catch((error) => {
            console.error("Error during login:", error);
            this.dialogL = true
            })
            .finally(() => {
                this.loading = false;
                
            });
        },
        GoogleLogoutFunction() {
            this.appStore.logout()
            googleLogout()
        },
        handleHashing(data) {
            let contr=md5(data).toUpperCase();
            this.password = contr;
            return contr
            },
        async register(){
            var encryptPwd = this.handleHashing(this.passwordD)
            var usuario = {name: this.username, surname: this.surname, email: this.emailD, contrasena: encryptPwd}
            const response =  await registrarUsuari(usuario)
            console.log(response);
            if(response.success) {
                this.step=3
                this.email = this.emailD
                this.password = encryptPwd
                const cambio = setTimeout(() => {
                    this.dialog = false
                    this.guardar()
                }, 2000);                
            } else {
                this.step=4
                this.errorMessage = response.message
                
            }
            this.emailD = ''
            this.username = ''
            this.surname = ''
            this.passwordD = '';
            this.passwordComprobacion = '';
        }
    }, computed: {
        currentTitle() {
            switch (this.step) {
                case 1: return `Registra't`
                case 2: return 'Crea una contrasenya'
                case 3: return 'Compte creat'
                case 4: return 'Error de registre'
                default: return 'Compte creat'
            }
        },
    },
};
</script>

<style scoped>

    .small-dialog .v-dialog__content {
        width: 50%; /* Ajusta esto a tu preferencia */
        max-width: 300px; /* Ajusta esto a tu preferencia */
    }
</style>
