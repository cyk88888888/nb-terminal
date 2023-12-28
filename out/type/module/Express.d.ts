/**
 * @descripttion express框架启动http || https
 * @author cyk
 * @date 2023-12-14 09:52:14
 */
export declare class Express {
    private app;
    private port;
    private server;
    constructor(dirUrl: string, isHttps?: boolean);
    private createServer;
    /** 获取本机ip*/
    private getIp;
}
