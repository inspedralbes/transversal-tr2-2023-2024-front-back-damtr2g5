
import { createRouter, createWebHashHistory} from 'vue-router'
import { getLogin } from '@/communicationsManager.js';
import { useAppStore } from '../store/app.js'


const requireAuth = (to, from, next) => {
  const store = useAppStore();
  console.log("Autenticado: ", store.isAuthenticated)
  if (store.isAuthenticated) {
    console.log("Going to...", to)
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
  console.log("Autenticado: ", store.isAuthenticated)
  if (store.isAuthenticated) {
    console.log("Going to...", to)
    next({ name: "Home" });
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
    name: 'Login',
    component: () => import(/* webpackChunkName: "home" */ '@/views/PantallaLogin.vue'),
    beforeEnter: checkAuth
  },
  {
    path: '/error',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Error',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Error.vue'),
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
    path: '/perfil',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Perfil',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Perfil.vue'),
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
    component: () => import('@/layouts/default/Default.vue'),
    props: true,
    beforeEnter: requireAuth,
    children: [
      {
      path: '',
      name: 'Categoria',
      component: () => import(/* webpackChunkName: "categoria" */ '../views/Categoria.vue'),
      
      }
    ]
  },

  {
    path: '/home/entrenamiento/:categoria/ejercicio/:id',
    component: () => import('@/layouts/default/Default.vue'),
    beforeEnter: requireAuth,
    children: [
      {
        path: '',
        name: 'InfoEjercicio',
        component: () => import(/* webpackChunkName: "home" */ '@/views/InfoEjercicio.vue'),
        props: true,
      },
    ],
  },
  {
    path: '/home/entrenamiento/:categoria/ejercicio/:id/juego',  
    component: () => import('@/layouts/default/Default.vue'),
    beforeEnter: requireAuth,
    children: [
      {
        path: '',
        name: 'Ejercicio',        
        component: () => import(/* webpackChunkName: "home" */ '@/views/Ejercicio.vue'),
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
  },
  {
    path: '/room',
    name: 'Room',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Room.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/game/:room',
    name: 'Game',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Game.vue'),
    beforeEnter: requireAuth,
  }


]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

export default router