<template>
    <div style="text-align: center;
    margin-top:50px">
        <h1>Registrar Marcas</h1>
    </div>
    <v-sheet class="mx-auto" width="300">
    <v-form fast-fail @submit.prevent style="margin-top:100px ;">
      <v-text-field
        v-model="nombre"
        label="Nombre"
      ></v-text-field>
      <v-btn class="mt-2" type="submit" @click="registerMarcas" block>Registrar</v-btn>
      <p style="color: red">
        {{ feedback }}
      </p>
    </v-form>
  </v-sheet>
</template>

<script setup>

import { ref } from "vue";
import useAuth from "@/store/auth";
import router from "@/router";

const nombre = ref("");
const store = useAuth();
const feedback = ref("");

const registerMarcas = async () => {
  feedback.value = "Sending";

  if (!nombre.value) {
    feedback.value = "All fields are required";
    return;
  }

  if (store.user && store.user.rol === "ADMIN") {
    const response = await store.RegisterMarca(
      nombre.value
    );

    if (response === false || !response) {
      feedback.value = "Register error";
    } else {
      alert(feedback.value = "Registration successful!");
      router.push({ name: "marcas" });
    }
  } else {
    feedback.value = "You don't have permission to register users.";
  }
};
</script>