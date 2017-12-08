module.exports = function(controller, menu, notes, events) {  

  // trigger on some messages
  controller.on('message_received', function(bot, message) {

  });

  // hello = first visit, welcome_back = return visitor
  controller.on(['hello','welcome_back'], function(bot, message) {

    // a known user has started a new, fresh session
    if(message.type == 'hello') {
      bot.reply(message, '¡¡Hola cobarderr!!');
      bot.reply(message, 'Bienvenido al <strong>fistrobot</strong>');
    }
    // a known user has started a new, fresh session
    else {
      bot.reply(message, '¡¡Pecador!! Estás de vuelta');
    }

    // ger user values
    controller.storage.users.get(message.user, function(err, user) {

      // I know yout name
      if (user && user.name) {
        bot.reply(message, user.name + ' eres un diodenal de persona' );
        bot.reply(message, menu.options()); // always end with list of options
      } 
      // I don't know your name
      else {
        bot.startConversation(message, function(err, convo) {
          if (!err) {
            convo.say('¡Quietorl! ¡No conozco tu nombre!');
              convo.ask('Pecadorr, ¿cómo te llamas?', function(response, convo) {
                  convo.next();
              }, {'key': 'nickname'}); // store the results in a field called nickname

              convo.on('end', function(convo) {

                if (convo.status == 'completed') {

                  controller.storage.users.get(message.user, function(err, user) {
                    if (!user) {
                      user = {
                        id: message.user,
                      };
                    }
                    user.name = convo.extractResponse('nickname');
                    controller.storage.users.save(user, function(err, id) {
                        bot.reply(message, 'Ese ' + user.name + ' que nació después de los dolores.');
                        bot.reply(message, menu.options());
                    });
                  });

                } else {
                    // this happens if the conversation ended prematurely for some reason
                    bot.reply(message, '¡No puedorl!');
                    bot.reply(message, menu.options());
                }
              });
          }
        });
      }
    });
  });

  controller.on('reconnect', function(bot, message) {

    // the connection between the client and server experienced a disconnect/reconnect
    bot.reply(message, '¡No puedor, no puedor! Estoy reconectandoooo');

  });

}
