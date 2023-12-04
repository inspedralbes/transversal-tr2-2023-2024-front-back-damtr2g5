// Utilities
import { defineStore } from 'pinia'
import {login, getLogin, endSession} from '@/communicationsManager';

export const useAppStore = defineStore('app', {
    state: () => ({
        auth: false,
        loginInfo: {
            loggedIn: false,
            id: '1',
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
    mutations: {
        setAuth(state, isAuthenticated) {
            this.state.auth = isAuthenticated;
        },
        setEmail(state, loginEmail) {
            this.state.user.email = loginEmail;
        },
        setPassword(state, loginPassword) {
            this.state.user.password = loginPassword;
        },
        setUser(state, user) {
            state.user = user;
        },
        setComandes(state, comandes){
            this.state.comandes = comandes;
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
        getRespuesta() {
            return this.respuesta;
        },
        isLoggedIn() {
            return this.loginInfo.loggedIn;
        },
        getLoginInfo() {
            return this.loginInfo;
        },
        login({ commit }) {

            return new Promise((resolve, reject) => {
              login(this.state.loginInfo).then((response) => response.json())
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
          hasCookieId({ commit }) {
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
    },
    getters: {
        isAuthenticated: (state) => state.auth,
      },
})
