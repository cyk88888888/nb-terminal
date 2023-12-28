import sd from "silly-datetime";
import { UT } from "./UT";

export namespace TimeUT {
    /**
     * 获取两个date的间隔时间(秒)
     * @param {*} sDate 
     * @param {*} eDate 
     * @param {*} diffType 
     * @returns 
    */
    export function getDateDiff(sDate: Date, eDate: Date, diffType: string = "second") {
        //作为除数的数字
        let divNum: number = 1000;

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

    let stDate: Date;
    export function consoleStartCli(cli:string) {
        stDate = curDate();
        logwithTimeStr(UT.formatStr(">>>>>>>>开始执行命令【%s】(%s)...<<<<<<<<", cli, process.cwd()));
    }

    export function consoleEndCli(cli:string) {
        logwithTimeStr(UT.formatStr('命令【%s】执行完毕, 共耗时%s秒!', cli, getDateDiff(stDate, curDate()) + ''))
    }

    export function logwithTimeStr(msg:string) {
        console.log("%s: %s", getCurTimeStr(), msg);
    }

    /**
     * 获取当前时间的字符串描述
     * @param {时间格式} formatStr 
     * @returns 
     */
    const getCurTimeStr = (formatStr = 'YYYY-MM-DD HH:mm:ss') => {
        return sd.format(curDate(), formatStr);
    }

    const curDate = () => {
        return new Date();
    }

}