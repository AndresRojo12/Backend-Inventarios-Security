const express=require('express')
const cors= require('cors')

const app =express();
//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors());

//app.options('*', cors()); // Habilita CORS para todas las rutas

const tipoEquipo=require('./routes/TipoEquipo.route')
const estadoEquipo=require('./routes/EstadoEquipo.route')
const usuario=require('./routes/Usuario.route')
const marcas=require('./routes/Marcas.route')
const inventarios=require('./routes/Inventarios.routes')
const login=require('./routes/login')
app.use('/api/tiposequipos',tipoEquipo)
app.use('/api/estadosequipos',estadoEquipo)
app.use('/api/usuarios',usuario)
app.use('/api/marcas',marcas)
app.use('/api/inventarios',inventarios)
app.use('/api/logins',login)

const vueDistPath = path.join(__dirname,'/frontend/dis');
app.use(express.static(vueDistPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(vueDistPath, 'index.html'));
  });

app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Inventarios');
});


module.exports=app