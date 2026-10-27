
const fotos = document.querySelectorAll(".grade-imagens .foto img");

const visualizador = document.getElementById("visualizador");
const imagemAmpliada = document.getElementById("imagemAmpliada");
const fechar = document.getElementById("fecharVisualizador");
const anterior = document.getElementById("imagemAnterior");
const proxima = document.getElementById("proximaImagem");
const contador = document.getElementById("contadorImagem");

let indiceAtual = 0;
let zoom = 1;

function aplicarZoom() {
    imagemAmpliada.style.transform = `scale(${zoom})`;
}

function alterarZoom(valor) {
    zoom = Math.max(0.5, Math.min(4, zoom + valor));
    aplicarZoom();
}

function mostrarImagem(indice) {
    if (fotos.length === 0) return;

    indiceAtual = (indice + fotos.length) % fotos.length;
    zoom = 1;

    imagemAmpliada.src = fotos[indiceAtual].src;
    imagemAmpliada.alt = fotos[indiceAtual].alt;
    imagemAmpliada.style.transform = "scale(1)";
    contador.textContent = `${indiceAtual + 1} / ${fotos.length}`;
}

function abrirImagem(indice) {
    mostrarImagem(indice);
    visualizador.classList.add("ativo");
}

function fecharImagem() {
    visualizador.classList.remove("ativo");
    zoom = 1;
    aplicarZoom();
}

fotos.forEach((foto, indice) => {
    foto.style.cursor = "zoom-in";
    foto.addEventListener("click", () => abrirImagem(indice));
});

fechar.addEventListener("click", fecharImagem);

anterior.addEventListener("click", () => {
    mostrarImagem(indiceAtual - 1);
});

proxima.addEventListener("click", () => {
    mostrarImagem(indiceAtual + 1);
});

// Botões de zoom
const controlesZoom = document.createElement("div");
controlesZoom.className = "controles-zoom";
controlesZoom.innerHTML = `
    <button type="button" id="diminuirZoom" aria-label="Diminuir zoom">−</button>
    <button type="button" id="aumentarZoom" aria-label="Aumentar zoom">+</button>
    <button type="button" id="resetarZoom">Redefinir</button>
`;
visualizador.appendChild(controlesZoom);

document.getElementById("aumentarZoom").addEventListener("click", () => {
    alterarZoom(0.25);
});

document.getElementById("diminuirZoom").addEventListener("click", () => {
    alterarZoom(-0.25);
});

document.getElementById("resetarZoom").addEventListener("click", () => {
    zoom = 1;
    aplicarZoom();
});

// Zoom pela rodinha do mouse
visualizador.addEventListener("wheel", (evento) => {
    if (!visualizador.classList.contains("ativo")) return;

    evento.preventDefault();
    alterarZoom(evento.deltaY < 0 ? 0.2 : -0.2);
}, { passive: false });

visualizador.addEventListener("click", (evento) => {
    if (evento.target === visualizador) fecharImagem();
});

document.addEventListener("keydown", (evento) => {
    if (!visualizador.classList.contains("ativo")) return;

    if (evento.key === "Escape") fecharImagem();
    if (evento.key === "ArrowLeft") mostrarImagem(indiceAtual - 1);
    if (evento.key === "ArrowRight") mostrarImagem(indiceAtual + 1);
    if (evento.key === "+" || evento.key === "=") alterarZoom(0.25);
    if (evento.key === "-") alterarZoom(-0.25);
});
