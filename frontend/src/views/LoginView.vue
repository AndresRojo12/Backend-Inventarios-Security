<template>
  <div class="container">
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-model="email"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <button
        type="submit"
        class="btn btn-primary mt-2"
        @click.prevent="loginUser"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import login from "../services/login";

const email = ref("");
const password = ref("");

const loginUser = async () => {
  const lo = new login();
  const respues = await lo.login(email.value, password.value);
  if (respues) {
    alert("Login sucess");
  } else {
    alert("No access");
  }
};
</script>
