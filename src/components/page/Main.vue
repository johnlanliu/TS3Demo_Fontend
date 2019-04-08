<template>
  <el-container v-loading="loadingTree" style="height: 100%">
    <el-aside width="300px" height="100%" class="aside">
      <org-tree ref="orgTreeRef"></org-tree>
    </el-aside>
    <el-main class="main">
      <el-tabs type="border-card">
        <el-tab-pane lazy v-if="permsOrgSummary" :label="$t('main.summary')">
          <org-dashboard @org-update="handleOrgUpdate"></org-dashboard>
        </el-tab-pane>
        <el-tab-pane lazy v-if="permsDeviceView" :label="$t('main.devices')">
            <device-list></device-list>
        </el-tab-pane>
        <el-tab-pane lazy v-if="permsUserView" :label="$t('main.users')">
          <user-list></user-list>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
  import OrgTree from '../module/organization/OrgTree.vue';
  import DeviceList from '../module/device/DeviceList.vue';
  import UserList from '../module/user/UserList.vue';
  import OrgDashboard from '../module/organization/OrgDashboard.vue';
  import {handlePerms} from '@/utils/perms.js';
  import store from '@/store/index';
  import { getStore } from '@/config/mUtils';
  import {getOrgList} from '@/api/getData';
  import {mapState} from 'vuex';

  export default {
    data() {
      return {
        loadingTree: true,
        // message: 'first',
        showHeader: false,
        userForm: {
          username: '',
          roleId: 0
        },
        orderForm: {
          paymentStatus: '',
          modelId: 0
        },
        permsOrgSummary: false,
        permsDeviceView: false,
        permsUserView: false,
        permsOrderView: false
      };
    },

    components: {
      OrgTree,
      DeviceList,
      UserList,
      OrgDashboard
    },

    computed: {
      ...mapState(['loginInfo', 'orgTreeList', 'currentOrgId'])
    },

    created() {
      let perms = handlePerms('org', ['summary']);
      this.permsOrgSummary = perms.some(v => v === 'summary');

      perms = handlePerms('org:device');
      this.permsDeviceView = perms.some(v => v === 'view');

      perms = handlePerms('org:user');
      this.permsUserView = perms.some(v => v === 'view');

      perms = handlePerms('org:order');
      this.permsOrderView = perms.some(v => v === 'view');

      // 加载组织树  登陆或刷新后从服务器加载， 之后页面切换从本地localStorage加载， 退出后清空localStorage
      let currentOrgId = parseInt(getStore('currentOrgId')) || this.loginInfo.orgId;
      // 服务器返回的是一个列表格式， 调用 saveOrgTreeListFromServer 的时候会转成树形格式
      store.dispatch('saveCurrentOrgId', currentOrgId);
      if(!this.orgTreeList || this.orgTreeList.length ===0) {
        getOrgList({orgId: this.loginInfo.orgId}).then(result => {
          store.dispatch('saveOrgTreeListFromServer', result);
          this.loadingTree=false;
        });
      } else {
        this.loadingTree=false;
      }
    },

    watch: {
      // currentOrgId(val) {
      //   this.$nextTick(() => {
      //     this.$refs.orgTreeRef.$refs.orgTree.setCurrentKey(val);
      //   });
      // }
    },

    methods: {
      OpenOrgForm(data) {
        this.orgFormVisible = true;
        this.orgFormTitle = data;
      },

      handleOrgUpdate(orgId) {
        this.$nextTick(() => {
          this.$refs.orgTreeRef.$refs.orgTree.setCurrentKey(orgId);
        });
      }
    }
  };
</script>

<style>
  .el-form--inline .el-form-item {
    margin-bottom: 0;
  }
</style>

<style scoped>
  .OrgTree-left {
    float: left;
  }

  .container-right {
    float: left;
  }

  .el-tabs--border-card {
    min-height: 100%;
    border: none;
    box-shadow: none;
  }

  .main {
    position: relative;
    padding: 0;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
  }
</style>
