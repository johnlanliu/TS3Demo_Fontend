/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 *
 */
let baseUrl = '';
let routerMode = 'hash';
let baseImgPath;

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://192.168.0.127:82';
  // baseUrl = 'http://localhost:82';
  // baseUrl = 'http://anytrek.f3322.net:82';
  // baseUrl = 'http://192.168.156.213:82';
  // baseUrl = 'http://192.168.0.113:82';
  //baseUrl = 'http://ts2.anytrek.com:82';
  baseImgPath = 'http://localhost:82/img/';
} else {
  baseUrl = 'https://ts2.anytrek.com/action';
  baseImgPath = 'https://ts2.anytrek.com/img/';
}

export {
  baseUrl,
  routerMode,
  baseImgPath
}
