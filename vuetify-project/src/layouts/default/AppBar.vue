<template>
  <v-container fluid style="height: 300px">
    <v-row class="d-flex justify-end w-full mt-3 mr-3">
      <v-menu min-width="200px" rounded>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar color="brown" size="large">
              <v-img :src="user.image" alt="John"></v-img>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-badge :icon="`${mdiPencil}`" class="av" location="bottom end">
                <v-avatar color="brown" @click="dialogL = true">
                  <v-img :src="user.image" alt="John"></v-img>
                </v-avatar>
              </v-badge>
              <h3>{{ user.name }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text">
                Editar compte
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
        <vue-avatar-editor :width="400" :height="400" :rotation="rotation" :scale="scale" ref="vueavatar"
          image="http://localhost:3001/imagen/avatar1.jpg" accept="image/jpg, image/png, image/jpeg" border="0" @finished="saveClicked"
          @select-file="onSelectFile($event)">
        </vue-avatar-editor>

      </div>
      <v-card-actions class="mx-auto text-center">
        <v-btn @click="saveClicked"> Guardar</v-btn>
        <v-btn color="primary" @click="dialogL = false">Tancar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script >
import { useAppStore } from '@/store/app';
import { mdiPencil } from '@mdi/js'
import { VueAvatarEditor } from 'vue-avatar-editor-improved'
import { GuardarImagen } from '@/communicationsManager'
export default {
  components: {
    VueAvatarEditor: VueAvatarEditor
  },
  data() {
    const appStore = useAppStore()
    const user = appStore.getLoginInfo;
    return {
      rotation: 0,
      scale: 1,
      rules: [
        value => {
          return !value || !value.length || value[0].size < 1000000 || 'La mida excedeix els 1 MB!'
        },
      ],
      user,
      mdiPencil,
      appStore, dialogL: false, imagen: null
    };
  },
  methods:
  {
    logout() {
      this.appStore.logout().then((result) => {
        if (result) {
          console.log("Login Session: ", this.appStore.getLoginInfo)
          this.$router.push({ name: "Login" });
        }
      })

    },
    onSelectFile (files) {
      this.imagen = files[0];
            console.log('here is your file', this.imagen);
        },
    saveClicked: function saveClicked(img) {
      this.dialogL = false
      var image = img
      console.log(this.$refs.vueavatar);
      
      GuardarImagen(image).then((result) => {
        console.log(result)
      })
        },
    onImageReady: function onImageReady() {
      this.scale = 1;
      this.rotation = 0;
    },

  }
}
</script>

<style scoped>
.v-icon {
  margin-right: 10px;
}

.av,
.av v-avatar {
  cursor: pointer;
}
</style>
