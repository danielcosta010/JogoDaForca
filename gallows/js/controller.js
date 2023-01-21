var criaController = function (jogo) {

    var $entrada = $('.entrada');
    var $lacunas = $('.lacunas');
    var $aviso = $('.aviso');
    var $reiniciar = $('.reiniciar')

    // consulta jogo.getLacunas() e exibe para o usuário cada lacuna 

    var exibeLacunas = function () {
      $lacunas.empty();
      jogo.getLacunas().forEach(function (lacuna) {
        $('<li>')
        .addClass('lacuna')
        .text(lacuna)
        .appendTo($lacunas)

      })      
    };

    // muda o texto do placeHolder do campo de entrada    
    var mudaPlaceHolder = function (texto) {

      $entrada.attr('placeholder', texto)
    };

    // passa para jogo.setPalavraSecreta() o valor digitado pelo jogador e chama o a função `exibeLacunas()` e `mudaPlaceHolder()` definidas no controller. 

    var guardaPalavraSecreta = function () {
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

    var reinicia = function() {
      jogo.reinicia();
      $lacunas.empty();
      $aviso.empty();
      mudaPlaceHolder('palavra secreta');
    }

    var leChute = function() {
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
    var inicia = function () {
      
      $entrada.keypress(function (event) {
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
      inicia: inicia
    };
};
