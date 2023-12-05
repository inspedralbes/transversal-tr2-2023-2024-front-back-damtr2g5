
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',        
        component: () => import(/* webpackChunkName: "home" */ '@/views/PantallaLogin.vue'),
      },      
    ],
  },
  {
    path: '/entrenamiento',  
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Entrenamiento',        
        component: () => import(/* webpackChunkName: "home" */ '@/views/Temas.vue'),
      },      
    ], 

  },
  {
    path: '/entrenamiento/:categoria',
    name: 'Categoria',
    component: () => import(/* webpackChunkName: "categoria" */ '../views/Categoria.vue'),
    props: true,
  },
  
  {
    path: '/entrenamiento/:categoria/ejercicio/:id',  
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Ejercicio',        
        component: () => import(/* webpackChunkName: "home" */ '@/views/InfoEjercicio.vue'),
        props: true,
      },      
    ],   
  },
  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
