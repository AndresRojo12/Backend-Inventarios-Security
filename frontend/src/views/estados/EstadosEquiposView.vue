<template>
    <v-navigation-drawer permanent location="right">
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
       <v-list-item
         prepend-icon="mdi-home-city"
         title="Home"
         value="home"
         @click="redirectHome"
       ></v-list-item>
       <v-list-item
         prepend-icon="mdi-truck"
         title="Registrar Estados"
         @click.prevent="registrarEstado"
       ></v-list-item>
       <v-list-item
         prepend-icon="mdi-truck"
         title="Estados"
         @click.prevent="getEstado"
       ></v-list-item>
     </v-list>
   </v-navigation-drawer>
  <div style="text-align:center ;">
     <h1>Estados</h1>
  </div>
  <div style="margin-top: 50px;">
   <v-table fixed-header height="400px"
     margin-top="50px">
     <thead>
       <tr>
         <th>
           Nombre
           <v-col cols="10">
 
           </v-col>
         </th>
         <th>
           Estado
           <v-col cols="10">
           </v-col>
         </th>
         <th>
           Acciones
           <v-col cols="10">
           </v-col>
         </th>
       </tr>
     </thead>
     <tbody>
       <tr v-for="estado in estados" :key="estado.id">
         <td>{{estado.nombre}}</td>
         <td>{{estado.estado ? 'Activo' : 'Inactivo' }}</td>
         <td>
           <v-icon @click="editarEstado">mdi-pencil</v-icon>
           <v-icon @click="editarEstado">mdi-delete</v-icon>
         </td>
       </tr>
     </tbody>
   </v-table>
 </div>
 </template>
 
 <script setup>
 
 import useAuth from "@/store/auth";
 import router from "@/router";
 import { ref, onMounted } from "vue";
 const user = useAuth().user;
 
 const estados = ref([]);
 const store = useAuth()
 
 const editarEstado = () => {
   console.log("Editar");
 }
 
 
 const redirectHome = () => {
   router.push({name:"user_login"})
 }
 
 const registrarEstado = () => {
   router.push({name: 'registrar_estados'})
 }
 
 const getEstado = async () => {
   const estadoList = await store.getEstados();
   if(estadoList) {
     estados.value = estadoList
   }
  
 };
 
 // Llama a la función al cargar el componente
 onMounted(getEstado);
 </script>