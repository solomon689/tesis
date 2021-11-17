"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const socketController_1 = __importDefault(require("../controllers/socketController"));
class SocketServer {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        this.server = (0, http_1.createServer)(this.app);
        this.io = new socket_io_1.Server(this.server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });
        this.middlewares();
        this.sockets();
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ', this.port);
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)({
            origin: '*',
            optionsSuccessStatus: 200
        }));
        this.app.use(express_1.default.json());
    }
    sockets() {
        this.io.on('connection', socketController_1.default);
    }
}
exports.default = SocketServer;
//# sourceMappingURL=socket-server.js.map