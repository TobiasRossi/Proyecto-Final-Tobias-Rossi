let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        displayProductos(productos);
    })

const contenedorProductos = document.getElementById("contenedor-productos")
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numero = document.getElementById("numero");

function displayProductos(productos) {

    contenedorProductos.innerHTML = "";

    productos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML =`
        <img class="producto-imagen" src="${producto.imagen}" alt="">
            <div class="producto-informacion">
                <h3 class="producto-titulo">${producto.nombre}</h3>
                <p class="producto-precio">${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>`

        contenedorProductos.append(div);
    });

    escucharBotones();

}

displayProductos(productos);

function escucharBotones() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if(productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumeroCarrito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

        Toastify({
        text: "Producto agregado al carrito",
        duration: 3000,
        newWindow: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            color: "black",
            background: "rgb(255, 186, 102)",
            borderRadius: "1rem",
            fontWeight: 500,
            textTransform: "uppercase"
        },
        offset: {
            x: "2rem",
            y: "2rem"
        },
        onClick: function(){}
    }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id == idBoton)
    
    if(productosEnCarrito.some(producto => producto.id == idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id == idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumeroCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumeroCarrito() {
    let nuevoNumero = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numero.innerText = nuevoNumero;
}