import { exec } from "child_process";
import { TimeUT } from "./lib/TimeUT";
import { UT } from "./lib/UT";

/** 
 * @descripttion 测试脚本
 * @author cyk
 * @date 2023-12-14 20:00:14
 */
export class Test{
    constructor(){
        // this.test();
        // this.test1();
        this.test2();
    }

    private test(){
        TimeUT.consoleStartCli('test');
        UT.logRed("哈哈哈哈");
        TimeUT.consoleEndCli('test');
    }

    private test1(){
        let promise = new Promise(function(resolve, reject) {
            console.log('Promise');
            resolve('resolved.');
          });
          
          promise.then((value: any) => {
            console.log(value);
          });
          
          console.log('Hi!');
    }

    private test2(){
        TimeUT.consoleStartCli('pull');
        let cli = 'git pull';
        exec(cli, {cwd: process.cwd(), encoding: 'utf8' },()=>{
            console.log(process.cwd())
            TimeUT.consoleEndCli('pull');
        });
    }

}