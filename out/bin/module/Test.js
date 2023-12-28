"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const child_process_1 = require("child_process");
const TimeUT_1 = require("./lib/TimeUT");
const UT_1 = require("./lib/UT");
/**
 * @descripttion 测试脚本
 * @author cyk
 * @date 2023-12-14 20:00:14
 */
class Test {
    constructor() {
        this.test();
        // this.test1();
        // this.test2();
    }
    test() {
        let self = this;
        setTimeout(function () {
            console.log(typeof self);
        }, 200);
    }
    test1() {
        let promise = new Promise(function (resolve, reject) {
            console.log('Promise');
            resolve('resolved.');
        });
        promise.then((value) => {
            console.log(value);
        });
        console.log('Hi!');
    }
    async test2() {
        TimeUT_1.TimeUT.consoleStartCli('push');
        function dealGit(cli, cwd, succMsg, failMsg) {
            return new Promise(function (resolve, reject) {
                (0, child_process_1.exec)(cli, { cwd: cwd }, (err, stdout, stderr) => {
                    if (err) {
                        if (failMsg)
                            TimeUT_1.TimeUT.logwithTimeStr(UT_1.UT.logRed(failMsg + err));
                        reject();
                    }
                    else {
                        if (succMsg)
                            TimeUT_1.TimeUT.logwithTimeStr(succMsg + stdout);
                        if (cli == 'git status') {
                            let isNeedCommit = stdout.includes("Changes");
                            resolve(isNeedCommit);
                        }
                        else {
                            resolve(false);
                        }
                    }
                });
            });
        }
        await dealGit('git add .', process.cwd(), '', '');
        let isNeedCommit = await dealGit('git status', process.cwd(), '', '');
        if (isNeedCommit) {
            await dealGit('git commit -m "提交代码"', process.cwd(), '', '');
            await dealGit('git push', process.cwd(), '', '');
        }
        TimeUT_1.TimeUT.consoleEndCli('push');
    }
}
exports.Test = Test;
