<template>
  <boton-atras/>
  <v-container fluid style="padding: 0;">
    <v-row class="d-flex justify-end w-full mt-3 mr-3">
      <v-menu min-width="200px" rounded>
        <template v-slot:activator="{ props }">
          <v-btn style="z-index: 20;" position="absolute" icon v-bind="props">
            <v-avatar color="brown" size="large">
              <v-img :src="user.image" alt="?"></v-img>
            </v-avatar>
          </v-btn>
          
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-badge :icon="`${mdiPencil}`" class="av" location="bottom end" offset-x="15" offset-y="7" @click="dialogL = true">
                <v-avatar color="brown" size="100" @click="dialogL = true">
                  <v-img :src="user.image" alt="John"></v-img>
                </v-avatar>
              </v-badge>
              <h3>{{ user.name }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn @click="perfil()" rounded variant="text">
                Veure compte
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn @click="logout()" rounded variant="text">
                Tancar sessió
              </v-btn>
            </div>

          </v-card-text>
        </v-card>
      </v-menu>
    </v-row>
  </v-container>
  <v-dialog v-model="dialogL" width="500" height="700">
    <v-card>
      <v-card-title>
        Elige una imagen
      </v-card-title>
      <div class="mx-auto text-center">
        <v-img v-if="!boton" :src="user.image"></v-img>
        <pruebas @botones="precionado"/>
      </div>
      <v-card-actions class="mx-auto text-center">
        <v-btn color="primary" @click="dialogL = false">Tancar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script >
import { useAppStore } from '@/store/app';
import { mdiPencil } from '@mdi/js'
import pruebas from '@/components/recortarimagen.vue'
import VuePictureCropper from 'vue-picture-cropper'
import BotonAtras from '@/components/interior/BotonAtras.vue';
export default {
  components: {
    VuePictureCropper,
    pruebas,
    BotonAtras
  },
  data() {
    const appStore = useAppStore()
    const user = appStore.getLoginInfo;
    
    return {
      rules: [
        value => {
          return !value || !value.length || value[0].size < 1000000 || 'La mida excedeix els 1 MB!'
        },
      ],

      mdiPencil,
      dialogL: false,
      boton: null,
    };
  },
  setup() {
    const store = useAppStore()
    const user = store.getLoginInfo;
    return {
      user, store,
    }
  },
  methods:
  {
    logout() {
      this.store.logout().then((result) => {
        if (result) {
          console.log("Login Session: ", this.store.getLoginInfo)
          this.$router.push({ name: "Login" });
        }
      })

    },
    perfil(){
      this.$router.push({ name: "Perfil" });
    },
    precionado() {
      // Realizar acciones necesarias cuando el modal se cierra
      console.log("precionado");
      // Puedes realizar otras acciones aquí según tu lógica
    },
  }
}

</script>

<style>
#lateral .v-btn--example {
    bottom: 0;
    position: absolute;
    margin: 0 0 16px 16px;
  }
  .av,
.av v-avatar {
  cursor: pointer;
}
</style>
