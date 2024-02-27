
import { pushScopeId } from 'vue';
<template>
    <v-card>
      <v-layout>
        <v-navigation-drawer
          permanent
          location="right"
        >
          <template v-slot:prepend>
            <v-list-item
              lines="two"
              prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
              :title="user.nombre"
              :subtitle="user.rol"
            ></v-list-item>
          </template>
  
          <v-divider></v-divider>
  
          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
            <v-list-item prepend-icon="mdi-account" title="Registar Usuarios" @click.prevent="regis"></v-list-item>
            <v-list-item prepend-icon="mdi-logout" title="Cerrar Sesion" @click.prevent="logout"></v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-main style="height: 250px"></v-main>
      </v-layout>
    </v-card>
  </template>
 
  
  <script setup>
  import useAuth from '@/store/auth';
  import router from '@/router'
  
  const user = useAuth().user;

  const store = useAuth()

  const logout = () => {
    store.logout()
    router.push({name: 'login'})
}

const regis = () => {
    router.push({name: 'register'})

}
  </script>
  