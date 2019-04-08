import Router from 'vue-router';

export const router = new Router({
  routes: [
    {
      path: '/login',
      component: resolve => require(['@/components/page/Login.vue'], resolve)
    },
    {
      path: '/findpwd',
      component: resolve => require(['@/components/page/FindPwd.vue'], resolve)
    },
    {
      path: '/404',
      component: resolve => require(['@/components/page/404.vue'], resolve),
      meta: { title: '404' }
    },
    {
      path: '/403',
      component: resolve => require(['@/components/page/403.vue'], resolve),
      meta: { title: '403' }
    }
  ],
    // mode:"history"  //消除链接上的#号
});

export const dynamic = {
  'Organization': () => import('@/components/page/Main.vue'),
  'System Management': () => import('@/components/module/system/Root.vue'),
  'Role Management': () => import('@/components/module/system/RoleManage.vue'),
  'Menu Management': () => import('@/components/module/system/MenuManage.vue'),
  'Dictionary Management': () => import('@/components/module/system/DictManage.vue')
};
