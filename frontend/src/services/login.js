import { ref } from "vue";

class Auth {
  constructor() {
    this.jwt = ref("");
    this.error = ref("");
  }

  getJwt() {
    return this.jwt;
  }

  getErros() {
    return this.error;
  }

  async login(email, password) {
    try {
      const res = await fetch("http://localhost:3001/api/logins", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const response = await res.json();

      if ("errors" in response) {
        this.error = "Acceso denegado";
        return false;
      } else {
        this.jwt = response.acces_token;
        return true;
      }
    } catch (error) {
      return false;
    }
  }
}

export default Auth;
