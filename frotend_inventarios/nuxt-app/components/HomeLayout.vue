<template>
  <v-toolbar color="#29282f" style="position:fixed">
    <template v-slot:prepend>
      <div class="text-h5">Inventarios</div>
    </template>
    <v-divider class="ms-3" inset vertical></v-divider>
    <v-toolbar-title>Inicio</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn variant="text" @click="redirectRegister">Registrarse</v-btn>
      <v-btn variant="text" @click="redirectLogin">Iniciar sesión</v-btn>
    </v-toolbar-items>
  </v-toolbar>
	<v-section>
		<div>
			<h1>
				Interes
			</h1>
		</div>
		<div class="principal">
			<img class="uno" src="/util/images/descarga (1).jpg" alt="">
			<img class="dos" src="/util/images/descarga.jpg" alt="">
			<img class="tres" src="/util/images/images.jpg" alt="">
			<img class="cuatro" src="/util/images/OIF.jpg" alt="">
			<img class="cinco" src="/util/images/OIP.jpg" alt="">
			<img class="seis" src="/util/images/th.jpg" alt="">
		</div>
	</v-section>
	<v-footer style="margin-top:30px ;" color="#29282f">Inventarios — 2024, LLC</v-footer>
</template>

<script setup>
  import { useRouter } from 'vue-router';

	const router = useRouter();

	const redirectRegister = () => {
    router.push('/usuario/create')
  }

	const redirectLogin = () => {
    router.push('/usuario/login')
  }


</script>

<style>
	.uno, .dos, .tres, .cuatro, .cinco, .seis{
		justify-content: center;
		flex-direction: column;
		width:400px;
		height: 236px;
	}

	.uno,.dos, .tres{
		margin-left: 30px;
	}

	.cuatro, .cinco, .seis{
		margin-left: 30px;
		margin-top: 30px;
	}

	.principal {
		margin-right: 30px;
		margin-top: 30px;
	}
	
	section, h1 {
		text-align:center; 
		margin-top: 80px;
	}


</style>