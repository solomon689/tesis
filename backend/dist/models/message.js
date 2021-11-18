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
    constructor(title = '', message = '', record = '', typeRecord = '', hour = '') {
        this.title = '';
        this.message = '';
        this.title = title;
        this.message = message;
        this.hour = hour;
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
}
exports.default = Message;
//# sourceMappingURL=message.js.map