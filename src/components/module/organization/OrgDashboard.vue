<template>
  <div class="container" v-loading="loading">
    <el-card shadow="always">
      <div slot="header" class="clearfix">{{ lang.deviceStatistics }}</div>
      <div class="text item">
        <el-row :gutter="20">
          <el-col :span="4" style="font-weight: 600;">{{ lang.deviceStatistics }}:</el-col>
          <el-col :span="20">{{count}}</el-col>
        </el-row>
      </div>
    </el-card>
    <el-card shadow="always" style="margin-top:20px;">
      <div slot="header" class="clearfix">{{ lang.Information }}</div>
      <div class="text item">
        <el-row :gutter="20">
          <el-col :span="4" style="font-weight: 600;">{{ lang.name }}:</el-col>
          <el-col :span="20">
            {{org.orgName}}<span style="padding-left:12px;font-size: 9px;color:blue;">({{org.orgTypeName}})</span>
            <i style="margin-left:10px;color: red;" v-if="org.activated===0">(Unactivated)</i>
            <el-button style="margin-left:20px;" type="primary" @click="inviteHandle" v-if="permsActivate && org.activated===0">Invite</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" style="font-weight: 600;">{{ lang.contactPerson }}:</el-col>
          <el-col :span="20">{{org.contacts}}</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" style="font-weight: 600;">{{ lang.mobile }}:</el-col>
          <el-col :span="20">{{org.phone}}</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" style="font-weight: 600;">{{ lang.email }}:</el-col>
          <el-col :span="20">{{org.email}}</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" style="font-weight: 600;">{{ lang.address }}:</el-col>
          <el-col :span="20">{{org.streetAddress}}</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" style="font-weight: 600;">{{ lang.createTime }}:</el-col>
          <el-col :span="20">{{org.createTime | formatDate}}</el-col>
        </el-row>
      </div>
    </el-card>
    <el-card shadow="always" style="margin-top:20px;">
      <div slot="header" class="clearfix">{{ lang.operations }}</div>
      <div class="text item">
        <div>
          <el-row :gutter="10">
            <el-col :span="20">
              <el-button type="primary" v-if="permsAddPartner" @click="handleAddPartner">{{ lang.addPartner }}</el-button>
              <el-button type="primary" v-if="permsAddSub" @click="handleAddOrg">{{ lang.addSubNode }}</el-button>
              <el-button type="primary" v-if="permsEdit" @click="handleEditOrg">{{ lang.edit }}</el-button>
              <el-button type="primary" v-if="permsEditSetting" @click="handleEditForwardSetting">{{ lang.forwardSetting }}</el-button>
            </el-col>
            <el-col :span="2" style="float: right;">
              <el-button type="danger" v-if="permsDel && loginInfo.orgId!==org.orgId" @click="deleteOrg()">{{ lang.delete }}</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
    <!-- add patner/add sub-node/edit org -->
    <edit-org-form
      v-model="orgVisible"
      :optType="orgOptType"
      :form="form"
      @reload-org="reloadOrgList">
    </edit-org-form>
    <edit-org-forward-setting-form
      v-model="forwardVisible"
      :form="form"
      @reload-org="reloadOrgList"
    ></edit-org-forward-setting-form>
  </div>
</template>


