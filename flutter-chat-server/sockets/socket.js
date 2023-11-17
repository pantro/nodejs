const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado} = require('../controllers/socketController')

// Mensajes de Sockets
io.on('connection', (client) => {
    console.log('Cliente conectado');

    const [ valido, uid ] = comprobarJWT( client.handshake.headers['x-token']);
    
    if (!valido) {
        return client.disconnect();
    }

    // Verificar autenticacion
    usuarioConectado(uid);

    client.on('disconnect', () => {
        usuarioDesconectado(uid);
        console.log('Cliente desconectado');
    });

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    });


});
