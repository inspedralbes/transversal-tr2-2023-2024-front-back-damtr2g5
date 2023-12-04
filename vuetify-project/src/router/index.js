
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
  {
    path: '/practicas',  
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Practicas',        
        component: () => import(/* webpackChunkName: "home" */ '@/views/ListaCategorias.vue'),
      },      
    ], 

  },
  {
    path: '/practicas/:categoria',
    name: 'Categoria',
    component: () => import(/* webpackChunkName: "categoria" */ '../views/Categoria.vue'),
    props: true,
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
