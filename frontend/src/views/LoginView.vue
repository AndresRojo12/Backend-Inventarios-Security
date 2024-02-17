<template>
  <v-card class="mx-auto px-6 py-8" max-width="344" style="margin-top: 100px">
    <v-form>
      <v-text-field
        v-model="email"
        :readonly="loading"
        :rules="[required]"
        class="mb-2"
        clearable
        label="Email"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :readonly="loading"
        :rules="[required]"
        clearable
        label="Password"
        type="password"
        placeholder="Enter your password"
      ></v-text-field>

      <br />
      <v-btn
        :disabled="!isFormValid || loading"
        :loading="loading"
        block
        color="blue"
        size="large"
        type="submit"
        variant="elevated"
        @click="loginUser"
      >
        Sign In
      </v-btn>
    </v-form>
  </v-card>
</template>

<script setup>
import { ref, computed } from "vue";

import login from "../services/login";
const lo = new login();
const email = ref("");
const password = ref("");
const loading = ref(false);
//const error = ref("");

const isFormValid = computed(() => {
  return email.value && password.value;
});

const loginUser = async () => {
  if (isFormValid.value) {
    loading.value = true;
    const response = await lo.login(email.value, password.value);
    loading.value = false;

    if (response) {
    
      alert("Login exitoso");
      email.value = "";
      password.value = "";
    } else {
      
      alert("Acceso denegado:", lo.getErros());
    }
  } else {
    console.log("Por favor, complete todos los campos.");
  }
};

const required = (v) => {
  return !!v || "Campo obligatorio";
};
</script>
