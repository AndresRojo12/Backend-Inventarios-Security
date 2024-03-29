const Inventario = require('../models/Inventarios')
const { request, response} = require('express')
const Usuario = require('../models/Users')
const Marca = require('../models/Marcas')
const Estado = require('../models/Estado_Equipo')
const TipoEquipo = require('../models/Tipo_equipo')
// crear


const createInventario= async (req = request, 
    res = response) => {
    try{
        console.log("datos recibidos", req.body)
        const data = req.body
        console.log("datos recibidos",data)
        console.log('ID de usuario:', data.usuario._id);
        const { usuario, marca, estado, tipoEquipo } = data;
        //validando usuario
        console.log("Validando usuario...");
        const usuarioDB = Usuario.findOne({
            _id: usuario._id,
            estado: true
        });
        // select * from usuarios where _id=? and estado=true
        if(!usuarioDB){
            console.log("Usuario encontrado en la base de datos:");
            return res.status(400).json({msg: 'usuario invalido'})
        }
        // validando marca
        const marcaDB = Marca.findOne({
            _id: marca._id,
            estado: true
        })// select * from marcas where _id=? and estado=true
        if(!marcaDB){
            return res.status(400).json({msg: 'marca invalida'})
        }
        // validando estado
        const estadoDB = Estado.findOne({
            _id: estado._id,
            estado: true
        })// select * from estados where _id=? and estado=true
        if(!estadoDB){
           return res.status(400).json({msg: 'estado invalido'})
        }
        // validando tipo equipo
        const tipoEquipoDB = TipoEquipo.findOne({
            _id: tipoEquipo._id,
            estado: true
        })// select * from tipoequipos where _id=? and estado=true
        if(!tipoEquipoDB){
           return res.status(400).json({msg: 'estado invalido'})
        }      
        const inventario = new Inventario(data)
        
        await inventario.save()

        console.log("Inventario creado exitosamente:", inventario);
        
        return res.status(201).json(inventario)
    }catch(error){
        return res.status(500).json({
            msg: 'Error general ' + error
        })
    }
}

//listar todos
const getInventarios = async (req = request, 
    res = response) => {
        try{
            const inventariosDB = await Inventario.find()
            .populate({
                path: 'marca',
                  select: 'nombre estado'
               })
              .populate({
                path:'estado',
                select:'nombre estado '
               })
               .populate({
                path:'tipoEquipo',
                select:'nombre estado'
               })
               .populate({
                path:'usuario',
                select:'nombre email password rol'
               })
            //select * from inventarios
            return res.json(inventariosDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}

// actualizar inventario
const EditarInventario = (req = request,
    res = response) => {
   
        const {id} = req.params


        const info = req.body
        const newInventarioInfo = {
            serial:info.serial,
            Modelo: info.Modelo,
            Descripción: info.Descripción,
            FotoEquipo: info.FotoEquipo,
            Color: info.Color,
            FechaCompra: info.FechaCompra,
            precio: info.precio,
            usuario: info.usuario,
            marca: info.marca,
            estado: info.estado,
            tipoEquipo: info.tipoEquipo
        }
        Inventario.findByIdAndUpdate(id, newInventarioInfo, { new: true})
        .then(result => {
            res.json(result)
        }).catch(error => {
            console.error(error)
        })
}

const deleteInventario = (req = request,
    res = response, next) => {
   
        const {id} = req.params

Inventario.findByIdAndDelete(id).then(resultado => {
    res.json(resultado)
}).catch(error => next(error))
}





module.exports = { createInventario, getInventarios,EditarInventario,deleteInventario}