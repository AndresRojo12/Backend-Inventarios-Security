<template>
  <div style="text-align: center; margin-top: 30px">
    <h1>Crear Inventario</h1>
  </div>
  <v-sheet class="mx-auto" width="300">
    <v-form style="margin-top: 50px">
      <v-text-field 
        v-model="serial" 
        label="Serial"> 
      </v-text-field>
      <v-text-field v-model="Modelo" label="Modelo"> </v-text-field>
      <v-text-field v-model="Descripción" label="Descripción">
      </v-text-field>
      <v-text-field v-model="FotoEquipo" label="FotoEquipo">
      </v-text-field>
      <v-text-field v-model="Color" label="Color"> </v-text-field>
      <v-text-field
        v-model="FechaCompra"
        label="Fecha de Compra"
        type="date"
   
      ></v-text-field>

      <v-text-field v-model="precio" label="Precio" type="number"> </v-text-field>
      <v-autocomplete
       v-model="usuario"
       :items="usuarios"
        label="Usuario"
        item-text="nombre"
        item-value="nombre"
      >
      </v-autocomplete>
      <v-autocomplete 
        v-model="marca"
        :items="mars"
        label="Marca"> 
      </v-autocomplete>
      <v-autocomplete
        v-model="estado" 
        :items="estados"
        label="Estado"> 
      </v-autocomplete>
      <v-autocomplete 
        v-model="tipoEquipo" 
        :items="equipos"
        label="TipoEquipo"> 
      </v-autocomplete>
      <v-btn color="#2196f3"  @click.prevent="registrarInventario"
        >Registrar</v-btn
      >
      <p style="color: red">
        {{ feedback }}
      </p>
    </v-form>
  </v-sheet>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useAuth from "@/store/auth";
import router from "@/router";


const store = useAuth();

  const serial = ref("")
  const Modelo = ref("")
  const Descripción = ref("")
  const FotoEquipo = ref("")
  const Color = ref("")
  const FechaCompra = ref("")
  const precio = ref("")
  const usuario = ref(null) 
  const marca = ref(null) 
  const estado = ref(null)
  const tipoEquipo = ref(null)

const feedback = ref("");
const usuarios = ref([]);
const equipos = ref([]);
const mars = ref([]);
const estados = ref([]);

const obtenerUsuarios = async () => {
  try {
    const users = await store.getUser();

    if (users) {
      usuarios.value = users.map((user)=>{
        return user.nombre
      })
    } else {
      console.error("Error al obtener la lista de usuarios desde el store.");
    }
  } catch (error) {
    console.error("Error al obtener la lista de usuarios:", error);
  }
};

const obtenerMarcas = async () => {
  try {
    const marcas = await store.getMarca();

    if (marcas) {
      mars.value = marcas.map((mar)=>{
        return mar.nombre
      })
    } else {
      console.error("Error al obtener la lista de marcas desde el store.");
    }
  } catch (error) {
    console.error("Error al obtener la lista de marcas:", error);
  }
};

const obtenerEstados = async () => {
  try {
    const estad = await store.getEstado();

    if (estad) {
      estados.value = estad.map((estadosEquipos)=>{
        return estadosEquipos.nombre
      })
    } else {
      console.error("Error al obtener la lista de estados desde el store.");
    }
  } catch (error) {
    console.error("Error al obtener la lista de estados:", error);
  }
};

const obtenerEquipos = async () => {
  try {
    const equiposs = await store.getTipoEquipo();

    if (equiposs) {
       equipos.value = equiposs.map((eq)=>{
        return eq.nombre
      })
      
      
    } else {
      console.error("Error al obtener la lista de equipos desde el store.");
    }
  } catch (error) {
    console.error("Error al obtener la lista de equipos:", error);
  }
};


const registrarInventario = async () => {
  try {
    feedback.value = "Sending";
    if (!serial.value || !Modelo.value || !Descripción.value || !FotoEquipo.value || !Color.value || !FechaCompra.value ||!precio.value || !usuario.value || !marca.value || !estado.value || !tipoEquipo.value) {
      feedback.value = "All fields are required";
      return;
    }

    const parsedFechaCompra = new Date(FechaCompra.value);

   
    if (isNaN(parsedFechaCompra.getTime())) {
      console.error("Fecha de compra no válida");
      feedback.value = "Fecha de compra no válida";
      return;
    }

    const parsedPrecio = parseFloat(precio.value);
  if (isNaN(parsedPrecio)) {
    console.error("Precio no válido");
    feedback.value = "Precio no válido";
    return;
  }
    if (store.user && store.user.rol === "ADMIN") {

      const response = await store.RegisterInventario(
        serial.value,
        Modelo.value,
        Descripción.value,
        FotoEquipo.value,
        Color.value,
        parsedFechaCompra, 
        parsedPrecio,
        usuario.value,
        marca.value,
        estado.value,
        tipoEquipo.value
      );

      if (response === false || !response) {
        feedback.value = "Register error";
      } else {
        alert((feedback.value = "Registration successful!"));
        router.push({ name: "inventarios" });
      }
    } else {
      feedback.value = "You don't have permission to register users.";
    }
  } catch (error) {
    console.error("Error during registration:", error);
    feedback.value = "An error occurred during registration. Please try again later.";
  }
};


onMounted(() => {
  obtenerEquipos();
  obtenerUsuarios();
  obtenerMarcas();
  obtenerEstados();
});

</script>
