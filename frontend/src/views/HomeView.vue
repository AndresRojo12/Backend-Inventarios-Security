<template>
    <v-toolbar color="#29282f">
      <template v-slot:prepend>
        <div class="text-h5">INVENTARIOS</div>
      </template>
      <v-divider class="ms-3" inset vertical></v-divider>
      <v-toolbar-title>INICIO</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn variant="text" @click="redirectLogin">Iniciar sesión</v-btn>
        <v-btn variant="text" @click="redirectRegister">Registrar</v-btn>

      </v-toolbar-items>
    </v-toolbar>
   
    <v-section>
      
      <v-parallax src="https://th.bing.com/th/id/R.b5b5cfe5f74d0a43d8330fe9f9507416?rik=NfvYAtRHT59evw&riu=http%3a%2f%2fst.gde-fon.com%2fwallpapers_original%2f577175_internet_sotsialnyie-seti_hi-tech_3894x2865_www.Gde-Fon.com.jpg&ehk=rzuxlWPwCvCynpuUHiykU1vI7heTOC4YsSLd09zFUMk%3d&risl=&pid=ImgRaw&r=0"></v-parallax>

          <div class="principal">
          </div>
        </v-section>
        <v-footer style="margin-top:30px ;" color="#29282f">Inventarios — 2024, LLC</v-footer>

  </template>
  
  <script setup>
    import { useRouter } from 'vue-router';
  
      const router = useRouter();
  
      const redirectRegister = () => {
      router.push('/register')
    }
  
      const redirectLogin = () => {
      router.push('/login')
    }
  
  </script>
  