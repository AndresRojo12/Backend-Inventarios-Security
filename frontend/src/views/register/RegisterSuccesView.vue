<template>
    <div>
        <h1>Bienvenido</h1>
        <v-btn @click.prevent="logout">logut</v-btn>
    </div>
</template>

<script setup>
  import useAuth from '@/store/auth'
  import router from '@/router'

  const store = useAuth();


const logout = () => {
    store.logout()
    router.push({name: 'login'})
}
</script>