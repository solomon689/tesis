"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const socket_server_1 = __importDefault(require("./models/socket-server"));
dotenv_1.default.config();
const server = new socket_server_1.default();
server.listen();
//# sourceMappingURL=app.js.map