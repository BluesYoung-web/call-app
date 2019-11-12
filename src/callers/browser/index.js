/**
 * Created by luyunhai on 2018/11/8.
 */
import BaseCaller from '../../core/base';
import { IOSVersion, compareVersion } from '../../libs/utils'
import universal from './universal'

const iosVer = IOSVersion()
export default class BrowserCaller extends BaseCaller {
  constructor() {
    super();
  }
  init() {
  }
  __openApp(options) {
    location.href = options.__SCHEMA_PATH;
  }
  __canUniversal() {
    const ua = navigator.userAgent
    
    if (!/(iphone)|(ipad)|(ipod)/ig.test(ua)) return false;
    if (/(baiduboxapp)/ig.test(ua) || /(Safari)/ig.test(ua)) return true;
    return false
  }
  __tryLaunch(options) {
    console.log(this.__canUniversal(), options.universal)
    if (options.universal && this.__canUniversal()) return universal.call(this, options);
    if (compareVersion(iosVer, '12.3.0')) options.delay = 2500

    this.__openApp(options);
    const ua = navigator.userAgent
    let timer = 0
    if (!ua.match(/WeiBo/i)) {
      timer = setTimeout(() => {
        this.__download(options);
      }, options.delay);
    }

    const visibilitychange = function () {
      const tag = document.hidden || document.webkitHidden;
      tag && clearTimeout(timer)
    }
    document.addEventListener('visibilitychange', visibilitychange, false)
    document.addEventListener('webkitvisibilitychange', visibilitychange, false)
    window.addEventListener('pagehide', function () {
      clearTimeout(timer)
    }, false)
  }

  launch(opts) {
    const options = super.adaptOptions(opts);
    this.__tryLaunch(options)
  }
}
