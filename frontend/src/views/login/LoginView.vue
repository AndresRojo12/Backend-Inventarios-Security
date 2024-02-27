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
      max-width="338"
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
      </div>

      <v-text-field
        v-model="password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="togglePasswordVisibility"
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
const visible = ref(false);
//const loading = ref(false);
const route = useRouter()
//const error = ref("");

const loginUser = async () => {
  
  const response = await store.Login(email.value, password.value)
  if( response == false) {
    feedback.value = "Login error"
  }else{
    router.push({name: 'user_login'})
  }
};

const redirectHome = () => {
  route.push('/')
}

const togglePasswordVisibility = () => {
  visible.value = !visible.value;
};
</script>
