const criaController = function (jogo) {

  const $entrada = $('.entrada');
  const $lacunas = $('.lacunas');
  const $aviso = $('.aviso');
  const $reiniciar = $('.reiniciar')

  // consulta jogo.getLacunas() e exibe para o usuário cada lacuna 

  const exibeLacunas = () => {
    $lacunas.empty();
    jogo.getLacunas().forEach(lacuna => 
      $('<li>')
      .addClass('lacuna')
      .text(lacuna)
      .appendTo($lacunas)
    )      
  };

  // muda o texto do placeHolder do campo de entrada    
  const mudaPlaceHolder = texto => $entrada.attr('placeholder', texto);

  // passa para jogo.setPalavraSecreta() o valor digitado pelo jogador e chama o a função `exibeLacunas()` e `mudaPlaceHolder()` definidas no controller. 

  const guardaPalavraSecreta = () => {
    try {
      
      jogo.setPalavraSecreta($entrada.val().trim());
      $entrada.val('');
      $aviso.empty();
      mudaPlaceHolder('chute');
      exibeLacunas();
    }catch(err) {
      $aviso.text(err.message);
    }
  };

  const reinicia = () => {
    jogo.reinicia();
    $lacunas.empty();
    $aviso.empty();
    mudaPlaceHolder('palavra secreta');
  }

  const leChute = () => {
    try {
      jogo.processaChute($entrada.val().trim().substr(0, 1));
      $entrada.val('');
      $aviso.empty();
      exibeLacunas();
      if (jogo.ganhouOuPerdeu()) {
        
        if(jogo.ganhou()) {
          $aviso.text('Parabéns você ganhou!!!')
        } else if(jogo.perdeu) {
          $aviso.text('Que pena você perdeu, tente novamente!!!')
        }
      }
    }catch(err) {
      $aviso.text(err.message)
    }
  }
  
  // faz a associação do evento keypress para capturar a entrada do usuário toda vez que ele teclar ENTER
  const inicia = () => {
    
    $entrada.keypress( event => {
      if (event.which == 13) {
        switch (jogo.getEtapa()) {
          case 1:
            guardaPalavraSecreta()
            break;
          case 2:
            leChute();
            break;
        }
      }
    });
    $reiniciar.click(() => reinicia());
  };

  // retorna um objeto com a propriedade inicia, que deve ser chamada assim que o controller for criado. 
  return { 
    inicia
  };
};
