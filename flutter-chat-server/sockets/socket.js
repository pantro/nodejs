const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado, grabarMensaje} = require('../controllers/socketController')

// Mensajes de Sockets
io.on('connection', (client) => {
    console.log('Cliente conectado');

    const [ valido, uid ] = comprobarJWT( client.handshake.headers['x-token']);
    
    if (!valido) {
        return client.disconnect();
    }

    // Verificar autenticacion
    usuarioConectado(uid);

    // INgresar al usuario a una sala en particular
    // Hay 3 tipos de salas: sala global, client.id, sala que vamos agenerar con el UID del usuario
    client.join( uid );// Generando la sala con el UID

    // Escuchar del cliente el mensaje personal
    client.on('mensaje-personal', async ( payload ) => {
        console.log(payload);
        await grabarMensaje( payload );
        io.to( payload.para ).emit('mensaje-personal', payload);// Renviandolo solo a la personal de determinado UID
    });

    client.on('disconnect', () => {
        usuarioDesconectado(uid);
        console.log('Cliente desconectado');
    });

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    });


});
