module.exports = function(controller, menu) {

  controller.hears(['menu','start','empezar','inicio'],'message_received', function(bot, message) {
    bot.reply(message, menu.options());
  });

}
