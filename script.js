const areasContainer = document.getElementById('areas');
const progresoGlobal = document.getElementById('progresoGlobal');

function crearArea() {
    const nombre = document.getElementById('nombreArea').value.trim();
    if(nombre === "") {
        alert("Ponle un nombre al área 😉");
        return;
    }

    const area = document.createElement('div');
    area.className = 'area';

    area.innerHTML = `
        <h2>${nombre}</h2>
        <div class="progreso">
            <div class="barra"></div>
            <div class="porcentaje">10%</div>
        </div>
        <div class="tareas"></div>
        <input type="text" placeholder="Nueva tarea">
        <button class="agregar">Agregar Tarea</button>
    `;

    areasContainer.appendChild(area);

    const tareasDiv = area.querySelector('.tareas');
    const inputTarea = area.querySelector('input[type="text"]');
    const botonAgregar = area.querySelector('.agregar');
    const barra = area.querySelector('.barra');
    const porcentajeTexto = area.querySelector('.porcentaje');

    botonAgregar.addEventListener('click', () => {
        if(inputTarea.value.trim() === "") {
            alert("Escribe una tarea 💖");
            return;
        }

        const tarea = document.createElement('div');
        tarea.className = 'tarea';
        tarea.innerText = "☐ " + inputTarea.value;
        tareasDiv.appendChild(tarea);

        tarea.addEventListener('click', () => {
            tarea.classList.toggle('tachada');
            actualizarProgreso();
            actualizarGlobal();
        });

        tarea.addEventListener('dblclick', () => {
            const textoActual = tarea.innerText.replace("☐ ", "").replace("☑ ", "");
            const nuevoTexto = prompt("Edita la tarea:", textoActual);
            if(nuevoTexto) {
                tarea.innerText = "☐ " + nuevoTexto;
                tarea.addEventListener('click', () => {
                    tarea.classList.toggle('tachada');
                    actualizarProgreso();
                    actualizarGlobal();
                });
            }
        });

        tarea.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            tarea.remove();
            actualizarProgreso();
            actualizarGlobal();
        });

        inputTarea.value = "";
        actualizarProgreso();
        actualizarGlobal();
    });

    function actualizarProgreso() {
        const total = tareasDiv.querySelectorAll('.tarea').length;
        const hechas = tareasDiv.querySelectorAll('.tarea.tachada').length;
        let porcentaje = total === 0 ? 0 : Math.round((hechas / total) * 100);
        porcentaje = Math.max(10, porcentaje);

        barra.style.width = porcentaje + "%";

        if(porcentaje >= 100) {
            porcentajeTexto.innerHTML = "✔️ Logrado";
            mostrarMensajeLogro(nombre);
        } else {
            porcentajeTexto.innerHTML = porcentaje + "%";
        }
    }
}

function mostrarMensajeLogro(area) {
    const mensaje = document.createElement('div');
    mensaje.className = 'mensaje-logro';
    mensaje.innerHTML = `🎉 ¡Lograste el área <strong>${area}</strong> al 100%! ✔️`;

    document.body.appendChild(mensaje);

    setTimeout(() => {
        mensaje.remove();
    }, 3000);
}

function actualizarGlobal() {
    const tareas = document.querySelectorAll('.tarea');
    const hechas = document.querySelectorAll('.tarea.tachada');

    let porcentajeGlobal = tareas.length === 0 ? 0 : Math.round((hechas.length / tareas.length) * 100);
    porcentajeGlobal = Math.max(10, porcentajeGlobal);

    if (porcentajeGlobal >= 100) {
        progresoGlobal.innerHTML = `🎯 <strong>100% Logrado en todo ✔️</strong>`;
    } else {
        progresoGlobal.innerHTML = `Progreso total: <strong>${porcentajeGlobal}%</strong>`;
    }
}
