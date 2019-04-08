<template>
  <div>
    <div class="form">
      <!--
      <el-input
        v-model="searchText"
        prefix-icon="el-icon-search"
        placeholder="Keyword"
        class="search-input"></el-input>
      <el-button
        type="primary"
        icon="el-icon-search">Search</el-button>
        -->
      <el-button
        type="primary"
        icon="el-icon-plus"
        class="btn-right"
        :disabled="!permsAdd"
        @click="handleAdd">Add Role</el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column fixed type="selection" width="36"></el-table-column>
      <el-table-column type="index" label="NO" width="50" fixed></el-table-column>
      <el-table-column prop="roleName" label="Role Name" width="300"> </el-table-column>
      <el-table-column prop="remark" label="Remark"> </el-table-column>
      <el-table-column prop="createTime" label="Create Time" :formatter="formatDate" width="200"> </el-table-column>
      <el-table-column label="Opt" width="180">
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.row)"
            type="text"
            size="small"
            :disabled="!permsEdit">Edit</el-button>
          <el-button
            type="text"
            size="small"
            :disabled="!permsDel"
            @click="handleDelete(scope.row, scope.$index)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- add/edit role -->
    <edit-role
      v-model="visible"
      :isAdd="isAdd"
      :roleForm="roleForm"
      :allRoleList="tableData"
      @reload="fetchGetRoleList"></edit-role>
  </div>
</template>

<script>
import { getRoleList, getMenuListById, deleteRole } from '@/api/getData';
import EditRole from './EditRole';
import { timeFormatUtil } from '@/utils/timeFormatUtil.js';
import { exceptionUtil } from '@/utils/exceptionUtil.js';
import { handlePerms } from '@/utils/perms.js';

export default {
  mixins: [
    timeFormatUtil,
    exceptionUtil
  ],

  components: {
    EditRole
  },

  data: function() {
    return {
      searchText: '',
      visible: false,
      tableData: [],
      // add or edit
      isAdd: true,
      loading: false,
      roleForm: {},
      permsAdd: false,
      permsEdit: false,
      permsDel: false
    };
  },

  created() {
    this.fetchGetRoleList();
  },

  mounted() {
    const perms = handlePerms('sys:role', ['add', 'edit', 'delete']);
    this.permsAdd = perms.some(v => v === 'add');
    this.permsEdit = perms.some(v => v === 'edit');
    this.permsDel = perms.some(v => v === 'delete');
  },

  methods: {
    // 添加角色
    handleAdd() {
      this.isAdd = true;
      this.roleForm = {
        roleName: '',
        remark: '',
        selected: [],
        validOrgTypes: [],
        validUserTypes: []
      };
      this.visible = true;
    },

    // 编辑角色
    handleEdit(row) {
      this.isAdd = false;
      this.roleForm = JSON.parse(JSON.stringify(row));
      this.fetchGetMenuListById(row.roleId);
    },

    // 删除角色
    handleDelete(row, index) {
      this.$confirm(
        'Are you sure delete role: <i style=color:red;>' + row.roleName +  '</i> ?',
        {
          dangerouslyUseHTMLString: true,
          showClose: false,
          type: 'warning'
        }
      ).then(async () => {
        const param = {
          roleId: row.roleId
        };
        const res = await deleteRole(param);
        if(!res || res.errorCode) {
          this.exceptionHandle(res.errorCode);
          return;
        }
        this.$message.success('Delete role successFul!');
        this.tableData.splice(index, 1);
        this.fetchGetRoleList();
      });
    },

    // ajax 获取角色列表
    async fetchGetRoleList() {
      this.tableData = [];
      this.loading = true;
      const result = await getRoleList();
      this.loading = false;
      if(!result || result.errorCode) {
        // 错误处理
        this.exceptionHandle(result.errorCode);
        return;
      }

      const list = result;
      list.forEach((item, index) => {
        item.index = index + 1;
        item.validUserTypes = item.validUserTypes ? JSON.parse(item.validUserTypes) : [];
        item.validOrgTypes = item.validOrgTypes ? JSON.parse(item.validOrgTypes) : [];
        this.tableData.push(item);
      });
    },

    // ajax 根据id获取菜单
    async fetchGetMenuListById(roleId) {
      const param = {
        roleId
      };
      const result = await getMenuListById(param);
      if(!result || result.errorCode) {
        // 错误处理
        this.exceptionHandle(result.errorCode);
        return;
      }

      this.roleForm.selected = result.list.map(v => {
        const { menuId } = v;
        return menuId;
      });
      this.visible = true;
    }
  }
};
</script>

<style scoped>
.form {
  padding: 15px 0;
}

.search-input {
  width: 220px;
  margin-right: 10px;
}

.btn-right {
  float: right;
}
</style>
