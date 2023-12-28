"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Express = void 0;
const express_1 = __importDefault(require("express"));
const process_1 = __importDefault(require("process"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
/**
 * @descripttion express框架启动http || https
 * @author cyk
 * @date 2023-12-14 09:52:14
 */
class Express {
    constructor(dirUrl, isHttps) {
        let self = this;
        self.app = (0, express_1.default)();
        let httpUrl = path_1.default.join(process_1.default.cwd(), dirUrl || '');
        console.log('http%s服务器的作用目录路径: %s', isHttps ? "s" : '', httpUrl);
        self.app.use(express_1.default.static(httpUrl));
        self.port = 3000;
        this.createServer(this.port, isHttps);
    }
    createServer(port, isHttps) {
        let self = this;
        if (isHttps) {
            let sslUrl = path_1.default.join(__dirname.split("out")[0], "ssl");
            const options = {
                key: fs_1.default.readFileSync(path_1.default.join(sslUrl, 'server.key')),
                cert: fs_1.default.readFileSync(path_1.default.join(sslUrl, 'server.crt')),
            };
            self.server = https_1.default.createServer(options, self.app);
        }
        else {
            self.server = http_1.default.createServer(self.app);
        }
        self.server.listen(port);
        self.server.on('error', (error) => {
            if (error.syscall !== 'listen') {
                throw error;
            }
            let errPort = error.port;
            var bind = typeof errPort === 'string' ? 'Pipe ' + errPort : 'Port ' + errPort;
            // handle specific listen errors with friendly messages
            switch (error.code) {
                case 'EACCES':
                    console.error(bind + ' requires elevated privileges');
                    process_1.default.exit(1);
                    break;
                case 'EADDRINUSE': //端口已被占用
                    // console.error(bind + ' is already in use');
                    this.createServer(errPort + 1, isHttps);
                    break;
                default:
                    throw error;
            }
        });
        self.server.on('listening', () => {
            let addr = self.server.address();
            let ip = self.getIp();
            console.log(`server running at http${isHttps ? 's' : ''}://${ip}:${addr.port}`);
        });
    }
    /** 获取本机ip*/
    getIp() {
        let needHost = '';
        try {
            // 获得网络接口列表
            let network = os_1.default.networkInterfaces();
            // console.log("network",network)
            for (let dev in network) {
                let iface = network[dev];
                for (let i = 0; i < iface.length; i++) {
                    let alias = iface[i];
                    if (alias.family === 'IPv4' &&
                        alias.address !== '127.0.0.1' &&
                        !alias.internal) {
                        needHost = alias.address;
                    }
                }
            }
        }
        catch (e) {
            needHost = 'localhost';
        }
        return needHost;
    }
}
exports.Express = Express;
