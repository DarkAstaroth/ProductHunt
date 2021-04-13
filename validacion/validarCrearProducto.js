export default function validarCrearProducto(valores) {
    let errores = {};

    // Validar el nombre del usuario
    if (!valores.nombre) {
        errores.nombre = "El nombre es obligatorio";
    }

    //validar el empresa
    if (!valores.empresa) {
        errores.empresa = "Nombre de la empresa obligatorio"
    }

    // validar la url
    if (!valores.url) {
        errores.url = "la URL es obligatoria";
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
        errores.url = "URL mal formateada o no valida"  
    }

    // validar descripcion
    if (!valores.descripcion) {
        errores.descripcion = "Agrega una descripcion de tu producto";
    }
    
    // validar el password
    if (!valores.password) {
        errores.password = "El Password es Obligatorio";
    } else if (valores.password.length<6) {
        errores.password = "El password debe ser de al menos 6 caracteres";
    }

    return errores;
}

