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
        title="Registrar Usuarios"
        @click.prevent="registro"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-desktop-classic"
        title="Equipos"
        @click.prevent="equipos"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-truck"
        title="Estados"
        @click.prevent="estados"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-pencil"
        title="Marcas"
        @click.prevent="marcas"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-package-variant"
        title="Inventarios"
        @click.prevent="inventarios"
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

const registro = () => {
  router.push({ name: "register" });
};

const equipos = () => {
  router.push({name: 'tipo_equipos'});
} 

const estados = () =>{
  router.push({name: 'estados'})
}

const marcas = () => {
  router.push({name: 'marcas'})
}

const inventarios = () => {
  router.push({name: 'inventarios'})
}
const getUserInformation = async () => {
  const userList = await store.getUser();
  if (userList) {
    users.value = userList
  }
};

// Llama a la función al cargar el componente
onMounted(getUserInformation);

</script>
