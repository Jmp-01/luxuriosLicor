// Función para actualizar el carrito en la página de productos
function actualizarCarrito() {
    const carritoDiv = document.getElementById('carrito');
    carritoDiv.innerHTML = ''; // Limpiar el carrito antes de actualizar

    // Recuperar el carrito desde el localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (carrito.length === 0) {
        carritoDiv.innerHTML = '<p>No hay productos en el carrito.</p>';
    } else {
        carrito.forEach(function(producto) {
            carritoDiv.innerHTML += `
                <div class="producto">
                    <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px;">
                    <h3>${producto.nombre}</h3>
                    <p>$${producto.precio}</p>
                </div>
            `;
        });
    }
}

// Función para añadir un producto al carrito
document.addEventListener('DOMContentLoaded', function() {
    // En la página principal (index.html)
    const botones = document.querySelectorAll('.agregar-carrito');
    
    botones.forEach(function(boton) {
        boton.addEventListener('click', function() {
            const producto = {
                nombre: this.parentElement.querySelector('h3').textContent,
                precio: parseFloat(this.parentElement.querySelector('p').textContent.replace('$', '')),
                imagen: this.parentElement.querySelector('img').src // Aquí obtenemos la ruta de la imagen
            };

            // Obtener carrito del localStorage o inicializarlo vacío
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

            // Añadir el nuevo producto al carrito
            carrito.push(producto);

            // Guardar el carrito actualizado en localStorage
            localStorage.setItem('carrito', JSON.stringify(carrito));

            alert('Producto añadido al carrito');
        });
    });

    // Función para vaciar el carrito en la página de productos
    const botonVaciar = document.getElementById('vaciar-carrito');
    if (botonVaciar) {
        botonVaciar.addEventListener('click', function() {
            // Vaciar el carrito del localStorage
            localStorage.removeItem('carrito');
            actualizarCarrito(); // Actualizar la vista del carrito
            alert('Carrito vacío');
        });
    }

    // Actualizar carrito en la página de productos
    if (document.getElementById('carrito')) {
        actualizarCarrito();
    }
});
