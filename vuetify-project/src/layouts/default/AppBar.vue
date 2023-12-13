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
        <v-img v-if="fotoperfil" :src="user.image"></v-img>
      <pruebas :foto="fotoperfil"/>
    </div>
      <v-card-actions class="mx-auto text-center">
        <v-btn color="primary" @click="dialogL = false">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script >
import { useAppStore } from '@/store/app';
import { mdiPencil } from '@mdi/js'
import { reactive, ref } from 'vue'
import pruebas from '@/components/recortarimagen.vue'
import VuePictureCropper from 'vue-picture-cropper'
export default {
  components: {
    VuePictureCropper,
    pruebas
  },
  data() {
    return {
      rotation: 0,
      scale: 1,
      rules: [
        value => {
          return !value || !value.length || value[0].size < 1000000 || 'La mida excedeix els 1 MB!'
        },
      ],

      mdiPencil,
      dialogL: false, imagen: null
    };
  },
  setup() {
    const store = useAppStore()
    const user = store.getLoginInfo;
    const isShowModal = { value: true };
    let fotoperfil = { value: true };
    const uploadInput = { value: null }; // Equivalente a ref<HTMLInputElement | null>(null)
    const pic = { value: '' } // Equivalente a ref<string>('')

    const result = reactive({
      dataURL: '',
      blobURL: '',
      archivo: null
    })

    function selectFile(e) {
      pic.value = '';
      result.dataURL = '';
      result.blobURL = '';
      result.archivo = null;
      // Get selected files
      const files = e.target.files;
      if (!files || !files.length) return;

      // Convert to dataURL and pass to the cropper component
      const file = files[0];
      console.log("Archivo");
      console.log(file);
      result.archivo = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        // Update the picture source of the `img` prop
        pic.value = String(reader.result)

        // Show the modal
        isShowModal.value = true
        fotoperfil.value = false;

        // Clear selected files of input element
        if (!uploadInput.value) return
        uploadInput.value.value = ''
      }
    }
    var blobE = null
    async function getResult() {
      if (!cropper) return;

      const base64 = cropper.getDataURL();
      const blob = await cropper.getBlob();

      if (!blob) return;

      result.dataURL = base64;
      result.blobURL = URL.createObjectURL(blob);
      blobE = blob;
      isShowModal.value = false;
    }
    async function mandar() {

      if (!result.archivo) {
        console.error('No hay archivo para enviar.')
        return
      }

      const formData = new FormData()
      formData.append('file', blobE, 'nombre_archivo')

      try {
        const response = await fetch('http://localhost:3001/descargar', {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          body: formData
        });

        if (response.ok) {
          console.log('Archivo enviado con éxito.')
          response.json().then((result) => {
            store.loginInfo.image = result.imagen
          })
          // Aquí puedes realizar acciones adicionales después de enviar el archivo
        } else {
          console.error('Error al enviar el archivo.')
        }
      } catch (error) {
        console.error('Error en la solicitud:', error)
      }
    }


    return {

      // Data
      uploadInput,
      pic,
      result, user, store,fotoperfil,

      // Methods
      selectFile,      
      mandar,
      getResult
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
