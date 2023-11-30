// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => ({
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
        respuesta: ''
    }),
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
        }
    },
})
