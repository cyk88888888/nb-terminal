export declare namespace TimeUT {
    /**
     * 获取两个date的间隔时间(秒)
     * @param {*} sDate
     * @param {*} eDate
     * @param {*} diffType
     * @returns
    */
    function getDateDiff(sDate: Date, eDate: Date, diffType?: string): number;
    function consoleStartCli(cli: any): void;
    function consoleEndCli(cli: any): void;
    function logwithTimeStr(msg: any): void;
}
