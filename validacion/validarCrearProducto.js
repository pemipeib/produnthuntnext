export default function validarCrearProducto(valores) {
    let errores = {};
    
    // validar el nombre
    if (!valores.nombre){
        errores.nombre = "El nombre es obligatorio";
    }
    
    // validar el empresa
    if (!valores.empresa){
        errores.empresa = "El nombre de empresa es obligatorio";
    }
    
    // validar la url
    if(!valores.url) {
        errores.url = 'La URL del producto es obligatoria';
    } else if( !/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url) ) {
        errores.url = "URL incorrecta o no válida"
    }
    
    //Validar descripcion
    if (!valores.descripcion){
        errores.descripcion = "Falta la descripción del producto";
    }
    
    return errores;
};
