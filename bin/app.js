"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const program = new commander_1.Command();
program
    .name("nb")
    .description("TypeScript开发的nodejs终端命令行工具")
    .version("1.0.0");
program
    .command("init <name>")
    .description("初始化一个工程")
    .action((name) => {
    console.log("start init zhi project:", name);
});
program
    .command("http")
    .description("开启一个http服务器")
    .action(() => {
    console.log("http服务器已开启");
});
program
    .command("https")
    .description("开启一个https服务器")
    .action(() => {
    console.log("https服务器已开启");
});
//不存在命令行内容时调用
program.on('command:*', function () {
    console.log('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
});
program.parse();
