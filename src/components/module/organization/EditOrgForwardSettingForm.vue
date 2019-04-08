<template>
  <el-dialog
    title="Forward Setting"
    :center="true"
    :visible.sync="isOpen"
    width="688px"
    @close="resetFields">
    <div class="form-box">
      <el-form ref="form" :model="form" label-width="200px" :rules="formRules" size="mini">
        <el-form-item :label="lang.orgName">
          <el-input v-model="form.orgName" disabled></el-input>
        </el-form-item>

        <!-- RestAPI and doc -->
        <el-form-item label="Access Key" style="margin-top:40px;">
          <el-col :span="16">
            <el-input v-model="form.accessKey" disabled></el-input>
          </el-col>
          <el-col :span="4" style="margin-left:15px;">
            <el-button type="danger" @click="renewkey">{{ lang.renew }}</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="Rest API Document">
          <a href="static/doc/RestAPI.html" target="_blank" class="btn-doc">HTML</a>
          <a href="static/doc/RestAPI.pdf" target="_blank" class="btn-doc margin">PDF</a>
        </el-form-item>

        <!-- Push Server and doc -->
        <div style="margin-top:40px;">
          <el-form-item label="Need Push ts1" v-if="permsShowForwardOurServer">
            <el-switch v-model="form.needPushOurServer" :active-value="1" active-text="On" :inactive-value="0" inactive-text="Off"></el-switch>
          </el-form-item>
          <el-form-item label="Need Retry" v-if="permsShowNeedRetry">
            <el-switch v-model="form.needRetry" :active-value="1" active-text="On" :inactive-value="0" inactive-text="Off"></el-switch>
          </el-form-item>
          <div v-for="(server, index) in form.servers" :key="server.key" >
            <el-form-item :label="lang.pushURL" :prop="'servers.'+index" :rules="formRules.url">
              <el-col :span="13">
                <el-input v-model.trim="server.url"></el-input>
              </el-col>
              <el-col :span="7" style="margin-left:5px;">
                <el-select v-model="server.type" placeholder="All">
                  <el-option
                    v-for="option in options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="3" style="margin-left:5px;">
                <el-button @click="deletePushServer(server, index)">{{ lang.delete }}</el-button>
              </el-col>
            </el-form-item>
          </div>
          <el-form-item v-show=" form.servers !== undefined&&form.servers.length<3">
            <el-button type="text" @click="addPushServer">{{ lang.addPushServer }}</el-button>
          </el-form-item>
          <el-form-item label="Push API Document">
            <span style="font-size: 12px;">JSON(TCP/HTTP):</span>
            <a href="static/doc/PushAPI(JSON).html" target="_blank" class="btn-doc">HTML</a>
            <a href="static/doc/PushAPI(JSON).pdf" target="_blank" class="btn-doc margin">PDF</a>
            <span style="font-size: 12px;padding-left:15px;">Binary(TCP):</span>
            <a href="static/doc/PushAPI(Binary).pdf" target="_blank" class="btn-doc">PDF</a>
          </el-form-item>
        </div>
        <el-form-item style="margin-top:40px;">
          <el-button type="primary" @click="onSubmit('form')" :loading="loading">{{ lang.save }}</el-button>
          <el-button @click="isOpen = false">{{ lang.cancel }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { editPushUrl, renewApiKey } from '@/api/getData';
import { exceptionUtil } from '@/utils/exceptionUtil.js';
import { handlePerms } from '@/utils/perms.js';
import { mapActions, mapState } from 'vuex';
// const DEFAULT_IMG = require('assist/srv/service.png');

export default {
  mixins: [exceptionUtil],
  props: {
    value: {
      default: false,
      type: Boolean
    },
    form: [Object]
  },
  data: function() {
    var urlValidatePass = (rule, value, callback) => {
      if (!value.url) {
        callback(new Error('Pushurl can not be null'));
      } else if (!value.type) {
        callback(new Error('The type of push url can not be null'));
      } else if(/[ts|ts2|truck]\.anytrek\.com/.test(value.url)){
        callback(new Error('Can not set url: ts.anytrek.com,ts2.anytrek.com,truck.anytrek.com'));
      } else {
        let reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62}|(:[0-9]{1,4}))+\.?/;
        if (reg.test(value.url)) {
          callback();
        } else {
          callback(new Error('Please enter the correct format'));
        }
      }
    };
    return {
      loading: false,
      options: [
        { value: 1, label: 'HTTP:JSON' },
        { value: 2, label: 'TCP:JSON' },
        { value: 3, label: 'TCP:Binary' }
      ],
      formRules: {
        url: [
          {
            validator: urlValidatePass
          }
        ]
      },
      permsShowNeedRetry: false,
      permsShowForwardOurServer: false
    };
  },
  computed: {
    ...mapState([
      'loginInfo',
      'lang'
    ]),

    isOpen: {
      get() {
        return this.value;
      },

      set(val) {
        this.$emit('input', val);
      }
    }
  },


  mounted() {
    const perms = handlePerms('org');
    this.permsShowNeedRetry = perms.some(v => v === 'show-need-retry');
    this.permsShowForwardOurServer = perms.some(v => v === 'show-forward-our-server');
  },

  methods: {
    // 重置表单
    resetFields() {
      this.$refs.form.resetFields();
    },

    addPushServer() {
      this.form.servers.push({ key: this.form.servers.length });
    },
    deletePushServer(server, i) {
      this.form.servers.splice(i, 1);
    },
    // 把多个push拼装起来。 （数据库存储格式如此）
    getPushUrl() {
      let pushUrl = '';
      for (let i = 0; i < this.form.servers.length; i++) {
        let _server = this.form.servers[i];
        if (!_server.url || !_server.type) continue;
        pushUrl += _server.url + '+' + _server.type + '|';
      }
      pushUrl = pushUrl.substr(0, pushUrl.length - 1);
      return pushUrl;
    },
    onSubmit(formName) {
      // 增加loading状态防止重复提交
      this.loading = true;
      if (!this.form.orgId) {
        this.loading = false;
        return;
      }

      this.form.pushurl = this.getPushUrl();
      this.$refs[formName].validate(valid => {
        if (!valid) {
          this.loading = false;
          return false;
        } else {
          editPushUrl({ }, this.form).then(
            result => {
              this.loading = false;
              if (result && !result.errorCode) {
                this.$message.success('Save successful!');
                this.isOpen = false;
                this.$emit('reload-org',this.form.orgId);
              } else {
                // 错误处理
                this.exceptionHandle(result.errorCode);
              }
            }
          );
        }
      });
    },
    async renewkey() {
      this.$confirm('Are you sure?Do you really want to update this Key?', '', {
        dangerouslyUseHTMLString: true,
        showClose: false,
        type: 'warning'
      }).then(async () => {
        const result = await renewApiKey({
          orgId: this.form.orgId
        });
        if (result && !result.errorCode) {
          this.$message.success('Save successful!');
          this.$emit('reload-org', this.form.orgId);
          this.form.accessKey = result.accessKey;
        } else {
          // 错误码处理
          this.$message.error('Save Error: ' + result.errorCode);
        }
      });
    }
  },
  watch: {
    form(val, oldVal) {
      if (val.pushurl) {
        this.form.servers = [];
        let _servers = val.pushurl.split('|');
        for (let i = 0; i < _servers.length; i++) {
          let _server = _servers[i].split('+');
          this.form.servers.push({
            url: _server[0],
            type: parseInt(_server[1])
          });
        }
      } else {
        this.form.servers = [{}];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-doc {
  padding: 7px 0;
  font-size: 12px;

  &:link, &:visited, &:active {
    color: #409EFF;
  }
}
.margin {
  margin-left: 14px;
}
</style>
