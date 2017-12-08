module.exports = {
  options: function() {
    return {
      text: '#### ¡Pecadorr! <strong>¿Qué quieres hacer?</strong>',
      quick_replies: [
          {
              title: 'Chiste grijander',
              payload: 'chiste'
          },
          {
              title: 'Cita pecadora',
              payload: 'cita'
          },
          {
              title: '¡Ayuda Meletérica!',
              payload: 'ayuda'
          },
      ]
    };
  }
};
