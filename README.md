# 简介

`@zz-common/call-app` 是一个基于 `typescript` 开发的通用的唤起 app 的 sdk, 目前兼容转转/找靓机 app, 兼容主流浏览器、webview，并支持用户自定义唤起配置。

体验地址：

## 快速上手

### Step1：安装

通过 `npm` 安装

```bash
npm i @zz-common/call-app -S
```

### Step2：引入

```js
import CallApp from '@zz-common/call-app'
```

如果是通过外链 js 引入，那么可以使用 `window.CallApp` 得到 `CallApp` 类

### Step3：使用

实例化 `CallApp` 后，即可使用 `start` 和 `download` 方法.

```javascript
// 实例化
const callApp = new CallApp({
  path: '', // 要唤起目标 app 的 path ，默认目标app是转转
})
// 执行 唤起方法
callApp.start()
// 执行 下载
callApp.download()
```
或者
```javascript
// 实例化
const callApp = new CallApp()
// 执行 唤起方法
callApp.start({
  path: '', // 要唤起目标 app 的 path ，默认目标app是转转
})
// 执行 下载
callApp.download()
```
#### 参数配置项

- **path** `String` 调起 app 时，默认打开的页面，类型为 app 的统跳地址（选填）
- **channelId** `String` 渠道号，可选，当用户没有安装 app 时，默认下载的渠道号，安卓支持，iOS 不支持，默认`923`（选填）
- **targetApp** `String` 调起的目标 app，其中：zz(转转app), zlj(找靓机app), zzHunter(采货侠app), zzSeller(转转卖家版 已废弃), wxMini(微信小程序 未支持)，默认为`zz`
- **universal** `Boolean` 是否开启通用链接调起模式，默认为`true`
- **download** `Boolean` 是否会自动跳转下载页面，默认为 `true`
- **middleWareUrl** `String` 中转 url，如为空则默认跳转下载安装包或 appstore
- **delay** `Number` 调起app失败后触发下载延迟, 默认 2500（毫秒）
- **callStart** `Function` 开始执行调起时的hook
- **callSuccess** `Function` 执行调起成功时的hook
- **callFailed** `Function` 执行调起失败时的hook
- **callDownload** `Function` 执行下载时的hook
- **callError** `Function` 内部异常时的hook

- **urlSearch** `Object` [已废弃] 指定页面调起方式，不推荐，直接设置 path 来跳转即可
  - **openType** `String` 页面类型，可选值为 `home首页（默认），detail详情页，order订单，mysell我卖出的，person个人中心，village小区，web页面`
  - **id** `String` 存放 id 或者 url，配合`openType` 的值来用

- **onWechatReady** `Function` 微信端初始化安装后的回调

#### api 方法

- **start** `Function` 唤起功能

```js
// 挂在CallApp实例上的方法
// options 可选 配置同上
const callApp = new CallApp()
callApp.download(options)
```

- **download** `Function`  下载功能

```js
// 挂在CallApp实例上的方法
// options 可选 配置同上
const callApp = new CallApp()
callApp.download(options)
```

## 示例用法

##### 1. 初始化实例时配置 options，唤起 转转/找靓机

```javascript
// 唤起 转转
const callApp = new CallApp({
  path: 'jump/shortVideo/videoHome/jump', //
  channelId: '', //  渠道id
  deeplinkId: '', // 后台配置项
  // targetApp 默认 转转, 优先级低于 path 的 prefix
  // zlj 代表找靓机; zz 或者 zhuanzhuan 代表转转
  targetApp: 'zz',
  callStart: () => {
    console.log('触发 开始唤起钩子')
  },
  callSuccess: () => {
    console.log('触发 唤起成功钩子')
  },
  callFailed: () => {
    console.log('触发 唤起失败钩子')
  },
  callDownload: () => {
    console.log('触发 下载钩子')
  },
  callError: () => {
    console.log('内部异常')
  },
})

// 执行唤起
callApp.start()
// 执行下载
callApp.download()
```

