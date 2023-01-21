const criaJogo = function(sprite) {

  let palavraSecreta = '';
  let lacunas = [];
  let etapa = 1;

  const ganhou = function() {

      return lacunas.length 
          ? !lacunas.some(function(lacuna) {
              return lacuna == '';
          })
          : false;
  };

  const perdeu = function() {

      return sprite.isFinished();
  };

  const ganhouOuPerdeu = function() {

      return ganhou() || perdeu();
  };

  const reinicia = function() {

      etapa = 1;
      lacunas = [];
      palavraSecreta = '';
      sprite.reset();
  };

  const processaChute = function(chute) {
    if(!chute.trim()) throw Error('Chute inválido')
    const exp = new RegExp(chute, 'gi');
       let resultado, acertou = false;
    
    while(resultado = exp.exec(palavraSecreta)) {

        acertou = lacunas[resultado.index] = chute;
    }

    if(!acertou) sprite.nextFrame();
  };

  const criaLacunas = function() {

    lacunas = Array(palavraSecreta.length).fill('');

      // for(const i = 0; i < palavraSecreta.length; i++) {
      //     lacunas.push('');
      // }
  };

  const proximaEtapa = function() {

      etapa = 2;
  };

  const setPalavraSecreta = function(palavra) {
    if(!palavra.trim()) throw Error('Palavra secreta inválida')
    palavraSecreta = palavra;
    criaLacunas();
    proximaEtapa();
  };

  const getLacunas = function () {

      return lacunas;
  };

  const getEtapa = function () {

      return etapa;
  };

  return {

      setPalavraSecreta: setPalavraSecreta, 
      getLacunas: getLacunas,
      getEtapa: getEtapa, 
      processaChute: processaChute,
      ganhou: ganhou, 
      perdeu: perdeu,
      ganhouOuPerdeu: ganhouOuPerdeu, 
      reinicia: reinicia
  };
};