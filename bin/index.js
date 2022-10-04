#!/usr/bin/env node
const program = require('commander');
const pjson = require('../package.json');
const {enableProxy, disableProxy, getCurProxy} = require('@stacker/set-global-proxy');
const readline = require('readline');
const chalk = require('chalk');
program
  .command(`set`)
  .option('--host <string>', 'Whistle地址', '127.0.0.1')
  .option('--port <number>', 'Whistle端口', '8899')
  .description('设置Whistle为系统代理')
  .action((options) => {
    set(options);
  });
program
  .command(`clear`)
  .description('清空系统代理')
  .action(() => {
    clear();
  });

program.version(pjson.version);
program.parse(process.argv);

function set(options) {
  const currentProxyConfig = getCurProxy();
  const doSetting = () => {
    if (enableProxy({
      host: options.host, port: +options.port, // bypass?: ;
      sudo: true
    })) {
      console.log(chalk.blue('Whistle作为系统代理，设置成功，🎉，配置如下'));
      console.log(chalk.blue(JSON.stringify(getCurProxy())));
    } else {
      console.log(chalk.red('Whistle作为系统代理，设置失败，❌'));
    }
  }

  if (currentProxyConfig.http.host.trim()
    || currentProxyConfig.https.host.trim()) {
    console.log(chalk.blue(`系统代理已存在，配置如下`));
    console.log(chalk.blue(`${JSON.stringify(currentProxyConfig)}\n`));
    const rl = readline.createInterface({
      input: process.stdin, output: process.stdout
    });
    rl.question('回车即覆盖该配置[enter or no]', function (name) {
      if (name !== 'no') {
        doSetting();
      }
      rl.close();
    });
  } else {
    doSetting();
  }
}

function clear() {
  if (disableProxy(true)) {
    console.log('系统代理清除成功，🎉');
  } else {
    console.log('系统代理清除失败，❌');
  }
}
