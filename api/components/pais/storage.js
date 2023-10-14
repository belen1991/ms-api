const Model = require('./model')

async function agregarPais( dato ) {
    const resultado = await new Model( dato )
    return resultado.save()
}

async function obtenerPais( filtro ) {
    let mi_filtro = {}

    if (filtro.codigo != null) {
        mi_filtro = { codigo: filtro.codigo }
    }
    const resultado = await Model.find( mi_filtro )
    return resultado
}


async function actualizarPais(dato) {
    const nuevo_objeto = await Model.findOne( { pais: dato.pais } )

    nuevo_objeto.nombre = dato.nombre
    nuevo_objeto.codigo = dato.codigo
    
    const resultado = await nuevo_objeto.save()
    return resultado
}

async function eliminarPais(dato) {
    const resultado = await Model.deleteOne( {pais: dato.pais} )
    return resultado
}

module.exports = {
    agregar:agregarPais,
    obtener:obtenerPais,
    actualizar:actualizarPais,
    eliminar:eliminarPais
}