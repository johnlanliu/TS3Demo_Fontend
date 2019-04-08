import store from '@/store/index';
export function handlePerms(module, permsList) {
  const menuList = store.state.loginInfo.menuList;
  const permArr = [];
  menuList.forEach(v => {
    const perms = v.perms || '';
    let arr = perms.split(':');
    // 截取具体权限
    let _perms = arr.pop();
    // 截取具体模块
    let _module = arr.join(':');
    // 按钮级权限且必须模块完全匹配
    if (v.type !== 2 || !(_module === module)) return;
    if(typeof permsList !== 'undefined') {
      permsList.forEach(vv => {
        if(_perms === vv){
          permArr.push(vv);
        }
      });
    }else {
      permArr.push(_perms);
    }
  });
  return permArr;
};
