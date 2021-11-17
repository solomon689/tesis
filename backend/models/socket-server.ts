import  express, { Application } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import cors from 'cors';
import socketController from '../controllers/socketController';


class SocketServer {
    private app: Application;
    private port: string;
    private server;
    private io;

    constructor() {
        
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.server = createServer(this.app);
        this.io = new Server(this.server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });
        
        this.middlewares();
        this.sockets();
    }

    public listen(): void {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ', this.port);
        });
    }
    
    private middlewares(): void {
        this.app.use(cors({
            origin: '*',
            optionsSuccessStatus: 200
        }));
        this.app.use(express.json());
    }

    private sockets(): void {
        this.io.on('connection', socketController);
    }
}

export default SocketServer;