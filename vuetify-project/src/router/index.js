
import { createRouter, createWebHistory } from 'vue-router'
import { getLogin } from '@/communicationsManager.js';
import { useAppStore } from '../store/app.js'

const requireAuth = (to, from, next) => {
  const store = useAppStore();
  console.log("Autenticado: ",store.isAuthenticated)
  if (store.isAuthenticated) {
    console.log("Going to...",to)
    next();
  } else {
    store.hasCookieId()
        .then((isAuthenticated) => {
          if (isAuthenticated) {
            next();
          } else {
            next({ name: "Login" });
          }
        });
    
  }
};
const checkAuth = (to, from, next) => {
  const store = useAppStore();
  console.log("Autenticado: ",store.isAuthenticated)
  if (store.isAuthenticated) {
    console.log("Going to...",to)
    next({ name: "Home"});
  } else {
    console.log("Cookie")
    store.hasCookieId()
        .then((isAuthenticated) => {
          console.log("Authenticated permission")
          if (isAuthenticated) {
            next({ name: "Home" });
          } else {
            next();
          }
        });
    
  }
};
const routes = [
  {
    path: '/', 
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Login',        
        component: () => import(/* webpackChunkName: "home" */ '@/views/PantallaLogin.vue'),
        beforeEnter: checkAuth
      },      
    ],
  },
  {
    path: '/home', 
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',        
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
        beforeEnter: requireAuth
      },      
    ],
  },
  {
    path: '/home/entrenamiento',  
    component: () => import('@/layouts/default/Default.vue'),
    beforeEnter: requireAuth,
    children: [
      {
        path: '',
        name: 'Entrenamiento',        
        component: () => import(/* webpackChunkName: "home" */ '@/views/Temas.vue'),
      },      
    ], 

  },
  {
    path: '/home/entrenamiento/:categoria',
    name: 'Categoria',
    component: () => import(/* webpackChunkName: "categoria" */ '../views/Categoria.vue'),
    props: true,
    beforeEnter: requireAuth,
  },
  
  {
    path: '/home/entrenamiento/:categoria/ejercicio/:id',  
    component: () => import('@/layouts/default/Default.vue'),
    beforeEnter: requireAuth,
    children: [
      {
        path: '',
        name: 'Ejercicio',        
        component: () => import(/* webpackChunkName: "home" */ '@/views/InfoEjercicio.vue'),
        props: true,
      },      
    ],   
  },
  {
    path: '/home/batalla',
    component: () => import('@/layouts/default/Default.vue'),
    beforeEnter: requireAuth,
    children: [
      {
        path: '',
        name: 'Batalla',        
        component: () => import(/* webpackChunkName: "home" */ '@/views/BuscadorBatalla.vue'),
      },      
    ],
  }
  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router