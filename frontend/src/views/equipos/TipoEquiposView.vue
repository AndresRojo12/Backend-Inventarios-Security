<template>
    <v-toolbar color="#29282f">
    <template v-slot:prepend>
      <div class="text-h5">Inventarios</div>
    </template>
    <v-divider class="ms-3" inset vertical></v-divider>
    <v-btn @click="redirectHome">Inicio</v-btn>
    <v-spacer></v-spacer>
  </v-toolbar>
 <div>
    <h1>Hola equipo</h1>
 </div>

 <div>
    
    <v-card-title style="text-align:center ;">
      Equipos
    </v-card-title>
  
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
      </tr>
    </thead>
    <tbody>
      <tr v-for="equipo in equipos" :key="equipo.id">
        <td>{{equipo.nombre}}</td>
        <td>{{equipo.estado ? 'Activo' : 'Inactivo' }}</td>
        <td></td>
      </tr>
      
    </tbody>
   
  </v-table>
</div>
</template>

<script setup>

import useAuth from "@/store/auth";
import router from "@/router";
import { ref, onMounted } from "vue";


const equipos = ref([]);
const store = useAuth()



const redirectHome = () => {
  router.push({name:"user_login"})
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