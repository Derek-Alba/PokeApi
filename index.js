let contenedor = document.querySelector('#contenedor')
const selectTypes = document.querySelector('#typeOptions')

const cargarPokemones = (selectValue) => {
    const pokemones = fetch('https://pokeapi.co/api/v2/pokemon')
    let pokes = []
    let habilidadesText = ''
    let columnas = ''
    let contador = 0
    let filas = ''

    pokemones
        .then((response) => (response.json()))
        .then((data) => {
            pokes = data.results
            pokes.forEach(pokemon => {
                let habilidades = fetch(pokemon.url)
                habilidades.then((respuesta) => respuesta.json())
                    .then((minidata) => {
                        let abilities = minidata.abilities
                        let imgPokes = minidata.sprites.other.dream_world.front_default
                        let gifPokes = minidata.sprites.versions['generation-v']['black-white'].animated.front_default
                        abilities.forEach(item => {
                            habilidadesText += item.ability.name + ', '
                        })

                        habilidadesText = habilidadesText.slice(0, habilidadesText.length - 2)
                        contador = contador + 1

                        if (minidata.types.find((item) => item.type.name == selectValue) || selectValue == undefined) {
                            columnas += `
                            <div style='width: 18rem'>
                                <div style='width; 17rem; height: 19rem' class="card d-flex align-items-center">
                                    <p class="nombrePokemon"> ${pokemon.name} </p>
                                         <img style='width: 140px; height: 120px;' src="${imgPokes}"> </img>
                                         <img style='width: 40px;' src='${gifPokes}'> </img>
                                        <p style='height: 10px;' class='habilidadesPokemon'> Habilidades: ${habilidadesText} </p>
                                        <button type="button" class="mt-4 btn  boton"><a class=' text-dark' href='${pokemon.url}'> Detalles </a></button>
                                </div>
                            </div>`
                        } if (contador == pokes.length && columnas != '') {
                            filas = `
                                <div class='row'>
                                    ${columnas}
                                </div>`
                            contenedor.replaceChildren('')
                            contenedor.insertAdjacentHTML('afterbegin', filas)
                        }

                        else if (contador == 20 && columnas == '') {
                            columnas = `
                                <div class='col-12 datosText '>
                                     Sin Coicidencias
                                </div>`
                            contenedor.replaceChildren('')
                            contenedor.insertAdjacentHTML('afterbegin', columnas)
                        }
                        habilidadesText = ''
                    })
            });
        })
        .catch((error) => console.log(error))
}

//logca para obtener todas las especies

const types = fetch('https://pokeapi.co/api/v2/type/')
types.then((response) => response.json())
    .then((datos) => {
        let tipos = datos.results
        tipos.forEach((tipo) => {
            selectTypes.insertAdjacentHTML('afterbegin', `<option value=${tipo.name}> ${tipo.name}</option>`)
        })
    })
selectTypes.addEventListener('change', (e) => {
    cargarPokemones(e.target.value)
    if (e.target.value == "filtro"){
        cargarPokemones ()
    }
})
cargarPokemones()

