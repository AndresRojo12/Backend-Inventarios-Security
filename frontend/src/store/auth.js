import { defineStore } from "pinia";

const useAuth = defineStore("auth", {
  state: () => {
    return {
      acces_token: null,
      user: null,
      equipo: null,
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
    
    async getUser() {
      if (!this.acces_token) {
        console.error("Usuario no autorizado. Inicia sesión primero.");
        return false;
      }

      
      const uri = `${this.baseURL}/usuarios`

      try {
        const respo = await fetch(uri, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Accept": "Application/json",
            "Authorization": this.acces_token
          }
          
        });

        const users = await respo.json();
        console.log("Respuesta del backend:", users);

        return users
      } catch (error) {
        console.error("Error en la solicitud de get:", error);
        return null;
      }
    },

    async RegisterEquipo(nombre) {
      if (!this.acces_token) {
        console.error("Usuario no autorizado. Inicia sesión primero.");
        return false;
      }

      console.log("Token enviado desde el frontend para el registro:", this.acces_token);

      const uri = `${this.baseURL}/tiposequipos`

      try {
        const respo = await fetch(uri, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "Application/json",
            "Authorization": this.acces_token
          },
          body: JSON.stringify({
            'nombre': nombre
          })
        });

        if (!respo.ok) {
          console.error("Error en la solicitud de registro. Código de estado:", respo.status);
          return false;
        }

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
    
    async getTipoEquipo() {
      if (!this.acces_token) {
        console.error("Usuario no autorizado. Inicia sesión primero.");
        return false;
      }
      const uri = `${this.baseURL}/tiposequipos?estado=true`

      try {
        const respo = await fetch(uri, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Accept": "Application/json",
            "Authorization": this.acces_token
          }
          
        });

        const tEquipos = await respo.json();
        console.log("Respuesta del backend:", tEquipos);

        return tEquipos
      } catch (error) {
        console.error("Error en la solicitud de get:", error);
        return null;
      }
    },

    async getInventarios() {
      if (!this.acces_token) {
        console.error("Usuario no autorizado. Inicia sesión primero.");
        return false;
      }
      const uri = `${this.baseURL}/inventarios?estado=false`

      try {
        const respo = await fetch(uri, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Accept": "Application/json",
            "Authorization": this.acces_token
          }
          
        });

        const tEquipos = await respo.json();
        console.log("Respuesta del backend:", tEquipos);

        return tEquipos
      } catch (error) {
        console.error("Error en la solicitud de get:", error);
        return null;
      }
    },

    logout() {
      this.acces_token = null;
      this.user = null; 
    },
  },
});

export default useAuth;
