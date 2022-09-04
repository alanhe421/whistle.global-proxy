#!/usr/bin/env node
const program = require('commander');
const pjson = require('../package.json');
const {enableProxy, disableProxy} = require('set-global-proxy');

program
  .command(`set`)
  .option('--host <string>', 'Whistle端口', '127.0.0.1')
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
  if (enableProxy({
    host: options.host, port: +options.port, // bypass?: ;
    sudo: true
  })) {
    console.log('Whistle作为系统代理，设置成功🎉');
  } else {
    console.log('Whistle作为系统代理，设置失败,❌');
  }
}

function clear() {
  if (disableProxy(true)) {
    console.log('系统代理清除成功，🎉');
  } else {
    console.log('系统代理清除失败，❌');
  }
}
