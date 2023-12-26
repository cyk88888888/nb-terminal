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
    async test2() {
        TimeUT_1.TimeUT.consoleStartCli('push');
        async function promise_pull() {
            return new Promise(function (resolve, reject) {
                (0, child_process_1.exec)('git pull', { cwd: process.cwd(), encoding: 'utf8' }, (err, stdout, stderr) => {
                    if (err) {
                        UT_1.UT.logRed(err);
                        UT_1.UT.logRed('stderr:' + stderr);
                        reject();
                    }
                    else {
                        console.log(stdout);
                        resolve('');
                    }
                });
            });
        }
        async function promise_add() {
            return new Promise(function (resolve, reject) {
                (0, child_process_1.exec)('git add .', { cwd: process.cwd(), encoding: 'utf8' }, (err, stdout, stderr) => {
                    if (err) {
                        UT_1.UT.logRed(err);
                        UT_1.UT.logRed('stderr:' + stderr);
                        reject();
                    }
                    else {
                        console.log(stdout);
                        resolve('');
                    }
                });
            });
        }
        async function promise_commit() {
            return new Promise(function (resolve, reject) {
                (0, child_process_1.exec)('git commit -m "提交代码"', { cwd: process.cwd(), encoding: 'utf8' }, (err, stdout, stderr) => {
                    if (err) {
                        UT_1.UT.logRed(err);
                        UT_1.UT.logRed('stderr:' + stderr);
                        reject();
                    }
                    else {
                        console.log(stdout);
                        resolve('');
                    }
                });
            });
        }
        async function promise_push() {
            return new Promise(function (resolve, reject) {
                (0, child_process_1.exec)('git push', { cwd: process.cwd(), encoding: 'utf8' }, (err, stdout, stderr) => {
                    if (err) {
                        UT_1.UT.logRed(err);
                        UT_1.UT.logRed('stderr:' + stderr);
                        reject();
                    }
                    else {
                        console.log(stdout);
                        resolve('');
                    }
                });
            });
        }
        await promise_pull();
        await promise_add();
        await promise_commit();
        await promise_push();
        TimeUT_1.TimeUT.consoleEndCli('push');
    }
}
exports.Test = Test;
