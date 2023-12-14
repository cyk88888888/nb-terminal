import { TimeUT } from "./lib/TimeUT";
import { UT } from "./lib/UT";

/** 
 * @descripttion 测试脚本
 * @author cyk
 * @date 2023-12-14 20:00:14
 */
export class Test{
    constructor(){
        this.test();
    }

    private test(){
        TimeUT.consoleStartCli('test');
        UT.logRed("哈哈哈哈");
        TimeUT.consoleEndCli('test');
    }

}