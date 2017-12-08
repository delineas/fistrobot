module.exports = function(controller, menu, notes) {


  controller.hears(['cita'], 'message_received', function(bot, message) {

      bot.createConversation(message, function(err, convo) {

        convo.addQuestion('Elige una: A <strong>guan</strong>, a <strong>peich</strong>, a <strong>gromenauer</strong>',[
          {
            pattern: 'guan',
            callback: function(response,convo) {
              bot.reply(message, 'Apiticain, mor nau');
              convo.setVar('phrase',notes.getPhrase());
              convo.next();
            }
          },
          {
            pattern: 'peich',
            callback: function(response,convo) {
              bot.reply(message, '¡Jarrl!');
              convo.setVar('phrase',notes.getPhrase());
              convo.next();

            }
          },
          {
            pattern: 'gromenauer',
            callback: function(response,convo) {
              bot.reply(message, '¡Te da cuen!');
              convo.setVar('phrase',notes.getPhrase());
              convo.next();
            }
          },
          {
            default: true,
            callback: function(response,convo) {
              bot.reply(message, 'Dime <strong>guan</strong>, <strong>peich</strong> o <strong>gromenauer</strong> por la gloria de mi madre')
              convo.repeat();
              //convo.next();
            }
          }
        ],{},'question_thread');

        convo.addMessage({
          text: '{{vars.phrase}}',
          action: 'repeat_thread'
        },'question_thread');

        convo.addMessage({
          text: '<audio autoplay><source src="assets/sounds/precios.mp3" type="audio/mpeg"></audio>#💃💃💃',
          action: 'question_thread'
        },'yes_thread');

        convo.addMessage({
          text: '¡Hasta luego Lucasss!',
          action: 'stop', // this marks the converation as unsuccessful
        },'no_thread');


        convo.addQuestion('¿Quieres otra?',[
          {
            pattern: 'si',
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
        ],{},'repeat_thread');


        // create a path where neither option was matched
        // this message has an action field, which directs botkit to go back to the `default` thread after sending this message.
        convo.addMessage({
            text: 'Está la cosa muy malita. Dime `si` o `no` por la gloria de mi madre',
            action: 'default',
        },'bad_response');

        // convo.sayFirst({
        //   text: phrases[Math.floor(Math.random()*phrases.length)],
        //   typing: true,
        // });


        convo.gotoThread('question_thread');

        // capture the results of the conversation and see what happened...
        convo.on('end', function(convo) {

            //if (convo.successful()) { 
                 
            setTimeout( 
              function(){ bot.reply(message, menu.options()) }
              , 3000
            ) 

        });

        // Must in createConversation
        convo.activate();

      });

    });


}
