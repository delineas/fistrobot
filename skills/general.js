module.exports = function(controller) {


  controller.hears('presidente','message_received', function(bot, message) {

    bot.reply(message,'<img src="assets/images/chiquito-jarl.jpg" />');

    setTimeout( 
      function(){ bot.reply(message, menu.options()) }
      , 3000
    );

  });

  controller.hears('cobarde','message_received', function(bot, message) {

    bot.reply(message,'<audio autoplay><source src="assets/sounds/cobarde.mp3" type="audio/mpeg"></audio>#💃');
    setTimeout( 
      function(){ bot.reply(message, menu.options()) }
      , 3000
    );

  });


}
