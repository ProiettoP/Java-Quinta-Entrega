class Vino {
    constructor(nombre, precio, cepa, stock) {
        this.nombre = nombre
        this.precio = precio
        this.cepa = cepa
        this.stock = stock
    }

    calcularPrecioConIva() {
        return this.precio * 1.21
    }

    descontarStock(cantidad) {
        if (this.stock >= cantidad) {
            this.stock = this.stock - cantidad
            return true
        } else {
            return false
        }
    }
}

const vino1 = new Vino("Uvas Sweet", 9788, "Torrontes", 10)
const vino2 = new Vino("13 Cles Reserva", 11800, "Bonarda", 8)
const vino3 = new Vino("Pokahara", 12300, "Bonarda", 6)
const vino4 = new Vino("Simonasi", 14900, "Malbec", 5)
const vino5 = new Vino("Gran Sombrero", 16200, "Cabernet Sauvignon", 4)

let listaVino = [vino1, vino2, vino3, vino4, vino5]

function aplicarDescuento(monto, porcentaje) {
    return monto * (1 - porcentaje / 100)
}

function mostrarCatalogo() {
    console.clear()
    console.log("=== CATALOGO DE VINOS DISPONIBLES ===")
    let textoAlerta = "Catálogo actual en bodega:\n\n"
    let indice = 1

    for (let vino of listaVino) {
        let linea = indice + " - " + vino.nombre + " (" + vino.cepa + ") - $" + vino.precio + " [Stock: " + vino.stock + "]"
        console.log(linea)
        textoAlerta = textoAlerta + linea + "\n"
        indice++
    }

    console.log("=====================================")
    alert(textoAlerta)
}

function agregarVinoAlCatalogo() {
    alert("--- Alta de nuevo vino en el catalogo ---")

    let nombre = prompt("Ingresa el nombre del vino:")
    if (nombre === null || nombre.trim() === "") {
        alert("Operacion cancelada: el nombre no puede estar vacio.")
        return
    }

    let precio = parseFloat(prompt("Ingresa el precio unitario:"))
    if (isNaN(precio) || precio <= 0) {
        alert("Operacion cancelada: ingresa un precio numerico valido.")
        return
    }

    let cepa = prompt("Ingresa la cepa (ej: Malbec, Torrontes, Blend):")
    if (cepa === null || cepa.trim() === "") {
        cepa = "Sin especificar"
    }

    let stock = parseInt(prompt("Ingresa la cantidad inicial de botellas en stock:"))
    if (isNaN(stock) || stock < 0) {
        alert("Operacion cancelada: ingresa un stock valido.")
        return
    }

      const nuevoVino = new Vino(nombre, precio, cepa, stock)

      listaVino.push(nuevoVino)

    console.log("Nuevo vino incorporado al inventario:")
    console.log(nuevoVino)
    alert("Se agrego '" + nuevoVino.nombre + "' al catalogo.")
}

function armarMenuProductos() {
    let menu = "Selecciona un vino ingresando su número:\n"
    let index = 1
    for (let vino of listaVino) {
        menu = menu + index + " - " + vino.nombre + " (" + vino.cepa + ") - $" + vino.precio + " [Stock: " + vino.stock + "]\n"
        index++
    }
    return menu
}

function cargarCarrito() {
    let subtotal = 0
    let seguirComprando = true

    while (seguirComprando) {
        let menu = armarMenuProductos()
        let opcionElegida = prompt(menu)
        let indiceProducto = parseInt(opcionElegida) - 1

        if (indiceProducto >= 0 && indiceProducto < listaVino.length) {
            let productoSeleccionado = listaVino[indiceProducto]

            if (productoSeleccionado.descontarStock(1)) {
                subtotal = subtotal + productoSeleccionado.precio
                alert("Agregaste: " + productoSeleccionado.nombre + " ($" + productoSeleccionado.precio + ")")
            } else {
                alert("Lo sentimos, no queda stock disponible de " + productoSeleccionado.nombre)
            }
        } else {
            alert("Opcion no válida. Por favor, selecciona un numero de la lista.")
        }

        let respuesta = prompt("¿Deseas agregar otro producto? (si / no)")
        if (respuesta && respuesta.toLowerCase() !== "si") {
            seguirComprando = false
        }
    }

    return subtotal
}

function procesarPago(totalConIva) {
    let medioPago = prompt(
        "Elige el método de pago:\n" +
        "1 - Efectivo / Transferencia (10% de descuento)\n" +
        "2 - Tarjeta de Debito (Precio de lista)\n" +
        "3 - Tarjeta de Credito en 3 cuotas (15% de recargo)"
    )

    let totalFinal = totalConIva
    let detallePago = ""

    switch (medioPago) {
        case "1":
            totalFinal = aplicarDescuento(totalConIva, 10)
            detallePago = "Efectivo / Transferencia (10% OFF)"
            break
        case "2":
            totalFinal = totalConIva
            detallePago = "Tarjeta de Debito"
            break
        case "3":
            totalFinal = totalConIva * 1.15
            detallePago = "Tarjeta de Credito (3 cuotas con 15% recargo)"
            break
        default:
            alert("Opcion no reconocida, se aplicara precio de lista.")
            detallePago = "Tarjeta de Debito (por defecto)"
            break
    }

    return { totalFinal: totalFinal, detallePago: detallePago }
}

function imprimirTicket(nombre, subtotal, iva, totalConIva, detallePago, totalFinal) {
    console.clear()
    console.log("================================")
    console.log("       RESUMEN DE COMPRA        ")
    console.log("================================")
    console.log("Cliente:            " + nombre)
    console.log("Subtotal sin IVA:   $" + subtotal.toFixed(2))
    console.log("IVA (21%):          $" + iva.toFixed(2))
    console.log("Total con IVA:      $" + totalConIva.toFixed(2))
    console.log("Forma de pago:      " + detallePago)
    console.log("--------------------------------")
    console.log("TOTAL FINAL:        $" + totalFinal.toFixed(2))
    console.log("================================")
}

function ejecutarVenta(nombreCliente) {
    let subtotalAcumulado = cargarCarrito()

    if (subtotalAcumulado > 0) {
        let ivaCalculado = subtotalAcumulado * 0.21
        let totalConIva = subtotalAcumulado + ivaCalculado

        let resultadoPago = procesarPago(totalConIva)

        imprimirTicket(
            nombreCliente,
            subtotalAcumulado,
            ivaCalculado,
            totalConIva,
            resultadoPago.detallePago,
            resultadoPago.totalFinal
        )

        alert("¡Venta finalizada con exito! Revisa la consola para ver el comprobante.")
    } else {
        alert("No se cargaron productos a la venta.")
    }
}

let nombreUsuario = prompt("Bienvenido al sistema de la Vinoteca. Ingresa tu nombre:")
let ejecutando = true

while (ejecutando) {
    let menu = prompt(
        "Hola " + nombreUsuario + ", selecciona una opcion:\n\n" +
        "1 - Ver catalogo\n" +
        "2 - Modificar catalogo (Agregar vino)\n" +
        "3 - Ingresar venta\n" +
        "4 - Salir"
    )

    switch (menu) {
        case "1":
            mostrarCatalogo()
            break
        case "2":
            agregarVinoAlCatalogo()
            break
        case "3":
            ejecutarVenta(nombreUsuario)
            break
        case "4":
        case null:
            ejecutando = false
            alert("Gracias por usar el sistema. ¡Hasta luego!")
            break
        default:
            alert("Opcion no valida. Por favor, ingresa 1, 2, 3 o 4.")
            break
    }
}