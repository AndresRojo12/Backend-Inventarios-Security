const app= require('./app')
const{conection}= require('./databas/configuration')
const dotenv=require('dotenv').config()
const conex=conection()

// Resto de la configuración del servidor...

const port = process.env.PORT;
app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));