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
        // this.test();
        // this.test1();
        this.test2();
    }
    test() {
        TimeUT_1.TimeUT.consoleStartCli('test');
        UT_1.UT.logRed("哈哈哈哈");
        TimeUT_1.TimeUT.consoleEndCli('test');
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
    test2() {
        TimeUT_1.TimeUT.consoleStartCli('push');
        let cli = 'git add .';
        (0, child_process_1.exec)(cli, { cwd: process.cwd(), encoding: 'utf-8' }, () => {
            cli = 'git commit -m "测试提交"';
            (0, child_process_1.exec)(cli, { cwd: process.cwd(), encoding: 'utf-8' }, () => {
                cli = 'git push';
                (0, child_process_1.exec)(cli, { cwd: process.cwd(), encoding: 'utf-8' }, () => {
                    TimeUT_1.TimeUT.consoleEndCli('push');
                });
            });
        });
    }
}
exports.Test = Test;
