"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeUT = void 0;
const silly_datetime_1 = __importDefault(require("silly-datetime"));
const UT_1 = require("./UT");
var TimeUT;
(function (TimeUT) {
    /**
     * 获取两个date的间隔时间(秒)
     * @param {*} sDate
     * @param {*} eDate
     * @param {*} diffType
     * @returns
    */
    function getDateDiff(sDate, eDate, diffType = "second") {
        //作为除数的数字
        let divNum = 1000;
        switch (diffType) {
            case "second":
                divNum = 1000;
                break;
            case "minute":
                divNum = 1000 * 60;
                break;
            case "hour":
                divNum = 1000 * 3600;
                break;
            case "day":
                divNum = 1000 * 3600 * 24;
                break;
            default:
                break;
        }
        return (eDate.getTime() - sDate.getTime()) / divNum;
    }
    TimeUT.getDateDiff = getDateDiff;
    let stDate;
    function consoleStartCli(cli) {
        stDate = curDate();
        logwithTimeStr(UT_1.UT.formatStr(">>>>>>>>开始执行命令【%s】(%s)...<<<<<<<<", cli, process.cwd()));
    }
    TimeUT.consoleStartCli = consoleStartCli;
    function consoleEndCli(cli) {
        logwithTimeStr(UT_1.UT.formatStr('命令【%s】执行完毕, 共耗时%s秒!', cli, getDateDiff(stDate, curDate()) + ''));
    }
    TimeUT.consoleEndCli = consoleEndCli;
    function logwithTimeStr(msg) {
        console.log("%s: %s", getCurTimeStr(), msg);
    }
    TimeUT.logwithTimeStr = logwithTimeStr;
    /**
     * 获取当前时间的字符串描述
     * @param {时间格式} formatStr
     * @returns
     */
    const getCurTimeStr = (formatStr = 'YYYY-MM-DD HH:mm:ss') => {
        return silly_datetime_1.default.format(curDate(), formatStr);
    };
    const curDate = () => {
        return new Date();
    };
})(TimeUT || (exports.TimeUT = TimeUT = {}));
