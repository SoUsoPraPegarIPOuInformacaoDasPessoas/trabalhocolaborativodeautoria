
const fotos = document.querySelectorAll(".grade-imagens .foto img");

const visualizador = document.getElementById("visualizador");
const imagemAmpliada = document.getElementById("imagemAmpliada");
const fechar = document.getElementById("fecharVisualizador");
const anterior = document.getElementById("imagemAnterior");
const proxima = document.getElementById("proximaImagem");
const contador = document.getElementById("contadorImagem");

let indiceAtual = 0;

function mostrarImagem(indice) {
    if (indice < 0) {
        indice = fotos.length - 1;
    }

    if (indice >= fotos.length) {
        indice = 0;
    }

    indiceAtual = indice;

    imagemAmpliada.src = fotos[indiceAtual].src;
    imagemAmpliada.alt = fotos[indiceAtual].alt || "Imagem ampliada";

    contador.textContent =
        `${indiceAtual + 1} / ${fotos.length}`;
}

fotos.forEach((foto, indice) => {
    foto.addEventListener("click", () => {
        mostrarImagem(indice);
        visualizador.classList.add("ativo");
    });
});

fechar.addEventListener("click", () => {
    visualizador.classList.remove("ativo");
});

anterior.addEventListener("click", () => {
    mostrarImagem(indiceAtual - 1);
});

proxima.addEventListener("click", () => {
    mostrarImagem(indiceAtual + 1);
});

visualizador.addEventListener("click", (evento) => {
    if (evento.target === visualizador) {
        visualizador.classList.remove("ativo");
    }
});

document.addEventListener("keydown", (evento) => {
    if (!visualizador.classList.contains("ativo")) {
        return;
    }

    if (evento.key === "Escape") {
        visualizador.classList.remove("ativo");
    }

    if (evento.key === "ArrowLeft") {
        mostrarImagem(indiceAtual - 1);
    }

    if (evento.key === "ArrowRight") {
        mostrarImagem(indiceAtual + 1);
    }
});
