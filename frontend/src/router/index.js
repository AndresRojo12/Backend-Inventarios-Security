import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/login/LoginView.vue'
import RegisterView from '../views/register/RegisterView.vue'
import RegisterSucessView from '../views/register/RegisterSuccesView.vue'
import UserLoginView from '../views/perfil/UserLoginView.vue'
import TipoEquipoView from '../views/equipos/TipoEquiposView.vue'
import InventariosEquiposView from '../views/inventari/InventariosEquiposView.vue'
import RegistrarEquipoview from '../views/equipos/RegistrarEquiposView.vue'
import RegistrarInventario from '../views/inventari/RegistrarInventarioView.vue'
import EstadosEquiposView from '../views/estados/EstadosEquiposView.vue'
import RegistrarEstadosView from '../views/estados/RegistrarEstadoView.vue'
import MarcasEquiposView from '../views/marcas/MarcasEquiposView.vue'
import RegistrarMarcasView from '../views/marcas/RegistrarMarcasView.vue'
import useAuth from '@/store/auth'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      reqAut: false
    }
  },
  {
    path: '/user_login',
    name: 'user_login',
    component: UserLoginView,
    meta: {
      reqAut: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta:{
      reqAut: false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      reqAut: true,
      roles: ['ADMIN']
    }
  },

  {
    path: '/register_sucess',
    name: 'register_succes',
    component: RegisterSucessView,
    meta: {
      reqAut: true
    }
  },

  {
    path: '/tipo_equipos',
    name: 'tipo_equipos',
    component: TipoEquipoView,
    meta: {
      reqAut: true
    }
  },

  {
    path: '/registrar_estados',
    name: 'registrar_estados',
    component: RegistrarEstadosView,
    meta: {
      reqAut: true
    }
  },

  {
    path: '/registrar_marcas',
    name: 'registrar_marcas',
    component: RegistrarMarcasView,
    meta: {
      reqAut: true
    }
  },

  {
    path: '/marcas',
    name: 'marcas',
    component: MarcasEquiposView,
    meta: {
      reqAut: true
    }
  },

  {
    path: '/estados',
    name: 'estados',
    component: EstadosEquiposView,
    meta: {
      reqAut: true
    }
  },

  {
    path: '/inventarios',
    name: 'inventarios',
    component: InventariosEquiposView,
    meta: {
      reqAut: true
    }
  },

  {
    path: '/registrar-equipo',
    name: 'registrar-equipo',
    component: RegistrarEquipoview,
    meta: {
      reqAut: true
    }
  },

  {
    path: '/registrar-inventario',
    name: 'registrar-inventario',
    component: RegistrarInventario,
    meta: {
      reqAut: true
    }
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to , from , next)=>{
  const auth = useAuth()
  
  

  if(to.meta.reqAut && auth.acces_token === null) {
    next({name: 'login'})
  }else{
    next()
  }
})

export default router
