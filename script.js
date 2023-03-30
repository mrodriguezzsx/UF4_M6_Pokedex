function search() {
    var xhr = new XMLHttpRequest();
    let url = "https://pokeapi.co/api/v2/pokemon/";

    let busquedaPokemon = document.getElementById('busquedaPokemon').value;
    if (busquedaPokemon > 1010) {
        alert('NUMERO INVALIDO!')
    } else {
        xhr.open("GET", url + busquedaPokemon);
        xhr.send(null);
    }

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            document.getElementById('tiposPokemon').replaceChildren();
            document.getElementById('busquedaPokemon').value = "";
            let pokedex = JSON.parse(this.responseText);
            document.getElementById('spritePokemon').src = pokedex.sprites.other["official-artwork"].front_default;
            document.getElementById('nombrePokemon').innerText = pokedex.name;
            document.getElementById('numeroPokemon').innerText = formatID(parseInt(pokedex.id)) + pokedex.id;
            for (let n = 0; n < pokedex.types.length; n++) {
                let listaTipos = document.createElement("li");
                let tipos = document.createTextNode(pokedex.types[n].type.name)
                listaTipos.appendChild(tipos);
                document.getElementById('tiposPokemon').appendChild(listaTipos);
            }

            document.getElementById('shiny').onclick = () => transformShiny(pokedex);
        }
    });
}

function formatID(number) {
    if (number < 10) {
        return "#00";
    } else if (number < 100) {
        return "#0";
    } return "#";
}

document.getElementById('formulario').addEventListener('submit', function (e) {
    e.preventDefault();
    search();
    document.getElementById('shiny').style.display = "block"
});

function transformShiny(pokedex) {
    document.getElementById('spritePokemon').src = pokedex.sprites.other["official-artwork"].front_shiny;
}


