/** 
 * @descripttion 命令行主入口
 * @author CYK
 * @date 2023-12-14 09:52:14
 */
import { Command } from "commander"
import { Express } from "./module/Express"
import { Test } from "./module/Test"
const program = new Command()
program
    .name("nb")
    .description("TypeScript开发的nodejs终端命令行工具")
    .version("1.0.0")

//测试脚本
program.command('test')
    .description('测试脚本')
    .action(() => {
        new Test();
    })
    
program
    .command("http <dirUrl>")
    .description("开启一个http服务器")
    .action((dirUrl: string) => {
        new Express(dirUrl);
    })

program
    .command("https <dirUrl>")
    .description("开启一个https服务器")
    .action((dirUrl: string) => {
        new Express(dirUrl, true);
    })

//不存在命令行内容时调用
program.on('command:*', function () {
    console.log('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
});

program.parse(process.argv)