const palavras = {
  informatica: ["mouse", "teclado", "janela", "navegador", "cursor"],
  redes: ["roteador", "servidor", "switch", "modem", "firewall"],
  hardware: ["processador", "placa", "memoria", "gabinete", "cooler"]
};

let palavraSelecionada = "";
let letrasCorretas = [];
let letrasErradas = [];
let erros = 0;
let pontuacao = 0;
let tempo = 60;
let cronometroId;

const palavraElemento = document.getElementById("palavra");
const letrasElemento = document.getElementById("letras");
const mensagem = document.getElementById("mensagem");
const pontuacaoElemento = document.getElementById("pontuacao");
const cronometroElemento = document.getElementById("cronometro");
const canvas = document.getElementById("forcaCanvas");
const ctx = canvas.getContext("2d");

function iniciarJogo() {
  const categoria = document.getElementById("categoria").value;
  const palavrasDaCategoria = palavras[categoria];
  palavraSelecionada = palavrasDaCategoria[Math.floor(Math.random() * palavrasDaCategoria.length)];
  letrasCorretas = [];
  letrasErradas = [];
  erros = 0;
  tempo = 60;
  atualizarTela();
  document.querySelector("#jogo").classList.remove("escondido");
  document.querySelector(".menu").classList.add("escondido");
  cronometroId = setInterval(atualizarTempo, 1000);
  desenharForca();
}

function atualizarTela() {
  palavraElemento.textContent = palavraSelecionada
    .split("")
    .map(letra => (letrasCorretas.includes(letra) ? letra : "_"))
    .join(" ");

  letrasElemento.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    const letra = String.fromCharCode(i).toLowerCase();
    const botao = document.createElement("button");
    botao.textContent = letra;
    botao.disabled = letrasCorretas.includes(letra) || letrasErradas.includes(letra);
    botao.onclick = () => verificarLetra(letra);
    letrasElemento.appendChild(botao);
  }
}

function verificarLetra(letra) {
  if (palavraSelecionada.includes(letra)) {
    letrasCorretas.push(letra);
    pontuacao += 10;
  } else {
    letrasErradas.push(letra);
    erros++;
    pontuacao -= 5;
  }

  atualizarTela();
  pontuacaoElemento.textContent = pontuacao;
  desenharForca();

  if (!palavraElemento.textContent.includes("_")) {
    mensagem.textContent = "Você venceu!";
    finalizarJogo();
  } else if (erros >= 6) {
    mensagem.textContent = "Você perdeu! A palavra era: " + palavraSelecionada;
    finalizarJogo();
  }
}

function atualizarTempo() {
  tempo--;
  cronometroElemento.textContent = tempo;
  if (tempo <= 0) {
    mensagem.textContent = "Tempo esgotado!";
    finalizarJogo();
  }
}

function finalizarJogo() {
  clearInterval(cronometroId);
  letrasElemento.querySelectorAll("button").forEach(btn => btn.disabled = true);
}

function reiniciarJogo() {
  location.reload();
}

function desenharForca() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#333";

  // base
  ctx.beginPath();
  ctx.moveTo(10, 180);
  ctx.lineTo(190, 180);
  ctx.stroke();

  // poste
  ctx.beginPath();
  ctx.moveTo(50, 180);
  ctx.lineTo(50, 20);
  ctx.lineTo(150, 20);
  ctx.lineTo(150, 40);
  ctx.stroke();

  if (erros > 0) {
    // cabeça
    ctx.beginPath();
    ctx.arc(150, 50, 10, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (erros > 1) {
    // corpo
    ctx.beginPath();
    ctx.moveTo(150, 60);
    ctx.lineTo(150, 100);
    ctx.stroke();
  }
  if (erros > 2) {
    // braço esquerdo
    ctx.beginPath();
    ctx.moveTo(150, 70);
    ctx.lineTo(130, 90);
    ctx.stroke();
  }
  if (erros > 3) {
    // braço direito
    ctx.beginPath();
    ctx.moveTo(150, 70);
    ctx.lineTo(170, 90);
    ctx.stroke();
  }
  if (erros > 4) {
    // perna esquerda
    ctx.beginPath();
    ctx.moveTo(150, 100);
    ctx.lineTo(130, 130);
    ctx.stroke();
  }
  if (erros > 5) {
    // perna direita
    ctx.beginPath();
    ctx.moveTo(150, 100);
    ctx.lineTo(170, 130);
    ctx.stroke();
  }
  }
