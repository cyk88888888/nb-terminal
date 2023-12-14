"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
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
    }
    test() {
        TimeUT_1.TimeUT.consoleStartCli('test');
        UT_1.UT.logRed("哈哈哈哈");
        TimeUT_1.TimeUT.consoleEndCli('test');
    }
}
exports.Test = Test;
