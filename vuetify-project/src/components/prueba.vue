<template>
  <div>
    <vue-avatar
    :width="400"
    :height="400"
    :rotation="rotation"
    :scale="scale"
    ref="vueavatar"
    :image="appStore.loginInfo.image"
    @vue-avatar-editor:image-ready="onImageReady"
    >
  </vue-avatar>
  <br>
  <label>
    Zoom : {{scale}}x
    <br>
    <input
      type="range"
      min=1
      max=3
      step=0.02
      v-model='scale'
    />
  </label>
  <br>
  <label>
    Rotation : {{rotation}}°
    <br>
    <input
      type="range"
      min=0
      max=360
      step=1
      v-model='rotation'
    />
  </label>
  <br>
  <button v-on:click="saveClicked">Get image</button>
  </div>
</template>
<script>
import { useAppStore } from '@/store/app';
import { VueAvatar } from 'vue-avatar-editor-improved'
export default {
  components: {
        VueAvatar: VueAvatar
    },
    data: function data() {
      const appStore = useAppStore()
        return {
            rotation: 0,
            scale: 1,
            borderRadius: 0,
            appStore
        };
    },

    methods: {
        saveClicked: function saveClicked() {
            var img = this.$refs.vueavatar.getImageScaled();
            this.$refs.image.src = img.toDataURL();
            this.appStore.loginInfo.image = img.toDataURL();
        },
        onImageReady: function onImageReady() {
            this.scale = 1;
            this.rotation = 0;
        }
    }
}
</script>