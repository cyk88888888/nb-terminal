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
        this.test();
        // this.test1();
        // this.test2();
    }

    private test() {
        let self = this;
        setTimeout(function(){
            console.log(typeof self);
        }, 200);
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
        function dealGit(cli: string, cwd: string, succMsg: string, failMsg: string) {
            return new Promise<boolean>(function (resolve, reject) {
                exec(cli, { cwd: cwd }, (err: ExecException, stdout: string, stderr: string) => {
                    if (err) {
                        if(failMsg) TimeUT.logwithTimeStr(UT.logRed(failMsg + err));
                        reject();
                    } else {
                        if (succMsg) TimeUT.logwithTimeStr(succMsg + stdout);
                        if(cli == 'git status') {
                            let isNeedCommit = stdout.includes("Changes");
                            resolve(isNeedCommit);
                        }else{
                            resolve(false);
                        }
                    }
                });
            });
        }

        await dealGit('git add .', process.cwd(),'','');
        let isNeedCommit = await dealGit('git status', process.cwd(),'','');
        if(isNeedCommit){
            await dealGit('git commit -m "提交代码"', process.cwd(),'','');
            await dealGit('git push', process.cwd(),'','');
        }
        TimeUT.consoleEndCli('push');
    }

}