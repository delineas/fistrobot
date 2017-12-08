module.exports = function(controller, menu) {


  controller.hears('ayuda','message_received', function(bot, message) {

    bot.reply(message,'<audio autoplay><source src="assets/sounds/tedacuen.mp3" type="audio/mpeg"></audio>#💁💁💁');

    bot.reply(message,'Este es un pequeño homenaje al que siempre será gran humorista <a href="https://es.wikipedia.org/wiki/Chiquito_de_la_Calzada" target="_blank">Chiquito de la Calzada</a>');

    bot.reply(message,'El cobarde que ha ejecutado esto es <a href="https://www.danielprimo.io" target="_blank">Dani de danieprimo.io</a>');
    //bot.reply(message,'Si quieres saber más detalles de como está hecho visita <a href="https://www.danielprimo.io" target="_blank">Dani de danieprimo.io</a>');

    bot.reply(message,'Las frases están extraídas de esta genial colección del blog <a href="http://chiquitodelacalzada.blogspot.com.es/p/frases-miticas.html" target="_blank">Chiquito de la Calzada</a>');

    bot.reply(message,'Si en algún momento te pierdes teclea <strong>ayuda</strong> o <strong>inicio</strong>');

    bot.reply(message,'¡Hasta luego Lucas!');

    // setTimeout( 
    //   function(){ bot.reply(message, menu.options()) }
    //   , 3000
    // );

  });


}
