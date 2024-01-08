<template>
  <v-container fluid style="padding: 0;">
    <v-row class="d-flex justify-end w-full mt-3 mr-3">
      <p class="myfont mr-15 mt-3 white" style="position: absolute;"> Nivell {{ nivel }}</p>
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
            <div class="mx-auto text-center myfont">
              <v-badge :icon="`${mdiPencil}`" class="av" location="bottom end" offset-x="15" offset-y="7"
                @click="dialogL = true">
                <v-avatar color="brown" size="100" @click="dialogL = true">
                  <v-img :src="user.image" alt="John"></v-img>
                </v-avatar>
              </v-badge>
              <h2 class="mt-2">{{ user.name }}</h2>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn @click="perfil()" rounded variant="text">
                Perfil
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
    <v-card class="myfont round-border">
      <v-card-title class="text-center big-font">
        Canvia la teva imatge
      </v-card-title>
      <div class="mx-auto text-center">
        <pruebas/>
      </div>
      <v-card-actions @click="dialogL = false" class="closable-card mt-3 text-center oxford-blue-bg bitter-sweet justify-center">
        <texto>TANCAR</texto>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script >
import { useAppStore } from '@/store/app';
import { mdiPencil } from '@mdi/js'
import pruebas from '@/components/recortarimagen.vue'
import VuePictureCropper from 'vue-picture-cropper'
export default {
  components: {
    VuePictureCropper,
    pruebas
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
      boton: null
    };
  },
  computed: {
    nivel() {
      const appStore = useAppStore()
      const exp = appStore.getExpInfo;
      return exp.nivel;
    },
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
    closeDialog() {
      this.dialogL = false;
      this.picture = '';
    },
    selectFile(e) {
      this.picture = '';

      const { files } = e.target;
      if (!files || !files.length) return;

      const file = files[0];
      this.result.archivo = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.picture = String(reader.result);
      };
    },
    logout() {
      this.store.logout().then((result) => {
        if (result) {
          console.log("Login Session: ", this.store.getLoginInfo)
          this.$router.push({ name: "Login" });
        }
      })

    },
    perfil() {
      this.$router.push({ name: "Perfil" });
    }
  }
}

</script>

<style>
.closable-card {
  cursor: pointer;
}
.closable-card:hover {
  background-color: #143360 !important;
}
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
