/*Joao Gabriel M. trindade -01351496 */
function eliminarRecursaoEsquerdaDireta(gramatica) {
    for (let naoTerminal in gramatica) {
      let regras = gramatica[naoTerminal];
      let novasRegras = [];
      let recursao = [];
      for (let regra of regras) {
        if (regra[0] === naoTerminal) {
          recursao.push(regra.slice(1));
        } else {
          novasRegras.push(regra);
        }
      }
      if (recursao.length > 0) {
        let novoNaoTerminal = naoTerminal + "'";
        novasRegras.push(novoNaoTerminal);
        for (let regra of recursao) {
          novasRegras.push(regra + novoNaoTerminal);
        }
        gramatica[novoNaoTerminal] = recursao;
      }
      gramatica[naoTerminal] = novasRegras;
    }
  }
  
  function eliminarRecursaoEsquerdaIndireta(gramatica) {
    let naoTerminais = Object.keys(gramatica);
    for (let i = 0; i < naoTerminais.length; i++) {
      for (let j = 0; j < i; j++) {
        let A = naoTerminais[i];
        let B = naoTerminais[j];
        let regrasA = gramatica[A];
        let regrasB = gramatica[B];
        let novasRegras = [];
        for (let regraA of regrasA) {
          if (regraA[0] === B) {
            for (let regraB of regrasB) {
              novasRegras.push(regraB + regraA.slice(1));
            }
          } else {
            novasRegras.push(regraA);
          }
        }
        gramatica[A] = novasRegras;
      }
    }
  }
  
  function converterRegrasUnitarias(gramatica) {
    for (let naoTerminal in gramatica) {
      let regras = gramatica[naoTerminal];
      let novasRegras = [];
      let regrasUnitarias = [];
      for (let regra of regras) {
        if (regra.length === 1 && gramatica[regra[0]]) {
          regrasUnitarias.push([naoTerminal, regra[0]]);
        } else {
          novasRegras.push(regra);
        }
      }
      while (regrasUnitarias.length > 0) {
        let [A, B] = regrasUnitarias.pop();
        for (let regra of gramatica[B]) {
          if (regra.length === 1 && gramatica[regra[0]]) {
            regrasUnitarias.push([A, regra[0]]);
          } else {
            novasRegras.push(regra);
          }
        }
      }
      gramatica[naoTerminal] = novasRegras;
    }
  }
  
  function converterParaFormaNormal(gramatica) {
    eliminarRecursaoEsquerdaDireta(gramatica);
    eliminarRecursaoEsquerdaIndireta(gramatica);
    converterRegrasUnitarias(gramatica);
  }
  
  // Exemplo de gramática
  let gramatica = {
    'S': ['aAd', 'A'],
    'A': ['Bc', ''],
    'B': ['Aca']
  };
  
  converterParaFormaNormal(gramatica);
  
  // Imprime a gramática na forma normal de Greibach
  for (let naoTerminal in gramatica) {
    for (let regra of gramatica[naoTerminal]) {
        console.log(`${naoTerminal} -> ${regra}`);
    }
  }