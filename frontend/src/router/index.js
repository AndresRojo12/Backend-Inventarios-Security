import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import RegisterSucessView from '../views/RegisterSuccesView.vue'

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
    path: '/home',
    name: 'home',
    component: HomeView
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
      reqAut: true
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
