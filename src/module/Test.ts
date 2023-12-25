import { exec } from "child_process";
import { TimeUT } from "./lib/TimeUT";
import { UT } from "./lib/UT";

/** 
 * @descripttion 测试脚本
 * @author cyk
 * @date 2023-12-14 20:00:14
 */
export class Test {
    constructor() {
        // this.test();
        // this.test1();
        this.test2();
    }

    private test() {
        TimeUT.consoleStartCli('test');
        UT.logRed("哈哈哈哈");
        TimeUT.consoleEndCli('test');
    }

    private test1() {
        let promise = new Promise(function (resolve, reject) {
            console.log('Promise');
            resolve('resolved.');
        });

        promise.then((value: any) => {
            console.log(value);
        });

        console.log('Hi!');
    }

    private test2() {
        TimeUT.consoleStartCli('push');
        let cli = 'git add .';
        exec(cli, { cwd: process.cwd(), encoding: 'utf-8' }, () => {
            cli = 'git commit -m "测试提交"';
            exec(cli, { cwd: process.cwd(), encoding: 'utf-8' }, () => {
                cli = 'git push';
                exec(cli, { cwd: process.cwd(), encoding: 'utf-8' }, () => {
                    TimeUT.consoleEndCli('push');
                });
            });
        });
    }

}