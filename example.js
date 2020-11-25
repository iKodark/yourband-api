// const fs = require('fs');  // metodo para borrar imagen y no dejar duplicar (hay que tener cuidado y hacer pruebas porque no es compatible en todas las verciones).
// const AWS = require('aws-sdk')

// // MODELS
// const User = require('../database/models/user');
// const Product = require('../database/models/product');


// const s3 = new AWS.S3({
//     accessKeyId: process.env.AWS_ID,
//     secretAccessKey: process.env.AWS_SECRET
// })



// const UploadImage = async ( req, res, next) => {

//     var tipo = req.params.tipo;  //tipo de archivo que vamos recibi
//     var id = req.params.id;  // Id referente la coleccion que vamos usar las imagenes de perfil

//     //Tipos de coleccion
//     var tipoValidos = ['users', 'products']; // base de dados
//     if( !tipoValidos.includes( tipo )){ // Un tipo de validaccion 
//         return res.status(400).json({
//             ok: false,
//             mensaje: "Tipo de coleccion no es valida",
//             errr:{mensaje:"debes seleccionar una coleccion valida, ejemplo: 'http://localhost:3000/upload/posts/id', la colleccion tienes que esta en el plural " }
//         }); //URL DAS IMAGENS http://localhost:3002/images/usuarios/5e811d7313127f0abc04b74d-10.JPG para PUT verificar URL arriba
//     }
//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).json({
//             ok: false,
//             mensaje:'No files were uploaded.'
//         })
//       }
//       const img = req.files.img
//       if(img == null || undefined){
//         return res.status(400).json({
//             ok: false,
//             mensaje:'Please, You need defined name archive = img'
//         })
//       }
//       var nombreCortado = img.name.split('.');
//       extencionArchivo = nombreCortado[nombreCortado.length -1];

    
//       //solo estas extenciones aceptamos
//       var extencionesValidas = ['png', 'jpg', 'gif', 'jpeg', 'png', 'JPG', 'PDF', 'pdf', 'docx', 'MP3', 'mp3', 'ogg', '.ogg']; //Mayusculas y minusculas son importantes
//       if( extencionesValidas.indexOf(extencionArchivo) < 0 ){ // validaccion
//         return res.status(400).json({
//             ok: false,
//             mensaje: "Extension no valida",
//             err:{ mensaje:"Extensiones validas son:" + extencionesValidas.join(', ')}
//         });
//       }
//      //Configurar el nombre del archivo
//      var nombreArchivo = ${id}-${new Date().getMilliseconds()}.${ extencionArchivo}; //aqui generamos un id nombre que se crea en milesseconds

    

     


            

//      //Mover Archivo a la carpeta correcta
//      var path = ./uploads/${ tipo }/${nombreArchivo}; //  Definimos las rutas de los archivos
//      img.mv( path, err =>{  //para mover el archivo a la carpeta correcta
//          if(err){
//             return res.status(500).json({
//                 ok: false,
//                 mensaje: "Error al mover archivo",
//                 errors: err
//             });
//          }
//      });

//      const params = {
//         Bucket: process.env.AWS_BUCKET_NAME,
//         Key: ${ tipo }/${nombreArchivo},
//         Body: img.data
//     }
//     s3.upload(params, async (error, data) => {
//         if(error){
//             res.status(500).send(error)
//         }

//            await subitPorTipo( tipo, id, nombreArchivo) 
//            return res.status(200).json({
//                data
//            })


           


            
//     })

    

    
//      };


//     const subitPorTipo = (tipo, id, nombreArchivo, res) =>{

    
//         if(tipo === 'users'){

//             try {
//                 User.findById(id, (err, user)=>{
//                     var pathViejo = './uploads/users/' + user.img;
//                     //metodo para borrar imagen vieja | Obg: ese metodo no funciona en algunas versiones de node
//                     if( fs.existsSync(pathViejo)){
//                         fs.unlinkSync( pathViejo );
//                     }
//                     user.img = nombreArchivo;
//                     user.save()
//                 })
//             } catch (error) {
//                 return res.status(401).json({
//                     ok: false,
//                     mensaje:' Verify catch of erros line 109'
//                 })
//             }
//         }


//         if(tipo === 'products'){

//             try {
//                 Product.findById(id, (err, product)=>{
//                     var pathViejo = './uploads/products/' + product.img;
//                     //metodo para borrar imagen vieja | Obg: ese metodo no funciona en algunas versiones de node
//                     if( fs.existsSync(pathViejo)){
//                         fs.unlinkSync( pathViejo );
//                     }
//                     product.img = nombreArchivo;
//                     product.save();
//                 })
//             } catch (error) {
//                 return res.status(401).json({
//                     ok: false,
//                     mensaje:' Verify catch of erros line 109'
//                 })
//             }
//         }

    

    


// }

// module.exports = {
//     UploadImage
// }