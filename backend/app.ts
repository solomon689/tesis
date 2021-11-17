import dotenv from 'dotenv';
import SocketServer from './models/socket-server';

dotenv.config();

const server: SocketServer = new SocketServer();

server.listen();