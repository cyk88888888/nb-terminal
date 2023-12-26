import { ExecException, exec } from "child_process";
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

    private async test2() {
        TimeUT.consoleStartCli('push');
        // let cli = 'git add .';
        // exec(cli, { cwd: process.cwd(), encoding: 'utf8' }, () => {
        //     cli = 'git commit -m "测试提交"';
        //     exec(cli, { cwd: process.cwd(), encoding: 'utf8' }, () => {
        //         cli = 'git push';
        //         exec(cli, { cwd: process.cwd(), encoding: 'utf8' }, () => {
        //             TimeUT.consoleEndCli('push');
        //         });
        //     });
        // });

        async function promise_pull(){
            return new Promise<string>(function (resolve, reject) {
                exec('git pull', { cwd: process.cwd(), encoding: 'utf8' }, (err: ExecException, stdout: string, stderr: string) => {
                    if (err) {
                        UT.logRed(err);
                        UT.logRed('stderr:' + stderr);
                        reject();
                    } else {
                        console.log('stdout: ' + stdout);
                        resolve('');
                    }
                    // console.log('git pull');
                });
            });
        } 

        let promise_add = new Promise<string>(function (resolve, reject) {
            exec('git add .', { cwd: process.cwd(), encoding: 'utf8' }, (err: ExecException, stdout: string, stderr: string) => {
                if (err) {
                    UT.logRed(err);
                    UT.logRed('stderr:' + stderr);
                    reject();
                } else {
                    console.log(stdout);
                    resolve('');
                }
                // console.log('git add .');
            });
        });

        let promise_commit = new Promise<string>(function (resolve, reject) {
            exec('git commit -m "提交代码"', { cwd: process.cwd(), encoding: 'utf8' }, (err: ExecException, stdout: string, stderr: string) => {
                if (err) {
                    UT.logRed(err);
                    UT.logRed('stderr:' + stderr);
                    reject();
                } else {
                    console.log(stdout);
                    resolve('');
                }
            });
        });

        let promise_push = new Promise<string>(function (resolve, reject) {
            exec('git push', { cwd: process.cwd(), encoding: 'utf8' }, (err: ExecException, stdout: string, stderr: string) => {
                if (err) {
                    UT.logRed(err);
                    UT.logRed('stderr:' + stderr);
                    reject();
                } else {
                    console.log(stdout);
                    resolve('');
                }
                // console.log('git push');
            });
        });
        await promise_pull();
        // await promise_add;
        // await promise_commit;
        // await promise_push;

        TimeUT.consoleEndCli('push');
    }

}