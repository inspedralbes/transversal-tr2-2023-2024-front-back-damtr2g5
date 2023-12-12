<template>
  <v-container fluid style="height: 100px">
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
              <v-badge :icon="`${mdiPencil}`" location="bottom end">
                <v-avatar color="brown">
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
</template>

<script >
import { useAppStore } from '@/store/app';
import { mdiPencil } from '@mdi/js'
export default {
  
  data() {
    const appStore = useAppStore()
    const user = appStore.getLoginInfo;
    return {
      user,
      mdiPencil,
      appStore
    };
  },
  methods: {
    logout() {
      this.appStore.logout().then((result)=> {
        if (result) {
          console.log("Login Session: ",this.appStore.getLoginInfo)
          this.$router.push({name:"Login"});
        }
      })
      
    }
  }
}
</script>

<style scoped>
.v-icon {
  margin-right: 10px;
}
</style>
