import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/login/LoginView.vue'
import RegisterView from '../views/register/RegisterView.vue'
import RegisterSucessView from '../views/register/RegisterSuccesView.vue'
import UserLoginView from '../views/perfil/UserLoginView.vue'

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
