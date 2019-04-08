<template>
  <el-dialog
  :title="title"
  :visible.sync="visible"
  width="930px"
  top="5vh"
  @close="resetFields">
  <el-form
    ref="form"
    v-if="visible"
    :model="roleForm"
    :rules="rules"
    label-width="150px"
    class="rule-form">
    <el-form-item label="Role Name" prop="roleName" class="step-one">
      <el-input v-model="roleForm.roleName"></el-input>
    </el-form-item>
    <el-form-item label="Valid Org Types">
      <el-select v-model="roleForm.validOrgTypes" multiple style="width: 100%;">
        <el-option
          v-for="item in orgTypeList"
          :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Valid User Types">
      <el-select v-model="roleForm.validUserTypes" multiple style="width: 100%;">
        <el-option
          v-for="item in allRoleList"
          :key="item.roleId" :label="item.roleName" :value="item.roleId">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Remark" prop="remark">
      <el-input v-model="roleForm.remark"></el-input>
    </el-form-item>
    <el-form-item label="Authorization" class="step-two">
      <div class="tree-wrap">
        <el-tree ref="tree"
          node-key="menuId"
          :data="treeData"
          check-strictly
          :filter-node-method="filterNode"
          :expand-on-click-node="true"
          :auto-expand-parent="false"
          show-checkbox
          default-expand-all>
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span><i :class="data.icon" style="padding-right:10px;"></i>{{ data.menuName }}</span>
            <span>
              <el-button
                :type="btnType[data.type]"
                style="width:120px; padding:0px;margin-right: 10px;"
                plain
                disabled>{{ btnText[data.type] }}</el-button>
              <div style="display:inline-table;width:120px;">{{data.url}}</div>
              <div style="display:inline-table;width:160px;">{{data.perms}}</div>
              <div style="display:inline-table;width:40px;">{{data.orderNum}}</div>
            </span>
          </span>
        </el-tree>
      </div>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button
      type="primary"
      :loading="btnLoading"
      @click="handleSave">Save</el-button>
    <el-button @click="visible=false">Cancel</el-button>
  </span>
</el-dialog>
</template>

<script>
import { getMenuList, addRole, editRole } from '@/api/getData';
import { exceptionUtil } from '@/utils/exceptionUtil.js';

const btnType = ['primary', 'success', 'info'];
const btnText = ['Dictionary', 'Menu', 'Button'];

export default {
  mixins: [exceptionUtil],
  props: {
    value: {
      type: Boolean,
      default: false
    },
    isAdd: Boolean,
    roleForm: Object,
    selected: Array,
    allRoleList: Array
  },

  data: function() {
    return {
      btnType: btnType,
      btnText: btnText,
      rules: {
        roleName: [
          { required: true, message: 'Please enter role name' }
        ]
      },
      orgTypeList: window.trkConfig.orgTypes,
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      btnLoading: false
    };
  },

  created() {
    this.fetchGetMenuList();
  },

  computed: {
    title() {
      return this.isAdd ? 'Add Role' : 'Edit Role';
    },

    visible: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },

  watch: {
    visible(val) {
      if(val) {
        this.$nextTick(() => {
          let selectedNodes = [];
          this.roleForm.selected.forEach(key => {
            this.$refs.tree.setChecked(key, true, false);
          });
        });
      }
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      value = value.toLowerCase();
      let menuName = data.menuName.toLowerCase();
      let perms = data.perms ? data.perms.toLowerCase() : '';
      let url = data.url ? data.url.toLowerCase() : '';
      let icon = data.icon ? data.icon.toLowerCase() : '';
      return menuName.indexOf(value)!==-1 || (perms&&perms.indexOf(value)!==-1) || (url&&url.indexOf(value)!==-1) || (icon&&icon.indexOf(value)!==-1);
    },

    // 递归生成树形结构
    getTree(data) {
      let root = 0;
      let idTxt = 'menuId';
      let pidTxt = 'parentId';
      let pushTxt = 'children';

      // 递归方法
      function getNode(id) {
        let node = [];
        for (var i = 0; i < data.length; i++) {
          if (data[i][pidTxt] === id) {
            data[i][pushTxt] = getNode(data[i][idTxt]);
            node.push(data[i]);
          }
        }
        if (node.length === 0) {
          return;
        }
        return node;
      }

      // 使用根节点
      return getNode(root);
    },

    // save
    handleSave() {
      this.btnLoading = true;
      const checkedKeys = this.$refs.tree.getCheckedKeys();
      const checkedHalfKeys = this.$refs.tree.getHalfCheckedKeys();
      const menuIds = checkedKeys.concat(checkedHalfKeys);
      this.isAdd ? this.fetchAddRole(menuIds) : this.fetchEditRole(menuIds);
    },

    // ajax 获取菜单列表
    async fetchGetMenuList() {
      this.loading = true;
      const result = await getMenuList();
      this.loading = false;
      if (result && !result.errorCode) {
        this.treeData = this.getTree(result.list);
      }else {
        // 错误处理
        this.exceptionHandle(result.errorCode);
      }
    },

    // ajax 添加角色
    async fetchAddRole(menuIds) {
      this.$refs.form.validate(valid => {
        if (!valid) {
          this.btnLoading = false;
          return false;
        } else {
          const { roleName, remark, validOrgTypes, validUserTypes } = this.roleForm;
          const data = {
            role: {roleName, remark, validOrgTypes, validUserTypes},
            menuIds
          };
          const result = addRole({}, data).then(result => {
            this.btnLoading = false;
            if (!result && result.errorCode) {
              this.exceptionHandle(result.errorCode);
              return;
            }
            this.$emit('reload');
            this.btnLoading = false;
            this.$message.success('Add Role Success!');
            this.visible = false;
          });
        }
      });
    },

    // ajax 编辑角色
    async fetchEditRole(menuIds) {
      this.$refs.form.validate(valid => {
        if (!valid) {
          this.btnLoading = false;
          return false;
        } else {
          const { roleId, roleName, remark, validOrgTypes, validUserTypes } = this.roleForm;
          const data = {
            role: {roleId, roleName, remark, validOrgTypes, validUserTypes},
            menuIds
          };
          const result = editRole({}, data).then(result => {
            this.btnLoading = false;
            if (!result && result.errorCode) {
              this.exceptionHandle(result.errorCode);
              return;
            }
            this.$emit('reload');
            this.btnLoading = false;
            this.$message.success('Edit Role Successful!');
            this.visible = false;
          });
        }
      });
    },

    // 重置表单
    resetFields() {
      this.$refs.form.resetFields();
    }
  }
};
</script>

<style scoped>
.custom-tree-node {
  -ms-flex: 1;
  flex: 1;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: justify;
  justify-content: space-between;
  font-size: 14px;
  margin-left: 8px;
}

.tree-wrap {
  height: 300px;
  overflow: auto;
}

.rule-form {
  margin: 0 10px;
}
</style>

<style>
/* .el-dialog--center .el-dialog__footer {
  text-align: left;
  padding-left: 123px;
} */
</style>
