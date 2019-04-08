import Vue from 'vue';
import APP from './APP';
import '@/utils/global'; // 全局
import { router , dynamic } from './router/index';
import store from '@/store/index';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import '../../../static/css/icon.css';
import i18n from './locales/index'; // 语言包
import 'babel-polyfill';
import { getModelSelect } from '@/api/getData';
import { getStore } from '@/config/mUtils';
import Router from 'vue-router';
import * as VueGoogleMaps from 'vue2-google-maps';
import GmapCluster from 'vue2-google-maps/dist/components/cluster'; // replace src with dist if you have Babel issues
// const _import = require('./router/_import_' + process.env.NODE_ENV)//获取组件的方法

const locale = getStore('locale');
// 谷歌地图
Vue.use(VueGoogleMaps, {
  loadCn: window.trkConfig.mapType==='GoogleMapCN',
  load: {
    language: locale || 'en',
    key: 'AIzaSyDiOmBFnR62um-hxVFQgj-u1gI3hOwHf4A',
    libraries: 'places' // necessary for places input
  }
});

Vue.component('GmapCluster', GmapCluster)
Vue.config.productionTip = false;
Vue.use(Router);
Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$axios = axios;
let dynamicRoutes;

// 使用钩子函数对路由进行权限跳转
router.beforeEach(async (to, from, next) => {
  const loginInfo = JSON.parse(getStore('loginInfo'));
  // 判断是否登陆
  let isLogin = false;
  if(loginInfo && loginInfo.token && loginInfo.menuList && loginInfo.menuList.length>0){
    isLogin = true;
    store.dispatch('saveLoginData', loginInfo);
  }
  if(isLogin) {
    // 加载型号  登陆后首次从服务器加载， 之后页面切换从本地localStorage加载， 退出后清空localStorage
    let modelList = JSON.parse(getStore('modelList'));
    if(!modelList || modelList.length ===0) {
      modelList = await getModelSelect({});
    }
    store.dispatch('saveModelList', modelList);
  } else {
    dynamicRoutes = null;
    locale ? changeLang(locale) : changeLang('en');
  }
  // 首次登录
  if(!dynamicRoutes && isLogin) {
    // 根据后端返回加载动态路由
    const menuList = JSON.parse(getStore('loginInfo')).menuList;
    const urlList = menuList.filter(v => v.type === 0 || v.type === 1);
    const redirect = urlList[0].url;
    let index = urlList.find(item => {return to.path.indexOf(item.url) > -1});
    dynamicRoutes = [{
      path: '/',
      redirect
    }];
    const total = {
      path: '/',
      component: resolve => require(['@/components/common/Home.vue'], resolve),
      children: []
    };
    total.children = getComponent(menuList);
    dynamicRoutes.push(total);
    window.trkConfig.antRouter = dynamicRoutes[1].children;
    router.addRoutes(dynamicRoutes);
    // 未知路由则跳往404
    router.addRoutes([
      {path: '*', redirect: '/404'}
    ]);
    if(index)
      next({ ...to, replace: true });
    else
      next(redirect);
    return;
  }
  // 登陆失效/未登录
  if(!isLogin && to.path !== '/login' && to.path !== '/findPwd') {
    // 清除前端session
    store.dispatch('clearSession');
    next('/login');
    return;
  }
  // 登录未失效，则无需重新登录
  if(isLogin && to.path === '/login') {
    next('/');
    return;
  }
  next();
});

function changeLang(locale) {
  const main = i18n.t('main');
  store.commit('saveLocale', locale);
  store.commit('saveLang', { ...main });
}

function setSession(name, data) { // localStorage 存储数组对象的方法
  localStorage.setItem(name, JSON.stringify(data));
}

function getSession(name) { // localStorage 获取数组对象的方法
  return JSON.parse(window.localStorage.getItem(name));

}

// 动态路由
function getComponent(menuList) {
  let result = [];
  //获取一级导航栏
  menuList.forEach(menu => {
    if(menu.type===0) {
      let {url, component, menuName, icon, menuId} = menu;
      let menuNavi = {
        menuId: menuId,
        path: url.substring(1),
        meta: { title: menuName, icon: icon, index: url }
      }
      // try{
      //   if(component) {
      //     // menuNavi.component = _import(component);
      //     menuNavi.component = () => import('@/components/' + component + '.vue');
      //   }
      // }catch (e) {
      // }
      menuNavi.component = dynamic[menuName];
      result.push(menuNavi);
    }
  });
  //获取二级导航栏
  menuList.forEach(menu => {
    if(menu.type===1) {
      let {url, component, menuName} = menu;
      let menuNavi = {
        path: url.substring(1),
        meta: { title: menuName, index: url}
      }
      // try{
      //   if(component) {
      //     // menuNavi.component = _import(component);
      //     menuNavi.component = () => import('@/components/' + component + '.vue');
      //   }
      // }catch (e) {
      // }
      menuNavi.component = dynamic[menuName];
      const parent = result.find(v => {
        return menu.parentId === v.menuId;
      });
      if(parent){
        menuNavi.meta.index =  parent.meta.index + menuNavi.meta.index;
        if(parent.children)
          parent.children.push(menuNavi);
        else
          parent.children = [menuNavi];
      }
    }
  });
  return result;
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(APP),
}).$mount('#app');
