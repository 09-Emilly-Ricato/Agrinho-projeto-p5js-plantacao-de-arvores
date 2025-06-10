// Definindo variáveis globais
let jardineiro;
let plantas = [];
let temperatura = 30; // Temperatura inicial
let totalArvores = 0;

function setup() {
  createCanvas(600, 400);
  jardineiro = new Jardineiro(width / 2, height - 50);
}

function draw() {
  // Usando map() para ajustar a cor de fundo de forma mais controlada
  let corFundo = lerpColor(color(217, 112, 26), color(219, 239, 208),
    map(totalArvores, 0, 100, 0, 1));

  background(corFundo);

  // Mostrar informações na tela
  mostrarInformacoes();

  // Aumenta a temperatura gradualmente (um pouco para balancear)
  temperatura += 0.05;

  // Atualiza a posição e desenha o jardineiro
  jardineiro.atualizar();
  jardineiro.mostrar();

  // Desenha as árvores plantadas
  plantas.forEach((arvore) => arvore.mostrar());

  // Verifica se o jogo acabou por calor ou por resfriamento
  verificarFimDeJogo();
}

// Função para mostrar as informações na tela
function mostrarInformacoes() {
  textSize(16);
  fill(0);
  text("Temperatura: " + temperatura.toFixed(2), 20, 30);
  text("Árvores plantadas: " + totalArvores, 20, 60);
}

// Função para verificar se o jogo terminou
function verificarFimDeJogo() {
  // Se a temperatura atingir 50 ou mais, o jogo termina por calor
  if (temperatura >= 50) {
    textSize(32);
    fill(255, 0, 0);
    text("Você perdeu! Muito calor!", 50, height / 2);
    noLoop(); // Para o jogo
  }
  // Se a temperatura atingir 0 ou menos, o jogo termina por resfriamento
  else if (temperatura <= 0) {
    textSize(32);
    fill(0, 255, 0);
    text("Você resfriou a área! O jogo terminou!", 50, height / 2);
    noLoop(); // Para o jogo
  }
}

// Função que será chamada quando pressionar a barra de espaço para plantar árvore
function keyPressed() {
  if (key === ' ') {
    plantas.push(new Arvore(jardineiro.x, jardineiro.y));
    totalArvores++; // Aumenta o número de árvores plantadas
    // A cada árvore plantada, a temperatura diminui mais rapidamente
    temperatura -= map(totalArvores, 0, 100, 1, 5); // A temperatura diminui mais com mais árvores
  }
}

// Classe para o Jardineiro
class Jardineiro {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocidade = 4;
  }

  // Função para atualizar a posição do jardineiro
  atualizar() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.velocidade;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.velocidade;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.velocidade;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.velocidade;
    }
  }

  // Função para desenhar o jardineiro (emoji)
  mostrar() {
    textSize(32);
    text("🧑‍🌾", this.x - 15, this.y + 15); // Emoji de jardineiro
  }
}

// Classe para as Árvores
class Arvore {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // Função para desenhar a árvore (emoji)
  mostrar() {
    textSize(32);
    text("🌳", this.x - 15, this.y + 15); // Emoji de árvore
  }
}
