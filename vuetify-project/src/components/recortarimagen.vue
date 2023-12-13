<template>
  <div class="live-demo">
    <section class="section">
      <button class="select-picture">
        <input ref="uploadInput" type="file" accept="image/jpg, image/jpeg, image/png, image/gif" @change="selectFile" />
      </button>
    </section>

    <!-- Crop result preview -->

    <!-- A Popup for cropping -->
    <!-- You can replace it with the framework's Modal component -->
    <div class="modal-wrap" v-if="isShowModal">
        <div class="modal">
          <div class="modal-title">
            <div class="tools">
              <v-btn  @click="isShowModal = false">
                Cancelar
              </v-btn>
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
  width: 200,
  height: 200,
}" />
          </div>
        </div>
    </div>
  </div>
  
  <section class="section" v-if="result.blobURL">
      <div class="preview">
        <img :src="result.blobURL" />
      </div>
    </section>
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
  setup(props, { emit }) {
    const store = useAppStore();
    const isShowModal = ref(false);
    const uploadInput = ref(null);
    const pic = ref('');
    const result = reactive({
      dataURL: '',
      blobURL: '',
      archivo: null,
    });
    let boton = false;
    let blobE = null;

    function selectFile(e) {
      pic.value = '';
      result.dataURL = '';
      result.blobURL = '';
      result.archivo = null;

      const { files } = e.target;
      if (!files || !files.length) return;

      const file = files[0];
      result.archivo = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        pic.value = String(reader.result);        
        isShowModal.value = true;
        if (!uploadInput.value) return;
        uploadInput.value.value = '';
      };
    }

    watch(() => uploadInput, () => {
        // Emitir evento 'botones' al componente padre cuando isShowModal cambia a false
          // Verificar si newValue no es undefined para evitar emitir al inicio
          // Emitir el evento 'botones' con la función emit proporcionada por Vue
          emit('botones');

    });

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
      uploadInput,
      pic,
      result,
      isShowModal,
      store,
      boton,
      selectFile,
      getResult,
      mandar,
    };
  },
});
</script>