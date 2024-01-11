import { reactive } from "vue";
import { io } from "socket.io-client";
import { SERVER_URL } from "./communicationsManager";

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
});

export const socket = io(`${SERVER_URL}`, {
  withCredentials: true,

});

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});