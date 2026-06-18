// - Variáveis
// - Operadores
// - Laços de repetição
// - Estruturas de decisões
// - Funções

// ## Objetivo:
//
// Crie uma função que recebe como parâmetro a quantidade de vitórias e derrotas de um jogador,
// depois disso retorne o resultado para uma variável, o saldo de Rankeadas deve ser feito através do calculo (vitórias - derrotas)
//
// Se vitórias for menor do que 10 = Ferro
// Se vitórias for entre 11 e 20 = Bronze
// Se vitórias for entre 21 e 50 = Prata
// Se vitórias for entre 51 e 80 = Ouro
// Se vitórias for entre 81 e 90 = Diamante
// Se vitórias for entre 91 e 100= Lendário
// Se vitórias for maior ou igual a 101 = Imortal

// ## Saída
//
// Ao final deve se exibir uma mensagem:
// "O Herói tem de saldo de **{saldoVitorias}** está no nível de **{nivel}**"

const RANKS = ['Ferro', 'Bronze', 'Prata', 'Ouro', 'Diamante', 'Lendário', 'Imortal', 'Radiante'];

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calcularSaldo(vitorias, derrotas) {
  return vitorias - derrotas;
}

function determinarNivel(saldo) {
  if (saldo < 10) return 'Ferro';
  if (saldo <= 20) return 'Bronze';
  if (saldo <= 50) return 'Prata';
  if (saldo <= 80) return 'Ouro';
  if (saldo <= 90) return 'Diamante';
  if (saldo <= 100) return 'Lendário';
  if (saldo <= 200) return 'Imortal';
  return 'Radiante';
}

function formatarSaldo(valor) {
  return Math.abs(valor);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function criarJogosComResultados(vitorias, derrotas) {
  const jogos = [];
  for (let i = 0; i < vitorias; i += 1) {
    jogos.push('Vitória');
  }
  for (let i = 0; i < derrotas; i += 1) {
    jogos.push('Derrota');
  }
  shuffleArray(jogos);
  return jogos;
}

function relatarProgresso(jogos) {
  let vitorias = 0;
  let derrotas = 0;
  let saldo = 0;
  let nivelAnterior = determinarNivel(saldo);

  console.log(`Número de jogos: ${jogos.length}`);

  jogos.forEach((resultado, index) => {
    if (resultado === 'Vitória') {
      vitorias += 1;
    } else {
      derrotas += 1;
    }

    saldo = calcularSaldo(vitorias, derrotas);
    const nivelAtual = determinarNivel(saldo);

    if (nivelAtual !== nivelAnterior) {
      const nivelAnteriorIndex = RANKS.indexOf(nivelAnterior);
      const nivelAtualIndex = RANKS.indexOf(nivelAtual);
      const mensagemBase = `Rank atualizado após partida ${index + 1}: ${nivelAtual}`;

      if (nivelAtualIndex < nivelAnteriorIndex) {
        console.log(`${mensagemBase} - O ping tava alto && crashou no meio das partidas`);
      } else {
        console.log(`${mensagemBase}`);
      }

      console.log(`Saldo de vitórias agora: ${formatarSaldo(saldo)}`);
      nivelAnterior = nivelAtual;
    }
  });

  return {
    numeroDeJogos: jogos.length,
    vitorias,
    derrotas,
    saldo,
    nivel: determinarNivel(saldo),
  };
}

function garantirRankRadiante(progresso) {
  let extraWins = 0;

  while (progresso.nivel !== 'Radiante') {
    extraWins += 1;
    progresso.vitorias += 1;
    progresso.saldo = calcularSaldo(progresso.vitorias, progresso.derrotas);
    const novoNivel = determinarNivel(progresso.saldo);

    if (novoNivel !== progresso.nivel) {
      console.log(`Rank atualizado após vitória extra: ${novoNivel}`);
      console.log(`Saldo de vitórias agora: ${formatarSaldo(progresso.saldo)}`);
      progresso.nivel = novoNivel;
    }
  }

  return extraWins;
}

const vitoriasIniciais = randomNumber(1, 300);
const derrotasIniciais = randomNumber(0, 200);
const jogos = criarJogosComResultados(vitoriasIniciais, derrotasIniciais);
const jogosInfo = {
  quantidade: jogos.length,
  resultados: jogos,
};

const progresso = relatarProgresso(jogos);
const jogosExtras = garantirRankRadiante(progresso);
const totalJogos = jogosInfo.quantidade + jogosExtras;

console.log('--- Resultado final ---');
console.log(`Número total de jogos: ${totalJogos}`);
console.log(`Vitórias: ${progresso.vitorias}`);
console.log(`Derrotas: ${progresso.derrotas}`);
console.log(`Saldo de vitórias: ${formatarSaldo(progresso.saldo)}`);
console.log(`Rank final: ${progresso.nivel}`);
console.log(`Jogos simulados: ${jogosInfo.quantidade}`);
console.log(`Resultados dos jogos: ${progresso.vitorias} vitórias e ${progresso.derrotas} derrotas`);
if (jogosExtras > 0) {
  console.log(`Vitórias extras para alcançar Radiante: ${jogosExtras}`);
}