```javascript
// 唤起 找靓机
const callApp = new CallApp({
  path: 'native_api?type=132&content=%7B%22extra_tab_index%22%3A%220%22%7D',
  targetApp: 'zzSeeker',
  callStart: () => {
    console.log('触发 开始唤起钩子')
  },
  callSuccess: () => {
    console.log('触发 唤起成功钩子')
  },
  callFailed: () => {
    console.log('触发 唤起失败钩子')
  },
  callDownload: () => {
    console.log('触发 下载钩子')
  },
  callError: () => {
    console.log('内部异常')
  },
})

// 执行唤起
callApp.start()
// 执行下载
callApp.download()
```

#####  2. 调用 api 时配置 options, 唤起 转转/找靓机

该用法为 实例化CallApp类一次，通过 api 来配置 options，进行执行。
此一般用于较复杂业务场景下，避免多次实例化而造成内存浪费。

```javascript
// 实例化一次
const callApp = new CallApp()
// 在方法内进行参数配置

// 唤起转转
callApp.start({
  path: 'jump/shortVideo/videoHome/jump',
  channelId: '', //  渠道id
  deeplinkId: '', //
  targetApp: 'zz', // 默认 转转
})

// 唤起找靓机
callApp.start({
  path: 'native_api?type=132&content=%7B%22extra_tab_index%22%3A%220%22%7D',
  // path: 'zljgo://native_api?type=132&content=%7B%22extra_tab_index%22%3A%220%22%7D',
  targetApp: 'zzSeeker', // 默认 转转
})

// 下载转转
callApp.download({
  targetApp: 'zz', // 默认 转转
  channelId: '',
  deeplinkId: ''
})

// 下载找靓机
callApp.download({
  targetApp: 'zlj',  // zlj 代表找靓机; zz 或者 zhuanzhuan 代表转转;
})
```

1. 第三方配置（高阶）

⚠️ 注意：

3-1. 如果配置了 `customConfig` 参数，则非 hooks 参数（如 path，targetApp 等）的配置不再生效。

3-2 `landingPage` 配置参数优先级大于 `downloadConfig`

3-3 如果没有配置 `universalLink` 则 ios 端降级为 `schemeUrl`

```javascript
// 唤起支付宝
const callApp = new CallApp({
  customConfig: {
    schemeUrl: 'alipay://platformapi/startapp?appId=20000056', // 支付宝转账
    landingPage: 'https://render.alipay.com/p/s/i', // 支付宝落地页（下载页）
  },
  callStart: () => {
    console.log('触发 开始唤起钩子')
  },
  callSuccess: () => {
    console.log('触发 唤起成功钩子')
  },
  callFailed: () => {
    console.log('触发 唤起失败钩子')
  },
})

callApp.start()
```

## 兼容性 😈

### H5
#### ios: [iphoneXR]
目标app: 转转
| 环境          | 下载          | scheme/ulink 唤起(已装 app) | 失败回调(已装 app) | 成功回调(已装 app)       | 失败回调(未装 app)  |
| ------------- | ------------- | --------------------------- | ------------------ | ------------------------ | ------------------- |
| safari        | 支持 location | ulink 支持                  | 不支持             | 支持                     | 不支持（跳 ulink）  |
| qq 浏览器     | 支持 location | ulink 支持                  | 支持               | 支持                     | 不支持（跳 ulink）  |
| uc 浏览器     | 支持 location | ulink 支持                  | 支持               | ulink支持, scheme 不支持 | 不支持（跳 ulink）  |
| 百度浏览器    | 支持 location | ulink 支持, scheme 不支持   | 支持               | ulink支持 scheme 不支持  | 不支持（跳 ulink）  |
| 夸克浏览器    | 支持 iFrame   | 不支持 ulink，支持 scheme   | 支持               | 支持                     | 支持                |
| 谷歌浏览器    | 支持 location | ulink 支持                  | 支持               | 支持                     | 不支持（跳 ulink）  |
| sougou 浏览器 | 不支持        | ulink 支持                  | 支持               | 支持                     | 不支持（跳 ulink）  |
| wx            | 支持，应用宝  | ulink 支持, scheme 不支持   | 支持               | 支持                     | 不支持（跳 ulink）  |
| weibo         | 不支持        | ulink 支持, scheme 不支持   | 支持               | ulink支持,scheme 不支持  | 不支持（跳 ulink）  |
| qq            | 支持, 应用宝  | ulink 支持                  | 支持               | 支持                     | 支持 (不会跳 ulink) |

