# whistle-global-proxy
快速设置whistle为系统代理

## Usage
```
# 设置系统代理
npx @stacker/whistle.globalproxy set

# 自定义host/port
npx @stacker/whistle.globalproxy set --port 8899 --host 127.0.0.1

# 清空系统代理
npx @stacker/whistle.globalproxy clear
```

## Test

```
node bin/index.js
```
