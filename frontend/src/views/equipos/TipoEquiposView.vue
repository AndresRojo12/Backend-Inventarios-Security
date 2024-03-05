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
        prepend-icon="mdi-desktop-classic"
        title="Registrar Equipos"
        @click.prevent="registrarEquipo"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-desktop-classic"
        title="Equipos"
        @click.prevent="getEquipos"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
 <div style="text-align:center ;">
    <h1>Equipos</h1>
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
      <tr v-for="equipo in equipos" :key="equipo.id">
        <td>{{equipo.nombre}}</td>
        <td>{{equipo.estado ? 'Activo' : 'Inactivo' }}</td>
        <td>
          <v-icon @click="editarEquipo">mdi-pencil</v-icon>
          <v-icon @click="editarEquipo">mdi-delete</v-icon>
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

const equipos = ref([]);
const store = useAuth()

const editarEquipo = () => {
  console.log("Editar");
}


const redirectHome = () => {
  router.push({name:"user_login"})
}

const registrarEquipo = () => {
  router.push({name: 'registrar-equipo'})
}

const getEquipos = async () => {
  const equipoList = await store.getTipoEquipo();
  if(equipoList) {
    equipos.value = equipoList
  }
 
};

// Llama a la función al cargar el componente
onMounted(getEquipos);
</script>