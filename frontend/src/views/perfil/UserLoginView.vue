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
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account"
        title="Registar Usuarios"
        @click.prevent="regis"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-logout"
        title="Cerrar Sesion"
        @click.prevent="logout"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <div>
    
      <v-card-title style="text-align:center ;">
        Usuarios
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
            Email
            <v-col cols="10">
            </v-col>
          </th>
          <th>Rol</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{user.nombre}}</td>
          <td>{{user.email }}</td>
          <td>{{ user.rol }}</td>
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
const users = ref(null);
const store = useAuth();

const logout = () => {
  store.logout();
  router.push({ name: "login" });
};

const regis = () => {
  router.push({ name: "register" });
};

const getUserInformation = async () => {
  const userList = await store.getUser();
  if (userList) {
    users.value = userList
  }
};

// Llama a la función al cargar el componente
onMounted(getUserInformation);

</script>
