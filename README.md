# nb-terminal
基于typescript实现的自定义nodejs终端命令行工具
1. 安装淘宝镜像 npm install -g cnpm --registry=https://registry.npm.taobao.org 
2. 安装依赖 cnpm install 
3. link到全局 npm link
4. 查看当前所有命令行 nb

全局安装typescript：
cnpm install -g typescript
动态监听ts文件变更：
npm start
手动编译ts文件：
npm run build

mac 下终端访问文件出现“Permission Denied”解决方案：
一个文件有3种权限，读、写、可执行，你这个文件没有可执行权限，需要加上可执行权限。
1. 终端下先cd到该文件的目录下
2. 执行命令 sudo chmod a+x ./文件名
也许有些文件是可以解决的，但是如果是 管理员权限的在命令前面加上 sudo 就可以了
