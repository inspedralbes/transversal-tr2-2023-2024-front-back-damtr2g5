// Utilities
import { defineStore } from 'pinia'
import {login, getLogin, endSession,getAvatar, loginGoogle, getAula} from '@/communicationsManager';

export const useAppStore = defineStore('app', {
    state: () => ({
        room: null,
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
        aulaInfo: {
          id:'',
          professor_id:'',
          name:'',
          access_code:''
        },
        respuesta: '',
        tema: null,
        ejercicio: null
    }),
    getters: {
        getRoom() {
            return this.room;
        },
        getRespuesta() {
          return this.respuesta;
        },
        getTema() {
          return this.tema;
        },
        getEjercicio() {
          return this.ejercicio
        },
        isAuthenticated() {
            return this.auth;
        },
        getAulaInfo() {
          return this.aulaInfo;
        },
        getLoginInfo() {
            return this.loginInfo;
        }
    },
    actions: {
      setAulaInfo(aula) {
        this.aulaInfo = aula
      },
        setRoom(room) {
            this.room = room;
        },
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
        setImageG(imageLogin) {
          this.loginInfo.image = imageLogin
        },
        setAuth(state, isAuthenticated) {
          this.state.auth = isAuthenticated;
        },
        setTema(temaAcceso) {
          this.tema = temaAcceso.raw
          console.log("Tema de Acceso: ",this.tema)
        },
        setEjercicio(ejercicio) {
          this.$state.ejercicio = ejercicio
          console.log("Store Side: ",this.$state.ejercicio)
        },
        
        login() {
            return new Promise((resolve, reject) => {
              console.log("Login info: ", this.$state.loginInfo);
              login(this.$state.loginInfo).then((response) => response.json())
                .then((data) => {
                  this.$state.loginInfo = data;
                  this.loading = false;
                  if (data.email != '') {
                    this.$state.auth = true;
                    console.log("New auth state: ", this.$state.auth)
                    if(data.id_classroom != null) {
                      this.$state.aulaInfo = this.setAulaInfo(data.id_classroom_code)
                    }
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
          loginGoogle() {
            return new Promise((resolve, reject) => {
              console.log("Login info: ", this.$state.loginInfo);
              loginGoogle(this.$state.loginInfo).then((response) => response.json())
                .then((data) => {
                  this.$state.loginInfo = data;
                  this.loading = false;
                  if (data.email != '') {
                    this.$state.auth = true;
                    console.log("New auth state: ", this.$state.auth)
                    resolve(true);
                  } else {
                    this.$state.auth = false;
                    console.log("Not mails:", data)
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
                  console.log("getLogin data",data)
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
