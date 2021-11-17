import { NewMessage } from '../interfaces/message';

class Message {
    private title: string = '';
    private message: string = '';
    private hour: string;
    private record: string;
    private typeRecord: string;

    /**
     * Permite crear un objeto de tipo message o record.
     * @param title - Título del mensaje
     * @param message - Mensaje a enviar
     * @param record - Mensaje para dejar como registro
     * @param typeRecord - Tipo de registro
     */
    constructor(title: string = '', message: string = '', record: string = '', typeRecord: string = '') {
        this.title = title;
        this.message = message;
        this.hour = this.setHour();
        this.record = record;
        this.typeRecord = typeRecord;
    }

    /**
     * Retorna un objeto mensaje creado.
    */
    public get newMessage(): NewMessage {
        const newMessage: NewMessage = {
            title: this.title,
            message: this.message,
            hour: this.hour,
            record: this.record,
            typeRecord: this.typeRecord
        }

        return newMessage;
    }

    /**
     * Retorna un objeto de tipo registro.
     */
    public get newRecord(): NewMessage {
        const newRecord: NewMessage = {
            hour: this.hour,
            record: this.record,
            typeRecord: this.typeRecord
        }

        return newRecord;
    }

    /**
     * Permite obtener la hora actual junto a sus minutos.
     * @returns La hora actual en formato HH:MM
     */
    private setHour(): string {
        let minutes: string = '';
        let actualTime: string = '';
        const hour: string = new Date().getHours().toString();

        if (new Date().getMinutes() < 10) 
            minutes = minutes.concat('0', new Date().getMinutes().toString());
        else 
            minutes = new Date().getMinutes().toString();


        return actualTime = actualTime.concat(hour,':',minutes);
    }
}

export default Message;