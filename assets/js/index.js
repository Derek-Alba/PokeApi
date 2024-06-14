
/* boton e input */
const btnTarea = document.querySelector('#btnTarea')
const creaTarea = document.querySelector('#creaTarea')


//Evento para capturar el valor del input
let value = ''

creaTarea.addEventListener('change', (e) => {
    value = e.target.value
})

//Crea la tarea
let contador = 0
const crearTareita = () => {

    if (value === '') {
        alert("ingrese texto en el input")
    }
    else {
        contador++
        const div = `
        <div id="padre-${contador}" class="card fondo"> 
            <div class="mt-3">
                <div  class= "form-check container-padre__input d-flex  ">
                    <button id="text-${contador}" class=" check-input"><i class="bi bi-check-circle-fill"></i>
                    </button>
                    <label class="form-check-label" for="defaultCheck1 ">
                        <p class= "parrafo-tarea"id="parrafo-${contador}"> ${value} </p>
                    </label>                 
                    <div>
                        <button id="btnDelete-${contador}" class="color-boton__eliminar"><i class="bi bi-trash-fill"></i>
                        </button>
                    </div> 
                </div> 
            </div> 
        </div>`

        const tareas = document.querySelector('#tareas')
        tareas.insertAdjacentHTML('afterbegin', div)
        //Evento de tachado
        const containerPadre = document.querySelector(`#padre-${contador}`)
        const tareaDos = document.querySelector(`#text-${contador}`)
        const textoDos = document.querySelector(`#parrafo-${contador}`)
        tareaDos.addEventListener('click', () => {
            textoDos.classList.toggle('text-decoration-line-through')
            btnDelete.classList.toggle('color-button__delete')
        })
        //Evento para eliminar
        const btnDelete = document.querySelector(`#btnDelete-${contador}`)
        btnDelete.addEventListener('click', () => {
            containerPadre.remove()
        })
        const tareaDosCheck = document.querySelector('.form-check')
        tareaDosCheck.addEventListener('click', () => {
            tareaDosCheck.classList.toggle('clickCheck')
        })

        //eliminar contenido del input
        creaTarea.value = ''
        value = ''
    }
}
btnTarea.addEventListener('click', crearTareita)



















































































