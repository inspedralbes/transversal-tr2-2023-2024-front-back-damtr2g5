<template>
  <v-img v-if="showImage" :src="store.loginInfo.image"></v-img>
  <div class="live-demo">
    <section class="section">
      <button class="select-picture mt-3">
        <input ref="uploadInput" type="file" accept="image/jpg, image/jpeg, image/png, image/gif" @change="selectFile" />
      </button>
    </section>

    <!-- Crop result preview -->

    <!-- A Popup for cropping -->
    <!-- You can replace it with the framework's Modal component -->
    <div class="modal-wrap" v-if="isShowModal">
      <div class="modal">
        <div class="modal-content">
          <!-- The component imported from `vue-picture-cropper` plugin -->
          <VuePictureCropper class="mt-3 mb-3" :boxStyle="{
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
        <div class="modal-title">
          <div class="tools">
            <v-btn class="mr-3 platinum-bg oxford-blue" @click="cancelImage">
              Cancelar
            </v-btn>
            <v-btn class="platinum-bg oxford-blue" @click="getResult(); boton = true">
              Recortar
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>

  <section class="section" v-if="result.blobURL">
    <div class="preview">
      <img :src="result.blobURL" />
    </div>
  </section>
  <v-btn class="platinum-bg oxford-blue" @click="mandar" v-on:click="boton = false" v-if="boton">Guardar</v-btn>
</template>

<script>
import { descargarImagen } from '@/communicationsManager';
import { useAppStore } from '@/store/app';
import { ref, reactive, watch, defineComponent } from 'vue';
import VuePictureCropper, { cropper } from 'vue-picture-cropper';
export default defineComponent({
  name: 'pruebas',
  emits: ['botones'], // Declaración de eventos que el componente emite
  components: {
    VuePictureCropper,
  },
  methods: {
    cancelImage() {
      this.isShowModal = false;
      this.showImage = true;
      this.uploadInput.value = null;
    },
  },
  setup(props, { emit }) {
    const store = useAppStore();
    const isShowModal = ref(false);
    const showImage = ref(true);
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
        showImage.value = false;

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
       descargarImagen(formData).then((response) => {
          console.log(response.imagen);
          store.loginInfo.image = response.imagen;
          showImage.value = true;
          result.blobURL = '';
          boton = false;
        });
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
      showImage,
      selectFile,
      getResult,
      mandar,
    };
  },
});
</script>