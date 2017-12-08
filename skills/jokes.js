module.exports = function(controller, menu, notes) {


  controller.hears(['chiste'], 'message_received', function(bot, message) {

    //events.easter_eggs(bot, controller,message);

      bot.createConversation(message, function(err, convo) {

        // create a path for when a user says YES
        convo.addMessage({
          text: notes.getJoke()
        },'yes_thread');

        // create a path for when a user says NO
        // mark the conversation as unsuccessful at the end
        convo.addMessage({
            text: '¡Cuidadín!.',
            action: 'stop', // this marks the converation as unsuccessful
        },'no_thread');

        // create a path where neither option was matched
        // this message has an action field, which directs botkit to go back to the `default` thread after sending this message.
        convo.addMessage({
            text: 'Está la cosa muy malita. Dime `si` o `no` por la gloria de mi madre',
            action: 'default',
        },'bad_response');

        convo.sayFirst({
          text: notes.getJoke(), //phrases[Math.floor(Math.random()*phrases.length)]
          typing: true,
        });

        // Create a yes/no question in the default thread...
        convo.ask('¿Quieres otro?', [
            {
                pattern:  'si',
                callback: function(response, convo) {
                    convo.gotoThread('yes_thread');
                },
            },
            {
                pattern:  bot.utterances.no,
                callback: function(response, convo) {
                    convo.gotoThread('no_thread');
                },
            },
            {
                default: true,
                callback: function(response, convo) {
                    convo.gotoThread('bad_response');
                },
            }
        ]);

        convo.activate();

        // capture the results of the conversation and see what happened...
        convo.on('end', function(convo) {

            if (!convo.successful()) {
              bot.reply(message,'<audio autoplay><source src="assets/sounds/nopuedo.mp3" type="audio/mpeg"></audio>#🎉🎉🎉');
            }

            bot.reply(message, '<img src="https://i.imgur.com/eElV9YX.gifv" />');
                 
            setTimeout( 
              function(){ bot.reply(message, menu.options()) }
              , 3000
            ) 

        });
      });

    });


}
