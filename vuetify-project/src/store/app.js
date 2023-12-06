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
    }),
    getters: {
      
        getRespuesta() {
          return this.respuesta;
        },
        isAuthenticated() {
            return this.auth;
        },
        getLoginInfo() {
            return this.loginInfo;
        }
    },
    actions: {
        setLoginInfo({ id, name,contrasena, surname, email, rank, lifetotal, experience, image }) {
            this.loginInfo.id = id;
            this.loginInfo.name = name;
            this.loginInfo.contrasena = contrasena;
            this.loginInfo.surname = surname;
            this.loginInfo.email = email;
            this.loginInfo.rank = rank;
            this.loginInfo.lifetotal = lifetotal;
            this.loginInfo.experience = experience;
            this.loginInfo.image = image;
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
                  email: "",
                  password: "",
                  nom: "",
                  cognom: ""
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