#### android: [huawei-p30]
目标app: 转转
| 环境          | 下载          | scheme 唤起(已装 app) | 失败回调(已装 app) | 成功回调(已装 app) | 失败回调(未装 app) |
| ------------- | ------------- | --------------------- | ------------------ | ------------------ | ------------------ |
| qq 浏览器     | 支持 location | 支持                  | 支持               | 支持               | 支持               |
| uc 浏览器     | 支持 tagA     | 支持                  | 支持               | 支持               | 支持               |
| 百度浏览器    | 支持 location | 不支持                | 支持               | 不支持             | 支持               |
| 夸克浏览器    | 支持 location | 支持                  | 支持               | 支持               | 支持               |
| sougou 浏览器 | 支持 location | 支持                  | 支持               | 支持               | 支持               |
| 360 浏览器    | 支持 location | 支持                  | 支持               | 支持               | 支持               |
| 华为浏览器    | 支持 location | 支持                  | 支持               | 支持               | 支持               |
| wx            | 支持，应用宝  | 不支持                | 支持               | 不支持             | 支持               |
| weibo         | 不支持        | 不支持                | 支持               | 不支持             | 支持               |
| qq            | 支持, 应用宝  | 支持                  | 支持               | 支持               | 支持               |

#### android: [mi-9]
目标app: 转转
| 环境       | 下载          | scheme 唤起(已装 app) | 失败回调(已装 app) | 成功回调(已装 app) | 失败回调(未装 app) |
| ---------- | ------------- | --------------------- | ------------------ | ------------------ | ------------------ |
| qq 浏览器  | 支持 location | 支持                  | 支持               | 支持               | 支持               |
| uc 浏览器  | 支持 tagA     | 支持                  | 支持               | 支持               | 支持               |
| 百度浏览器 | 支持 location | 不支持                | 支持               | 不支持             | 支持               |
| 夸克浏览器 | 支持 location | 支持                  | 支持               | 支持               | 支持               |
| 360 浏览器 | 支持 location | 支持                  | 支持               | 支持               | 支持               |
| 小米浏览器 | 支持 location | 支持                  | 支持               | 支持               | 支持               |
| wx         | 支持，应用宝  | 不支持                | 支持               | 不支持             | 支持               |
| weibo      | 不支持        | 不支持                | 支持               | 不支持             | 支持               |
| qq         | 支持，应用宝  | 支持                  | 支持               | 支持               | 支持               |

### native sdk [待完善]

#### ios / android

|                 | 转转 | 采货侠 | 找靓机 | 卖家版 |
| --------------- | ---- | ------ | ------ | ------ |
| 目标app: 转转   | x    | ✅      | x      | ✅      |
| 目标app: 采货侠 | ✅    | x      | x      | x      |
| 目标app: 找靓机 | x    | x      | x      | x      |
| 目标app: 采货侠 | ✅    | x      | x      | x      |

---

### Todo:

- [] 支持找靓机app/转转app互相唤起
- [] 找靓机支持 ulink
- [] 支持转转app内唤起转转微信小程序


---

### bug or PR

[提交 Issues](https://gitlab.zhuanspirit.com/zz-fe-common/call-app/issues)

[提交 PR](https://gitlab.zhuanspirit.com/zz-fe-common/call-app/merge_requests)
