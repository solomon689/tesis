import { Socket } from "socket.io";
import { v4 as uuidv4 } from 'uuid';
import { Payload } from '../interfaces/payload';
import Message from "../models/message";

enum typeOfRecord {
    ALERT = 'alert',
    ANSWERED = 'answered',
    NOT_ANSWERED = 'not_answered'
}

const socketController = (socket: Socket) => {

    /*
     Evento que crea la sala que permitirá comunicarse al usuario unicamente
     con sus contactos.
    */
    socket.on('create-room', userName => {
        const roomId: string = uuidv4();
        socket.join(roomId);
        
        // Envia el id y el nombre del usuario hacia la página de monitoreo.
        socket.emit('room-id', { 
            roomId,
            userName
        });
    });

    /* 
     Evento que permite conectarse a la sala creada para la comunicación. Idealmente usarlo
     unicamente dentro de la página de monitoreo.
    */
    socket.on('connect-room', (payload: Payload) => {
        if (payload.roomId) 
            socket.join(payload.roomId);
    });
    
    /*
     Evento utilizado cuando comienza el trayecto del usuario. Recibe un payload con 
     las coordenadas de la ubicación actual del usuario y el id de la sala.
    
     Este evento queda a la escucha de la ubicación del usuario, por lo cual se activa
     cada vez que la aplicación hace envio de las coordenadas del usuario.
    */
    socket.on('started', (payload: Payload) => {
        if (payload.roomId) {
            socket.join(payload.roomId);
            socket.to(payload.roomId).emit('user-position', payload.userPosition);
        }
    });

    /* 
     Evento para enviar un registro sobre el estado actual del usuario hacia la
     página de monitoreo.
    */
    socket.on('record', (payload: Payload) => {
        const message: Message = new Message(
            '',
            '',
            payload.record,
            (payload.typeOfRecord === typeOfRecord.ANSWERED) ? typeOfRecord.ANSWERED : typeOfRecord.NOT_ANSWERED,
            payload.hour
        );

        if (payload.roomId)
            socket.to(payload.roomId).emit('send-record', message.newRecord);
    });

    /* 
     Evento para enviar una alerta de emergencia sobre el estado actual del usuario
     hacia la página de monitoreo.

     Dependiendo del tipo de alerta (ya sea por voz o instantánea) el evento procesará
     de diferente forma el envió de la alerta.
    */
    socket.on('alert', (payload: Payload) => {
        if (payload.typeOfAlert === 'INSTANT_MSG') {
            const message: Message = new Message(
                '!AYUDA¡',
                '¡¡¡Estoy en peligro!!!',
                'El usuario ha enviado una alerta de emergencia.',
                typeOfRecord.ALERT,
                payload.hour
            );
    
            if (payload.roomId)
                socket.to(payload.roomId).emit('send-alert', message.newMessage);
        }

        if (payload.typeOfAlert === 'VOICE_MSG') {
            const message: Message = new Message(
                '!AYUDA¡',
                payload.message,
                'El usuario ha enviado una alerta de emergencia.',
                typeOfRecord.ALERT,
                payload.hour
            );
            
            if (payload.roomId)
                socket.to(payload.roomId).emit('send-alert', message.newMessage);
        }
    });

    /* 
     Evento que hace envio de un booleano hacia la página de monitoreo y
     que esta pueda borrar los registros.
    */
    socket.on('finish-travel', (payload: Payload) => {
        if (payload.roomId)
            socket.to(payload.roomId).emit('send-finish', payload.answer);
    });
}

export default socketController;