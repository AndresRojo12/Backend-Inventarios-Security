<template>
  <div>
    <v-toolbar color="#29282f">
      <template v-slot:prepend>
        <div class="text-h5">Inventarios</div>
      </template>
      <v-divider class="ms-3" inset vertical></v-divider>
      <v-btn @click="redirectHome">Inicio</v-btn>
      <v-spacer></v-spacer>
    </v-toolbar>
    <h1>Login</h1>
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field
        v-model="email"
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password

        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?</a>
      </div>

      <v-text-field
        v-model="password"
        :append-inner-icon="visible ? 'mdi-eye-on' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>
      <v-btn
        block
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal" @click="loginUser" 
      >
        Log In
      </v-btn>
      {{ feedback }}

      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import router from '@/router'

import useAuth from '@/store/auth'

const store = useAuth();
const email = ref("");
const password = ref("");
const feedback = ref("")
//const loading = ref(false);
const route = useRouter()
//const error = ref("");

// const isFormValid = computed(() => {
//   return email.value && password.value;
// });

const loginUser = async () => {
  // if (isFormValid.value) {
  //   loading.value = true;
  //   const response = await lo.useAuth(email.value, password.value);
  //   loading.value = false;

  //   if (response) {
    
  //     alert("Login exitoso");
  //     email.value = "";
  //     password.value = "";
  //   } else {
      
  //     alert("Acceso denegado:", lo.getErros());
  //   }
  // } else {
  //   console.log("Por favor, complete todos los campos.");
  // }

  const response = await store.Login(email.value, password.value)
  if( response == false) {
    feedback.value = "Login error"
  }else{
    router.push({name: 'register'})
  }
};

const redirectHome = () => {
  route.push('/home')
}

// const required = (v) => {
//   return !!v || "Campo obligatorio";
// };
</script>
