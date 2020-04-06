export default function validarIniciarSesion(valores) {
    let errores = {};
    
    //validar el email
    if (!valores.email){
        errores.email = "El email es obligatorio"
    } else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email) ) {
        errores.email = "El email no es válido"
    }
    
    //validar el pass
    if (!valores.password){
        errores.password = "La contraseña es obligatoria"
    } else if ( valores.password.length < 6){
        errores.password = "El password tiene que tener un mínimo de 6 caracteres"
    }
    
    return errores;
};
