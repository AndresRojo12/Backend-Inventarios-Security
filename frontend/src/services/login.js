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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      if (!res.ok) {
       
        if (res.status === 401) {
          this.error = "Credenciales incorrectas. Por favor, inténtalo de nuevo.";
        } else if (res.status === 403) {
          this.error = "Acceso denegado. No tienes permiso para acceder.";
        } else {
          this.error = `Error del servidor: ${res.status} ${res.statusText}`;
        }
        return false;
      }
  
      const response = await res.json();
  
      if ("errors" in response) {
        this.error = response.errors;
        return false;
      } else {
        this.jwt = response.acces_token;
        this.error = "";
        return true;
      }
    } catch (error) {
      this.error = "Error de red o tiempo de espera.";
      return false;
    }
  }
  
  
}

export default Auth;
