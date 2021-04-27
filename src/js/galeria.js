document.addEventListener('DOMContentLoaded', function () {
    crearGaleria();
});

function crearGaleria () {
    const galeria = document.querySelector(".galeria-imagenes");

    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement('IMG');
        imagen.src = `build/img/thumb/${i}.webp`;
        imagen.dataset.imagenId = i;

        imagen.onclick = mostrarImagen;

        const lista = document.createElement('LI');
        lista.appendChild(imagen);

        galeria.appendChild(lista);
    };
};

function mostrarImagen (e) {
    const id = parseInt(e.target.dataset.imagenId);

    const imagen = document.createElement('IMG');
    imagen.src = `build/img/grande/${id}.webp`;

    const cerrarImagen = document.createElement('P');
    cerrarImagen.textContent = "x";
    cerrarImagen.classList.add('boton-cerrar');

    cerrarImagen.onclick = function () {
        overlay.remove();
        body.classList.remove('fijar-body')
    };

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.appendChild(cerrarImagen);
    overlay.classList.add('overlay');

    overlay.onclick = function () {
        overlay.remove();
        body.classList.remove('fijar-body')
    };

    const body = document.querySelector('body');
    body.appendChild(overlay);

    body.classList.add('fijar-body')
};