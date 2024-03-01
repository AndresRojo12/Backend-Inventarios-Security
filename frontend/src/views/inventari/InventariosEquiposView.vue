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
        <h1>Hola inventario</h1>
    </div>

    <div>
    
    <v-card-title style="text-align:center ;">
      Inventarios
    </v-card-title>
  
  <v-table fixed-header height="400px"
    margin-top="50px">
    <thead>
      <tr>
        <th>
          Serial
          <v-col cols="10">

          </v-col>
        </th>
        <th>
          Modelo
          <v-col cols="10">
          </v-col>
        </th>
        <th>
          Descripción
          <v-col cols="10">
          </v-col>
        </th>
        <th>
          FotoEquipo
          <v-col cols="10">
          </v-col>
        </th>
        <th>
          Color
          <v-col cols="10">
          </v-col>
        </th>
        <th>
          FechaCompra
          <v-col cols="10">
          </v-col>
        </th>
        <th>
          Precio
          <v-col cols="10">
          </v-col>
        </th>
        <th>
          Usuario
          <v-col cols="10">
          </v-col>
        </th>
        <th>
          Marca
          <v-col cols="10">
          </v-col>
        </th>
        <th>
          Estado
          <v-col cols="10">
          </v-col>
        </th>
        <th>
          TipoEquipo
          <v-col cols="10">
          </v-col>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="inventario in inventarios" :key="inventario.id">
        <td>{{inventario.serial}}</td>
        <td>{{inventario.Modelo }}</td>
        <td>{{inventario.Descripción }}</td>
        <td>
            <img :src="inventario.FotoEquipo" alt="Foto del equipo" style="max-width: 100px; max-height: 100px;" />
        </td>
        <td>{{inventario.Color }}</td>
        <td>{{ getFormattedDate(inventario.FechaCompra) }}</td>
        <td>{{inventario.precio }}</td>
        <td>{{inventario.usuario.nombre }}</td>
        <td>{{inventario.marca.nombre }}</td>
        <td>{{ inventario.estado.nombre }}</td>
        <td>{{inventario.tipoEquipo.nombre }}</td>
        <td></td>
      </tr>
      
    </tbody>
   
  </v-table>
</div>
</template>

<script setup>
    import useAuth from '@/store/auth';
    import router from '@/router';
    import { ref, onMounted } from 'vue';
    import { format } from 'date-fns';

    const inventarios = ref([]);
    const store = useAuth();

    const getFormattedDate = (date) => {
    return format(new Date(date), 'yyyy-MM-dd HH:mm');
   };

    const redirectHome = () => {
    router.push({name:"user_login"})

}
const getInventarios = async () => {
    const listInventarios = await store.getInventarios();
    if(listInventarios){
        inventarios.value = listInventarios
    }
};

onMounted(getInventarios);


</script>