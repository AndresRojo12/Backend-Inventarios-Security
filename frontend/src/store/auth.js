import { defineStore } from "pinia";

const useAuth = defineStore("auth", {
  state: () => {
    return {
      acces_token: null,
      user: null, // Agrega esta propiedad para almacenar la información del usuario
      baseURL: "http://localhost:3001/api",
    };
  },

  actions: {
    async Login(email, password) {
      const uri = `${this.baseURL}/logins`;

      try {
        const respo = await fetch(uri, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "Application/json",
          },
          body: JSON.stringify({
            'email': email,
            'password': password,
          }),
        });

        const res = await respo.json();

        console.log("Respuesta del backend:", res);

        if (res.acces_token && res.acces_token.trim() !== "") {
          this.acces_token = res.acces_token.trim();
          this.user = res.user; // Almacena la información del usuario
          console.log("Token almacenado en el frontend:", this.acces_token);
          localStorage.setItem('acces_token', this.acces_token);

          this.user = {
            _id: res._id,
            nombre: res.nombre,
            rol: res.rol,
            email: res.email,
          };
          return true;
        } else {
          console.error("Token inválido o vacío.");
          return false;
        }
      } catch (error) {
        console.error("Error en la solicitud de login:", error);
        return false;
      }
    },

    async Register(nombre, email, password, rol) {
      if (!this.acces_token) {
        console.error("Usuario no autorizado. Inicia sesión primero.");
        return false;
      }

      console.log("Token enviado desde el frontend para el registro:", this.acces_token);

      const uri = `${this.baseURL}/usuarios`

      try {
        const respo = await fetch(uri, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "Application/json",
            "Authorization": this.acces_token
          },
          body: JSON.stringify({
            'nombre': nombre,
            'email': email,
            'password': password,
            'rol': rol
          })
        });

        const res = await respo.json();
        console.log("Respuesta del backend:", res);

        if (!res) {
          console.error("Error en la solicitud de registro: Respuesta vacía");
          return false;
        } else {
          return true;
        }
      } catch (error) {
        console.error("Error en la solicitud de registro:", error);
        return false;
      }
    },

    logout() {
      this.acces_token = null;
      this.user = null; // Limpia la información del usuario al cerrar sesión
    }
  },
});

export default useAuth;
