// Utilities
import { defineStore } from 'pinia'
import {login, getLogin, endSession} from '@/communicationsManager';

export const useAppStore = defineStore('app', {
    state: () => ({
        auth: false,
        loginInfo: {
            id: '',
            name: '',
            contrasena: '',
            surname: '',
            email: '',
            rank: '',
            lifetotal: '',
            experience: '',
            image: ''
        },
        respuesta: '',
        tema: null
    }),
    getters: {
      
        getRespuesta() {
          return this.respuesta;
        },
        getTema() {
          return this.tema;
        },
        isAuthenticated() {
            return this.auth;
        },
        getLoginInfo() {
            return this.loginInfo;
        }
    },
    actions: {
        setLoginInfo({name,contrasena, surname, email}) {
            this.loginInfo.name = name;
            this.loginInfo.contrasena = contrasena;
            this.loginInfo.surname = surname;
            this.loginInfo.email = email;
        },
        setRespuesta(answer) {
            this.respuesta = answer;
        },
        setEmail(emailLogin) {
          this.loginInfo.email = emailLogin
        },
        setPassword(pwdLogin) {
          this.loginInfo.contrasena = pwdLogin
        },
        setAuth(state, isAuthenticated) {
          this.state.auth = isAuthenticated;
        },
        setTema(temaAcceso) {
          this.tema = temaAcceso.raw
          console.log("Tema de Acceso: ",this.tema)
        },
        
        login() {
            return new Promise((resolve, reject) => {
              login(this.loginInfo).then((response) => response.json())
                .then((data) => {
                  this.$state.loginInfo = DataTransferItem
                  this.loading = false;
                  if (data.email != '') {
                    this.$state.auth = true;
                    console.log("New auth state: ", this.$state.auth)
                    resolve(true);
                  } else {
                    this.$state.auth = false;
                    console.log(data)
                    resolve(false);
                  }
                }).catch((error) => {
                  console.error('Error al iniciar sesión:', error);
                  this.$state.auth = false;
                  reject(error);
                });
            });
          },
          hasCookieId() {
            return new Promise((resolve, reject) => {
              getLogin().then((response) => response.json())
                .then((data) => {
                  console.log(data)
                  this.$state.loginInfo = data
                  this.loading = false;
                  if (data.email != '') {
                    this.$state.auth = true;
                    
                    console.log("New auth state getLogin: ", this.$state.auth)
                    resolve(true)
                  } else {
                    this.$state.auth = false;
                    resolve(false);
                  }
                }).catch((error) => {
                  console.error('Error al iniciar sesión:', error);
                  this.$state.auth = false;
                  reject(error);
                });
            });
          },
          logout() {
            return new Promise((resolve, reject) => {
              endSession().then(() => {
                this.$state.loginInfo = {
                  id: '',
                  name: '',
                  contrasena: '',
                  surname: '',
                  email: '',
                  rank: '',
                  lifetotal: '',
                  experience: '',
                  image: ''
                };
                this.$state.auth = false;
                console.log("Auth after logout: ",this.$state.auth)
                resolve(true)
              }
              ).catch((error) => {
                this.$state.auth = false;
                reject(error);
              })
            })
            
            
          },
    }
})
