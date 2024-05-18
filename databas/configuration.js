const mongoose=require('mongoose')

const conection= async()=>{

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conexion correcta a Mongo")
    } catch (error) {
        console.log('Error',error)
        throw new Error('Error conectando a MONGO')
    }
   
}
module.exports={conection}