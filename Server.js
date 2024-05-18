require('dotenv').config();
const app = require('./app');
const { connection } = require('./databas/configuration');

const startServer = async () => {
  try {
    // Conectar a la base de datos
    await connection();

    // Iniciar el servidor
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log(`Escuchando en puerto ${port}...`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();
