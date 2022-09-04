#!/usr/bin/env node
const program = require('commander');
const pjson = require('../package.json');
const {enableProxy, disableProxy} = require('set-global-proxy');

program
  .command(`set`)
  .option('--host <string>', 'whistle端口', '127.0.0.1')
  .option('--port <number>', 'whistle端口', '8899')
  .description('设置whistle为系统代理')
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
    console.log('setting success,🎉');
  } else {
    console.log('setting fail,❌');
  }
}

function clear() {
  if (disableProxy(true)) {
    console.log('clear ok,🎉');
  } else {
    console.log('clear error,❌');
  }
}
