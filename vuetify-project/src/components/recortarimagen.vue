<template>
  <div class="live-demo">

    <!-- Crop result preview -->

    <!-- A Popup for cropping -->
    <!-- You can replace it with the framework's Modal component -->
    <div class="modal-wrap">
        <div class="modal">
          <div class="modal-title">
            <div class="tools">
              <v-btn @click="getResult(); boton=true">
                Recortar
              </v-btn>
            </div>
          </div>

          <div class="modal-content">
            <!-- The component imported from `vue-picture-cropper` plugin -->
            <VuePictureCropper :boxStyle="{
              width: '100%',
              height: '100%',
              backgroundColor: '#f8f8f8',
              margin: 'auto',
            }" :img="pic" :options="{
  viewMode: 1,
  dragMode: 'move',
  aspectRatio: 1,
  cropBoxResizable: false,
}" :presetMode="{
  mode: 'round',
  width: '100%',
  height: '100%',
}" />
          </div>
        </div>
    </div>
  </div>
  <v-btn @click="mandar" v-if="boton">Guardar</v-btn>
</template>
  
<script>
import { useAppStore } from '@/store/app';
import { ref, reactive, watch, defineComponent } from 'vue';
import VuePictureCropper, { cropper } from 'vue-picture-cropper';

export default defineComponent({
  name: 'pruebas',
  emits: ['botones'], // Declaración de eventos que el componente emite
  components: {
    VuePictureCropper,
  },
  props: {
    pic: {
      type: String,
      default: '',
    },
  },
  methods: {
    async getResult() {
      
      if (!cropper) return;
      const base64 = cropper.getDataURL();
      console.log("base64", cropper.getDataURL());
      const blob = await cropper.getBlob();
      
      if (!blob) return;

      result.dataURL = base64;
      result.blobURL = URL.createObjectURL(blob);
      blobE = blob;
    },
  },
  setup() {
    const store = useAppStore();
    let boton = false;
    let blobE = null;

    async function mandar() {
      if (!result.archivo) {
        console.error('No hay archivo para enviar.');
        return;
      }

      const formData = new FormData();
      formData.append('file', blobE, 'nombre_archivo');

      try {
        const response = await fetch('http://localhost:3001/descargar', {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          body: formData,
        });

        if (response.ok) {
          console.log('Archivo enviado con éxito.');
          response.json().then((result) => {
            store.loginInfo.image = result.imagen;
          });
        } else {
          console.error('Error al enviar el archivo.');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    }

    return {
      store,
      boton,
      mandar,
    };
  },
});
</script>