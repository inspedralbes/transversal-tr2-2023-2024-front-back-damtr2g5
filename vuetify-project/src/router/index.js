
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',        
        component: () => import(/* webpackChunkName: "home" */ '@/views/InfoEjercicio.vue'),
      },      
    ],
  },
  {
    path: '/ejercicio/:id',  
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Ejercicio',        
        component: () => import(/* webpackChunkName: "home" */ '@/views/Ejercicio.vue'),
      },      
    ],   
  },{
    path: '/login',  
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Login',        
        component: () => import(/* webpackChunkName: "home" */ '@/views/PantallaLogin.vue'),
      },      
    ],   
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
