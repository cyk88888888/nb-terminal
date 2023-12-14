"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UT = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
var UT;
(function (UT) {
    let deleteFolderRoot;
    /**
     * 删除某个文件夹
     * @param {*} path 删除的文件夹完整路径
     * @param {*} isOnlyDeleteContent 是否只删除该文件夹目录下的内容
    */
    function deleteFolderRecursive(path, isOnlyDeleteContent) {
        deleteFolderRoot = path;
        deleteFolder(path);
        function deleteFolder(path) {
            if (fs_1.default.existsSync(path)) {
                fs_1.default.readdirSync(path).forEach(function (file) {
                    var curPath = path + "/" + file;
                    if (fs_1.default.statSync(curPath).isDirectory()) { // recurse
                        deleteFolder(curPath);
                    }
                    else { // delete file
                        fs_1.default.unlinkSync(curPath);
                    }
                });
                if (!isOnlyDeleteContent)
                    fs_1.default.rmdirSync(path);
                if (isOnlyDeleteContent && deleteFolderRoot != path)
                    fs_1.default.rmdirSync(path);
            }
        }
    }
    UT.deleteFolderRecursive = deleteFolderRecursive;
    function copyDir(sourceRoot, targetRoot) {
        const sourceFiles = fs_1.default.readFileSync(sourceRoot);
        sourceFiles.forEach((file) => {
            const newSourcePath = path_1.default.resolve(sourceRoot, file + '');
            const newTargetPath = path_1.default.resolve(targetRoot, file + '');
            const stat = fs_1.default.statSync(newSourcePath);
            if (stat.isDirectory()) {
                checkDirExistAndMake(newTargetPath);
                copyDir(newSourcePath, newTargetPath);
            }
            else {
                fs_1.default.copyFileSync(newSourcePath, newTargetPath);
            }
        });
    }
    UT.copyDir = copyDir;
    function checkDirExistAndMake(path) {
        if (!fs_1.default.existsSync(path)) {
            fs_1.default.mkdirSync(path);
        }
    }
    UT.checkDirExistAndMake = checkDirExistAndMake;
    /**
     * 输出红色字体的log
     * 样式详见 https://www.cnblogs.com/taohuaya/p/13948401.html
     */
    function logRed(msg) {
        console.log(`\x1b[31m${msg}\x1b[0m`);
    }
    UT.logRed = logRed;
    /**
     * 填充字符串(占位符为%s)
     * @param {*} msg
     * @param  {...any} args
     * @returns
     */
    function formatStr(msg, ...args) {
        if (args.length == 0) {
            return msg;
        }
        for (let index = 0; index < args.length; index++) {
            const element = args[index];
            msg = msg.replace(new RegExp("%s"), element);
        }
        return msg;
    }
    UT.formatStr = formatStr;
})(UT || (exports.UT = UT = {}));
