import express from 'express';
import process from 'process';
import path from 'path';
import http from 'http';
import https from 'https';
import fs from 'fs';
import os from 'os';
import { AddressInfo } from 'net';
/** 
 * @descripttion express框架启动http || https
 * @author cyk
 * @date 2023-12-14 09:52:14
 */
export class Express {
    private app: any;
    private port: number;
    private server: http.Server | https.Server;
    constructor(dirUrl: string, isHttps?: boolean) {
        let self = this;
        self.app = express();
        let httpUrl = path.join(process.cwd(), dirUrl || '');
        console.log('http%s服务器的作用目录路径: %s', isHttps ? "s" : '', httpUrl);
        self.app.use(express.static(httpUrl));
        self.port = 3000;
        this.createServer(this.port, isHttps); 
    }

    private createServer(port: number, isHttps?: boolean) {
        let self = this;
        if (isHttps) {
            let sslUrl = path.join(__dirname.split("out")[0], "ssl");
            const options = {
                key: fs.readFileSync(path.join(sslUrl, 'server.key')),
                cert: fs.readFileSync(path.join(sslUrl, 'server.crt')),
            };
            self.server = https.createServer(options, self.app);
        } else {
            self.server = http.createServer(self.app);
        }

        self.server.listen(port);
        self.server.on('error', (error: any) => {
            if (error.syscall !== 'listen') {
                throw error;
            }
            let errPort = error.port;
            var bind = typeof errPort === 'string' ? 'Pipe ' + errPort : 'Port ' + errPort;
            // handle specific listen errors with friendly messages
            switch (error.code) {
                case 'EACCES':
                    console.error(bind + ' requires elevated privileges');
                    process.exit(1);
                    break;
                case 'EADDRINUSE'://端口已被占用
                    // console.error(bind + ' is already in use');
                    this.createServer(errPort + 1, isHttps);
                    break;
                default:
                    throw error;
            }
        });
        self.server.on('listening', () => {
            let addr = self.server.address() as AddressInfo;
            let ip = self.getIp();
            console.log(`server running at http${isHttps ? 's' : ''}://${ip}:${addr.port}`);
        });
    }

    /** 获取本机ip*/
    private getIp(): string {
        let needHost = ''
        try {
            // 获得网络接口列表
            let network = os.networkInterfaces()
            // console.log("network",network)
            for (let dev in network) {
                let iface = network[dev]
                for (let i = 0; i < iface.length; i++) {
                    let alias = iface[i]
                    if (
                        alias.family === 'IPv4' &&
                        alias.address !== '127.0.0.1' &&
                        !alias.internal
                    ) {
                        needHost = alias.address
                    }
                }
            }
        } catch (e) {
            needHost = 'localhost'
        }
        return needHost;
    }
}

