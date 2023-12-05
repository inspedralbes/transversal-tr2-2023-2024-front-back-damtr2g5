// Utilities
import { defineStore } from 'pinia'
import {login, getLogin, endSession} from '@/communicationsManager';

export const useAppStore = defineStore('app', {
    state: () => ({
        auth: false,
        loginInfo: {
            loggedIn: false,
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
        isLoggedIn() {
            return this.loginInfo.loggedIn;
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
        
        login() {
            return new Promise((resolve, reject) => {
              console.log(this.loginInfo())
              login(this.loginInfo).then((response) => response.json())
                .then((data) => {
                  this.state.loginInfo = data
                  console.log("Login info: ",this.state.loginInfo)
                  this.loading = false;
                  if (data.email != '') {
                    this.state.auth = true;
                    resolve(true);
                  } else {
                    this.state.auth = false;
                    resolve(false);
                  }
                }).catch((error) => {
                  console.error('Error al iniciar sesión:', error);
                  this.state.auth = false;
                  reject(error);
                });
            });
          },
          hasCookieId() {
            return new Promise((resolve, reject) => {
              getLogin().then((response) => response.json())
                .then((data) => {
                  commit('setUser', data);
                  this.loading = false;
                  if (data.email != '') {
                    commit('setAuth', true);
                    resolve(true);
                  } else {
                    commit('setAuth', false);
                    resolve(false);
                  }
                }).catch((error) => {
                  console.error('Error al iniciar sesión:', error);
                  commit('setAuth', false);
                  reject(error);
                });
            });
          },
          logout({ commit }) {
            this.state.user = {
              email: "",
              password: "",
              nom: "",
              cognom: ""
            };
            endSession();
            commit('setAuth', false);
          }
    }
})
