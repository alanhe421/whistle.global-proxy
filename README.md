# whistle-global-proxy
快速设置Whistle为系统代理

## Usage

```shell
# 设置系统代理
npx @stacker/whistle.globalproxy set

# 自定义host/port
npx @stacker/whistle.globalproxy set --port 8899 --host 127.0.0.1

# 清空系统代理
npx @stacker/whistle.globalproxy clear
```

## Test

```shell
node bin/index.js
```
