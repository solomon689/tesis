"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessage = void 0;
const createMessage = (title = '', message = '') => {
    const hour = setHour();
    const newMessage = {
        hour,
        title,
        message
    };
    return newMessage;
};
exports.createMessage = createMessage;
function setHour() {
    let actualTime = '';
    const hour = new Date().getHours().toString();
    const minutes = new Date().getMinutes().toString();
    actualTime = actualTime.concat(hour, ':', minutes);
    return actualTime;
}
//# sourceMappingURL=message.js.map