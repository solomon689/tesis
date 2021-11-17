"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Message {
    /**
     * Permite crear un objeto de tipo message o record.
     * @param title - Título del mensaje
     * @param message - Mensaje a enviar
     * @param record - Mensaje para dejar como registro
     * @param typeRecord - Tipo de registro
     */
    constructor(title = '', message = '', record = '', typeRecord = '') {
        this.title = '';
        this.message = '';
        this.title = title;
        this.message = message;
        this.hour = this.setHour();
        this.record = record;
        this.typeRecord = typeRecord;
    }
    /**
     * Retorna un objeto mensaje creado.
    */
    get newMessage() {
        const newMessage = {
            title: this.title,
            message: this.message,
            hour: this.hour,
            record: this.record,
            typeRecord: this.typeRecord
        };
        return newMessage;
    }
    /**
     * Retorna un objeto de tipo registro.
     */
    get newRecord() {
        const newRecord = {
            hour: this.hour,
            record: this.record,
            typeRecord: this.typeRecord
        };
        return newRecord;
    }
    /**
     * Permite obtener la hora actual junto a sus minutos.
     * @returns La hora actual en formato HH:MM
     */
    setHour() {
        let minutes = '';
        let actualTime = '';
        const hour = new Date().getHours().toString();
        if (new Date().getMinutes() < 10)
            minutes = minutes.concat('0', new Date().getMinutes().toString());
        else
            minutes = new Date().getMinutes().toString();
        return actualTime = actualTime.concat(hour, ':', minutes);
    }
}
exports.default = Message;
//# sourceMappingURL=message.js.map