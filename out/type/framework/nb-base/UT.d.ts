export declare namespace UT {
    /**
     * 删除某个文件夹
     * @param {*} path 删除的文件夹完整路径
     * @param {*} isOnlyDeleteContent 是否只删除该文件夹目录下的内容
    */
    function deleteFolderRecursive(path: string, isOnlyDeleteContent?: boolean): void;
    function copyDir(sourceRoot: any, targetRoot: any): void;
    function checkDirExistAndMake(path: any): void;
    /**
     * 输出红色字体的log
     * 样式详见 https://www.cnblogs.com/taohuaya/p/13948401.html
     */
    function logRed(msg: any): void;
    /**
     * 填充字符串(占位符为%s)
     * @param {*} msg
     * @param  {...any} args
     * @returns
     */
    function formatStr(msg: any, ...args: any[]): any;
}
