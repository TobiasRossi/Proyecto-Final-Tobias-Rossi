let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);


const contenedorcarritoVacio = document.getElementById("carrito-vacio");
const contenedorcarritoProductos = document.getElementById("carrito-productos");
const contenedorCarritoAcciones = document.getElementById("carrito-acciones");
const numero = document.getElementById("numero");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const botonComprar = document.querySelector("#carrito-acciones-comprar");
const contenedorTotal = document.querySelector("#total");

function displayProductosCarrito() {
    if(productosEnCarrito && productosEnCarrito.length > 0) {
        contenedorcarritoVacio.classList.add("disabled");
        contenedorcarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        numero.classList.add("disabled");
    
        contenedorcarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto =>{
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML =`
            <img class="carrito-producto-imagen" src="${producto.imagen}">
            <div class="carrito-producto-titulo">
                <span>Nombre</span>
                <h3>${producto.nombre}</h3>
            </div>
            <div class="carrito-producto-cantidad">
                <span>Cantidad</span>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carrito-producto-precio">
                <span>Precio</span>
                <p>${producto.precio}</p>
            </div>
            <div class="carrito-producto-subtotal">
                <span>SubTotal</span>
                <p>${producto.precio * producto.cantidad}</p>
            </div>
            <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>`;
    
        contenedorcarritoProductos.append(div);
        })
    } else {
        contenedorcarritoVacio.classList.remove("disabled");
        contenedorcarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        numero.classList.add("disabled");
    }

    escucharBotonesEliminar();
    actualizarTotal();
}

displayProductosCarrito();

function escucharBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id == idBoton);
    productosEnCarrito.splice(index, 1);

    displayProductosCarrito();
    
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    displayProductosCarrito();
}

function actualizarTotal() {
    contenedorTotal.innerText = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
}

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {
    Swal.fire("Gracias por su compra!!")

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    contenedorcarritoVacio.classList.add("disabled");
    contenedorcarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    numero.classList.add("disabled");
}