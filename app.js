// Seleccionar Elementos del DOM
const botonesAdquirir = document.querySelectorAll('.btn-adquirir');
const modalAdquirir = document.getElementById('modal-adquirir');
const modalExito = document.getElementById('modal-exito');
const formAdquirir = document.getElementById('form-adquirir');

// Elementos de texto dentro del modal
const textoPlan = document.getElementById('plan-seleccionado-txt');
const inputPlanOculto = document.getElementById('input-plan');

// Botones para cerrar los modales
const btnCerrarModal = document.getElementById('close-modal');
const btnCerrarExito = document.getElementById('close-exito');
const btnEntendido = document.getElementById('btn-entendido');

// 1. Abrir Modal de Formulario al hacer clic en "Adquirir" en cualquier tarjeta
botonesAdquirir.forEach(boton => {
    boton.addEventListener('click', (e) => {
        // Obtener qué plan se seleccionó leyendo el atributo data-plan
        const planElegido = e.target.getAttribute('data-plan');
        
        // Mostrar el plan en la interfaz y guardarlo oculto para el envío
        textoPlan.textContent = "PLAN " + planElegido.toUpperCase();
        inputPlanOculto.value = planElegido;
        
        // Hacer visible el modal
        modalAdquirir.style.display = 'flex';
    });
});

// 2. Manejar el envío del formulario
formAdquirir.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitar que la página recargue al enviar el formulario

    // Recoger los datos que el usuario escribió
    const nombre = document.getElementById('nombre').value;
    const documento = document.getElementById('documento').value;
    const plan = inputPlanOculto.value;

    // --- CONFIGURACIÓN DE WHATSAPP ---
    // Coloca aquí el número de teléfono del gimnasio
    const numeroGimnasio = "573200000000"; 
    
    // Crear el mensaje formateado
    const mensajeOriginal = `Hola equipo de IronMan Gym! 💪\n\nQuiero registrarme.\n*Mi nombre:* ${nombre}\n*Documento:* ${documento}\n*Plan elegido:* ${plan}\n\nMe acercaré a la sede para finalizar el pago.`;
    
    // Codificar el texto para que los espacios y saltos de línea funcionen en la URL
    const mensajeCodificado = encodeURIComponent(mensajeOriginal);
    const linkWhatsapp = `https://wa.me/${numeroGimnasio}?text=${mensajeCodificado}`;

    // Cambiar la vista: Ocultar formulario, mostrar éxito
    modalAdquirir.style.display = 'none';
    modalExito.style.display = 'flex';

    // Abrir la API de WhatsApp en una pestaña nueva
    window.open(linkWhatsapp, '_blank');
    
    // Limpiar los campos del formulario para el siguiente uso
    formAdquirir.reset();
});

// 3. Funciones para cerrar las ventanas (Modales)
btnCerrarModal.addEventListener('click', () => modalAdquirir.style.display = 'none');
btnCerrarExito.addEventListener('click', () => modalExito.style.display = 'none');
btnEntendido.addEventListener('click', () => modalExito.style.display = 'none');

// Cerrar el modal si el usuario hace clic afuera de la ventana de contenido
window.addEventListener('click', (evento) => {
    if (evento.target === modalAdquirir) modalAdquirir.style.display = 'none';
    if (evento.target === modalExito) modalExito.style.display = 'none';
});