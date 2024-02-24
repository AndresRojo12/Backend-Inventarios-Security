<template>
    <v-card
      class="mx-auto"
      max-width="344"
      title="User Registration"
    >
      <v-container>
        <v-text-field
          v-model="nombre"
          color="primary"
          label="Name"
          variant="underlined"
        ></v-text-field>
  
        
        <v-text-field
        v-model="email"
        color="primary"
        label="Email"
        variant="underlined"
        ></v-text-field>
        
        <v-text-field
        v-model="password"
        color="primary"
        label="Password"
        placeholder="Enter your password"
        variant="underlined"
        ></v-text-field>
        
        <v-text-field
          v-model="rol"
          color="primary"
          label="Rol"
          variant="underlined"
        ></v-text-field>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
  
        <v-btn color="success" @click.prevent="registerUser">
          Complete Registration
  
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
        <p style="color:red">
          {{ feedback }}
        </p>
      </v-card-actions>
    </v-card>
  </template>

  <script setup>
  import { ref } from 'vue'
  import useAuth from '@/store/auth'
  import router from '@/router'


  const nombre = ref('')
  const email = ref('')
  const password = ref('')
  const rol = ref('')
  const store = useAuth();
  const feedback = ref("")



  const registerUser = async () => {
    feedback.value="Sending"
    const response = await store.Register(nombre.value, email.value, password.value, rol.value)
    if(response == false) {
      feedback.value = "register error"
    }else{
      router.push({name: 'register_succes'})
     
    }
  }


</script>