<script>
  import {
    getOrgList,
    getOrgById,
    getDevicesTotalRow,
    invitePartner,
    deleteOrg
  } from '@/api/getData';
  import OrgTree from './OrgTree.vue';
  import editOrgForm from './EditOrgForm.vue';
  import editOrgForwardSettingForm from './EditOrgForwardSettingForm.vue';
  import { handlePerms } from '@/utils/perms.js';
  import { timeFormatUtil } from '@/utils/timeFormatUtil.js';
  import { exceptionUtil } from '@/utils/exceptionUtil.js';
  import { mapActions, mapState, mapMutations } from 'vuex';

  export default {
    name: 'OrgDashboard',
    mixins: [timeFormatUtil,exceptionUtil],
    components: {
      OrgTree,
      editOrgForm,
      editOrgForwardSettingForm
    },
    computed: {
      ...mapState([
        'loginInfo',
        'currentOrgId',
        'lang'])
    },
    data() {
      return {
        loading: false,
        count: 0,
        form: {},
        org: {
          orgId: 0,
          orgName: '',
          contacts: '',
          phone: '',
          email: '',
          streetAddress: '',
          createTime: '',
          parentId: '',
          parentName: '',
        },
        orgVisible: false,
        forwardVisible: false,
        orgOptType: 0, // 0-添加partner   1-添加普通节点   2-编辑
        // lang: this.$t('main')
        permsAddPartner: false,
        permsAddSub: false,
        permsActivate: false,
        permsEdit: false,
        permsEditSetting: false,
        permsDel: false
      };
    },

    created() {
      this.org.orgId = this.currentOrgId;
      this.initData();
    },

    mounted() {
      const perms = handlePerms('org', ['add-partner', 'add-sub-node', 'edit', 'edit-setting', 'activate', 'delete']);
      this.permsAddPartner = perms.some(v => v === 'add-partner');
      this.permsAddSub = perms.some(v => v === 'add-sub-node');
      this.permsActivate = perms.some(v => v === 'activate');
      this.permsEdit = perms.some(v => v === 'edit');
      this.permsEditSetting = perms.some(v => v === 'edit-setting');
      this.permsDel = perms.some(v => v === 'delete');
    },

    watch: {
      currentOrgId(val) {
        this.org.orgId = val;
        this.initData();
      }
    },

    methods: {
      ...mapMutations(['saveCurrentOrgId']),

      ...mapActions(['saveOrgTreeListFromServer']),

      // add partner
      handleAddPartner() {
        this.form = {
          parentId: this.org.orgId,
          parentName: this.org.orgName,
          attribute: window.trkConfig.orgType.partner,
          activated: 0
        };
        this.orgVisible = true;
        this.orgOptType = 0;
      },

      // add sub-node
      handleAddOrg() {
        this.orgOptType = 1;
        this.form = {
          parentId: this.org.orgId,
          parentName: this.org.orgName,
          activated: 1
        };
        this.orgVisible = true;
      },

      // edit org
      handleEditOrg() {
        this.orgOptType = 2;
        let { parentId, parentName, orgId, orgName, attribute, contacts, phone, email, activated, streetAddress } = this.org;
        this.form = { parentId,  parentName, orgId, orgName, attribute, contacts, phone, email, activated, streetAddress };
        this.form = JSON.parse(JSON.stringify(this.form));
        this.orgVisible = true;
      },

      // forward setting
      handleEditForwardSetting() {
        let { orgId, orgName, accessKey, pushurl, needPushOurServer, needRetry } = this.org;
        this.form = { orgId, orgName, accessKey, pushurl, needPushOurServer, needRetry  };
        this.form.servers = [{ key: '', url: '', type: '' }];
        this.form = JSON.parse(JSON.stringify(this.form));
        this.forwardVisible = true;
      },
      async initData() {
        try {
          this.loading = true;
          this.getOrgById();
          this.getDevicesTotalRow();
        } catch (err) {
          this.loading = false;
        }
      },
      async getDevicesTotalRow() {
        const result = await getDevicesTotalRow({
          orgId: this.currentOrgId
        });
        if (result && !result.errorCode) {
          this.count = result.count;
        } else {
          // 错误处理
          this.exceptionHandle(result.errorCode);
        }
        this.loading = false;
      },
      async getOrgById() {
        const result = await getOrgById({
          orgId: this.currentOrgId
        });
        if (result && !result.errorCode) {
          this.org = result;
          let attr = window.trkConfig.orgTypes[result.attribute];
          this.org.orgTypeName = attr ? attr.label : '';
        } else {
          // 错误处理
          this.exceptionHandle(result.errorCode);
        }
      },

      // ajax 更新org列表
      async reloadOrgList(orgId) {
        const result = await getOrgList({
          orgId: this.loginInfo.orgId
        });
        if(result && !result.errorCode) {
          const orgTreeList = result;
          this.saveOrgTreeListFromServer(orgTreeList, true);
          this.saveCurrentOrgId(orgId);
          this.$emit('org-update', orgId);
          this.initData();
        }else {
          // 错误处理
          this.exceptionHandle(result.errorCode);
        }
      },

      // ajax 删除org
      async deleteOrg() {
        if (this.org.orgId === this.loginInfo.orgId) {
          this.$message.error('Can\'t delete self node!');
          return;
        }
        this.$confirm(
          'Are you sure delete organization: <i style=color:red;>' +
          this.org.orgName +
          '</i> ?',
          '',
          {
            dangerouslyUseHTMLString: true,
            showClose: false,
            type: 'warning'
          })
          .then(async () => {
            const result = await deleteOrg({
              orgId: this.org.orgId
            });
            if (result && !result.errorCode) {
              this.$message.success('Delete organization successful!');
              this.reloadOrgList(this.loginInfo.orgId);
            } else {
              // 错误处理
              this.exceptionHandle(result.errorCode);
            }
          })
          .catch(() => {});
      },
      async inviteHandle() {
        this.$confirm(
          'Are you sure send activate mail to: <br/><i style=color:red;>' +
          this.org.email +
          '</i> ?',
          '',
          {
            dangerouslyUseHTMLString: true,
            showClose: false,
            type: 'warning',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                invitePartner({
                  orgId: this.org.orgId
                }).then(result => {
                  done();
                  instance.confirmButtonLoading = false;
                  if (result && !result.errorCode) {
                    this.$message.success('Send email successful!');
                  } else {
                    // 错误处理
                    this.exceptionHandle(result.errorCode);
                  }
                });
              } else {
                done();
              }
            }
          }
        ).catch(() => {});
      }
    }
  };
</script>


<style scoped>
  .text {
    font-size: 13px;
  }
  .text > div {
    line-height: 30px;
  }
</style>
