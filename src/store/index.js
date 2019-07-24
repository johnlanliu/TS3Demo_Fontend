import Vue from 'vue';
import Vuex from 'vuex';
// import {authToken,getOrgList} from '@/api/getData'
import { setStore } from '@/config/mUtils';
import { getOrgById } from '@/api/getData';

Vue.use(Vuex);

const state = {
  // 登陆信息 {token}
  loginInfo: {},
  // 当前选中的组织节点
  currentOrgId: null,
  // 当前用户下的组织树
  orgTreeList: [],
  // 型号列表 (全局)
  modelList: [],
  // 选择的语言
  locale: '',
  // 语言包
  lang: {},
  // 侧栏折叠
  collapse: true,
  // current org
  currentOrg: {},

  // 监控界面--{vehicleList, orgList}
  monitoringData: {vehicleList: [], orgList: []},
  // 选择的当前device
  currDevice: {},
  // 地图是否居中
  autoZoom: false,
  structureTree: [],
  rootOrgId: 0
};

const mutations = {
  saveMonitoringData(state, monitoringData) {
    state.monitoringData = monitoringData;
  },
  // 监控根节点
  updateVehicle(state, newVehicleList) {
    let vehicleList = state.monitoringData.vehicleList;
    for(let i=0; i<newVehicleList.length; i++) {
      let newVehicle = newVehicleList[i];
      for(let i=0; i<vehicleList.length; i++) {
        if(vehicleList[i].deviceId === newVehicle.deviceId) {
          vehicleList[i]=newVehicle;
          break;
        }
      }
    }
  },

  saveLoginData(state, loginInfo) {
    if (!!loginInfo) {
      state.loginInfo = loginInfo;
      setStore('loginInfo', loginInfo);
    }
  },
  saveCurrentOrgId(state, selectedOrgId) {
    state.currentOrgId = selectedOrgId;
    setStore('currentOrgId', selectedOrgId);

  },
  saveOrgTreeList(state, orgTreeList) {
    if (!!orgTreeList) {
      state.orgTreeList = orgTreeList;
      setStore('orgTreeList', orgTreeList);
    }
  },
  saveModelList(state, modelList) {
    if (!!modelList) {
      state.modelList = modelList;
      setStore('modelList', modelList);
    }
  },

  // 语言选择
  saveLocale(state, locale) {
    state.locale = locale;
    setStore('locale', locale);
  },

  // 语言包
  saveLang(state, lang) {
    state.lang = lang;
  },

  // 菜单折叠
  saveCollapse(state, collapse) {
    state.collapse = collapse;
  },

  // 当前vehicle
  saveCurrDevice(state, data) {
    if(typeof(data.autoZoom) === 'boolean') {
      state.currDevice = data.currDevice;
      state.autoZoom = data.autoZoom;
    }else {
      state.currDevice = data;
      state.autoZoom = false;
    }
  },


  // 监控组织树
  saveStructureTree(state, structureTree) {
    state.structureTree = structureTree;
  },

  // 监控根节点
  saveRootOrgId(state, rootOrgId) {
    state.rootOrgId = rootOrgId;
  },

  clearSession(state) {
    state.token = {};
    state.loginInfo = {};
    state.currentOrgId = null;
    state.orgTreeList = [];
    state.modelList = [];
    localStorage.removeItem('loginInfo');
    localStorage.removeItem('currentOrgId');
    localStorage.removeItem('orgTreeList');
    localStorage.removeItem('modelList');
  },

  saveCurrentOrg(state, currentOrg) {
    state.currentOrg = currentOrg;
    setStore('currentOrg', currentOrg);
  }
};

const actions = {
  async saveLoginData({commit}, loginInfo) {
    try {
      commit('saveLoginData', loginInfo);
    } catch (err) {
      console.error(err);
    }
  },
  async saveCurrentOrgId({commit}, selectedOrgId) {
    try {
      commit('saveCurrentOrgId', selectedOrgId);
    } catch (err) {
      console.error(err);
    }
  },
  // 从缓存获取的数据已进行递归计算， 直接赋值即可
  async saveOrgTreeList({commit}, orgTreeList) {
    try {
      commit('saveOrgTreeList', orgTreeList);
    } catch (err) {
      console.error(err);
    }
  },

  // 从服务器获取的数据需要进行递归计算， 把列表数据转成树形结构。
  async saveOrgTreeListFromServer({commit}, orgTreeList) {
    try {
      let array = [];
      /**
       * 理论上每一次遍历至少有一个org找到parent,
       * 如果连续两次遍历的failCount不变的话则应该是出现异常数据，
       * 异常数据以根节点的方式出现（也就是说出现两个以上根节点时除第一个以外的均是异常数据）
       **/
      let obj = {};
      let preFailCount = orgTreeList.length;// 上一次for循环后未找到parent的org个数， 初始值为节点总个数
      let isError = false; // 剩余节点是否都是异常数据
      while (orgTreeList.length > 0) {
        for (let i = 0; i < orgTreeList.length;) {
          let node = orgTreeList[i];
          obj[node.orgId] = node;
          if (node.parentId) {
            let parent = obj[node.parentId];
            if (parent) {
              if (parent.children) {
                parent.children.push(node);
              } else {
                parent.children = [node];
              }
              orgTreeList.splice(i, 1);
            } else {
              // 只递归尝试10次，  如果失败则放在根节点下面。
              if (isError) {
                node.parentId = 0;
                // result.splice(i,1);
              }
              i++;
            }
          } else {
            array.push(node);
            orgTreeList.splice(i, 1);
          }
        }
        if (preFailCount === orgTreeList.length) {
          isError = true;
        }
        preFailCount = orgTreeList.length;
      }
      commit('saveOrgTreeList', array);
    } catch (err) {
      console.error(err);
    }
  },
  async saveModelList({commit}, modelList) {
    try {
      commit('saveModelList', modelList);
    } catch (err) {
      console.error(err);
    }
  },
  async clearSession({commit}) {
    try {
      commit('clearSession');
    } catch (err) {
      console.error(err);
    }
  },
  async saveCurrentOrg({commit}, currentOrg) {
    try {
      commit('saveCurrentOrg', currentOrg);
    } catch (err) {
      console.error(err);
    }
  }
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
});
