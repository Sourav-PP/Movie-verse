import { appConfig } from "./infrastructure/config/config";
import { Server } from "./infrastructure/server/Server";

const PORT = appConfig.server.port;

const server = new Server(PORT);
server.start();