import fs from "fs";
import path from "path";

export namespace UT {
    let deleteFolderRoot;
    /**
     * 删除某个文件夹
     * @param {*} path 删除的文件夹完整路径
     * @param {*} isOnlyDeleteContent 是否只删除该文件夹目录下的内容
    */
    export function deleteFolderRecursive(path: string, isOnlyDeleteContent?: boolean) {
        deleteFolderRoot = path;
        deleteFolder(path);
        function deleteFolder(path) {
            if (fs.existsSync(path)) {
                fs.readdirSync(path).forEach(function (file) {
                    let curPath = path + "/" + file;
                    if (fs.statSync(curPath).isDirectory()) { // recurse
                        deleteFolder(curPath);
                    } else { // delete file
                        fs.unlinkSync(curPath);
                    }
                });
                if (!isOnlyDeleteContent) fs.rmdirSync(path);
                if (isOnlyDeleteContent && deleteFolderRoot != path) fs.rmdirSync(path);
            }
        }
    }

    export function copyDir(sourceRoot, targetRoot) {
        const sourceFiles = fs.readFileSync(sourceRoot);
        sourceFiles.forEach((file: number) => {
            const newSourcePath = path.resolve(sourceRoot, file + '');
            const newTargetPath = path.resolve(targetRoot, file + '');
            const stat = fs.statSync(newSourcePath);
            if (stat.isDirectory()) {
                checkDirExistAndMake(newTargetPath);
                copyDir(newSourcePath, newTargetPath);
            } else {
                fs.copyFileSync(newSourcePath, newTargetPath);
            }
        })
    }

    export function checkDirExistAndMake(path) {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
    }

    /**
     * 输出红色字体的log
     * 样式详见 https://www.cnblogs.com/taohuaya/p/13948401.html
     */
    export function logRed(msg) {
        console.log(`\x1b[31m${msg}\x1b[0m`);
    }

    /**
     * 填充字符串(占位符为%s)
     * @param {*} msg 
     * @param  {...any} args 
     * @returns 
     */
    export function formatStr(msg, ...args) {
        if (args.length == 0) {
            return msg;
        }
        for (let index = 0; index < args.length; index++) {
            const element = args[index];
            msg = msg.replace(new RegExp("%s"), element);
        }
        return msg;
    }

}