<template>
  <div class="fillcontain">
    <el-form
      class="searchForm"
      ref="Form"
      :inline="true"
      :model="userSearchForm"
      label-width="80px"
      size="mini"
    >
      <el-form-item label="Keyword:">
        <el-input v-model="userSearchForm.keyword" @change="search"></el-input>
      </el-form-item>
      <el-form-item label="Type:">
        <el-select v-model="userSearchForm.roleId" placeholder="All" clearable @change="search">
          <el-option
            v-for="item in roleList"
            :key="item.roleId"
            :value="item.roleId"
            :label="item.roleName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label>
        <el-button class="inline" type="primary" @click="search" style="margin-left:10px;">Search</el-button>
      </el-form-item>
      <el-form-item label style="float:right;">
        <el-button v-if="permsAdd" class="inline" type="primary" @click="addUser()">+Add  Account</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="userListTable"
      :data="tableData"
      v-loading="loading"
      border
      stripe
      highlight-current-row
      :height="tableHeight"
      :row-key="row => row.index"
      style="width: 100%;"
    >
      <el-table-column fixed type="selection" width="40"></el-table-column>
      <el-table-column fixed label="NO" prop="index" width="40"></el-table-column>
      <el-table-column fixed label="Organization" prop="orgName" width="160"></el-table-column>
      <el-table-column fixed label="Account" prop="username" width="160"></el-table-column>
      <el-table-column label="Mobile" prop="phone" width="200"></el-table-column>
      <el-table-column label="Email" prop="email" width="200"></el-table-column>
      <el-table-column label="Type" prop="roleName" width="120"></el-table-column>
      <el-table-column label="Activated" prop="roleName" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.activated==0" style="color: red;">N</span>
          <span v-else style="color: green;">Y</span>
        </template>
      </el-table-column>
      <el-table-column label="Create Time" prop="createTime" :formatter="formatDate" width="120"></el-table-column>
      <el-table-column fixed="right" label="Opt" width="160" v-if="permsEdit || permsDelete">
        <template slot-scope="scope">
          <el-button size="mini" v-if="permsEdit" type="text" @click="handleEdit(scope.row)">Edit</el-button>
          <el-button size="mini" v-if="permsDelete && loginInfo.userId!==scope.row.userId" type="text" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          <el-button
            v-if="permsActivate && scope.row.activated==0"
            size="mini"
            type="text"
            @click="handleInvite(scope.$index, scope.row)"
          >Invite</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="Pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next, sizes"
        :page-size="20"
        :page-sizes="[15, 20, 30, 50, 100, 500, 1000, 2000]"
        :current-page="pages.currentPage"
        :total="pages.count"
      ></el-pagination>
    </div>
    <edit-user-form ref="editUserForm" :form="form" :roleList="roleList" :resetPassword="resetPassword" @reload-table="initData()"></edit-user-form>
  </div>
</template>

<script>
import {
  getOrgById,
  getUsers,
  getValidRoleList,
  updateUser,
  deleteUser,
  inviteUser
} from '@/api/getData';
import EditUserForm from './EditUserForm.vue';
import { handlePerms } from '@/utils/perms.js';
import { timeFormatUtil } from '@/utils/timeFormatUtil.js';
import { exceptionUtil } from '@/utils/exceptionUtil.js';
import { mapActions, mapState } from 'vuex';

export default {
  mixins: [timeFormatUtil, exceptionUtil],
  components: {
    EditUserForm
  },
  computed: {
    ...mapState(['loginInfo', 'currentOrgId'])
  },
  data() {
    return {
      tableHeight: window.innerHeight - 162,
      tableData: [],
      pages: {
        currentPage: 1,
        offset: 0,
        limit: 20,
        count: 0
      },
      loading: false,
      selectedIndexs: [],
      form: {},
      userSearchForm: {
        keyword: '',
        role: ''
      },
      orgId: 0,
      roleList: [],
      resetPassword: false,

      permsAdd: false,
      permsActivate: false,
      permsEdit: false,
      permsDelete: false
    };
  },

  mounted() {
    const perms = handlePerms('org:user');
    this.permsAdd = perms.some(v => v === 'add');
    this.permsActivate = perms.some(v => v === 'activate');
    this.permsEdit = perms.some(v => v === 'edit');
    this.permsDelete = perms.some(v => v === 'delete');
  },

  created() {
    this.orgId = this.currentOrgId;
    this.initData();
  },

  watch: {
    currentOrgId(val) {
      this.orgId = val;
      this.initData();
    }
  },

  methods: {
    search() {
      this.getUsers();
    },
    async initData() {
      const result = await getValidRoleList({});
      if (!result.errorCode) {
        this.roleList = result;
      } else {
        // 错误码处理
      }
      this.getUsers();
    },
    async getUsers() {
      this.loading = true;
      const result = await getUsers({
        pageindex: this.pages.currentPage,
        pagesize: this.pages.limit,
        orgId: this.orgId,
        keyword: this.userSearchForm.keyword,
        roleId: this.userSearchForm.roleId
      });
      this.loading = false;
      if (result && !result.errorCode) {
        this.tableData = [];
        this.pages.count = result.totalRows;
        const users = result.list;
        users.forEach((item, index) => {
          let tableData = item;
          tableData.index = index + 1;
          this.tableData.push(tableData);
        });
      } else {
        // 错误处理
        this.exceptionHandle(result.errorCode);
      }
    },
    handleSizeChange(val) {
      this.pages.limit = val;
      this.getUsers();
    },
    handleCurrentChange(val) {
      this.pages.currentPage = val;
      this.pages.offset = (val - 1) * this.limit;
      this.getUsers();
    },

    async addUser() {
      this.form = {};
      this.form.orgId = this.orgId;
      const org = await getOrgById({
        orgId: this.orgId
      });
      if (!org.errorCode) {
        this.form.orgName = org.orgName;
      } else {
        // 错误码处理
      }
      this.form.userId = null;
      this.form.roleId = null;
      this.form.username = '';
      this.form.email = '';
      this.form.activated=1;
      this.form.password = '';
      this.resetPassword = true;
      this.form = JSON.parse(JSON.stringify(this.form));
      this.$refs.editUserForm.showDialog();
    },
    async handleEdit(row) {
      this.$refs.editUserForm.showDialog();
    },
    handleSelect(indexs) {
      this.selectedIndexs = indexs;
      // this.selectMenu = this.menuOptions[index];
    },
    async handleDelete(index, row) {
      this.$confirm(
        'Are you sure delete user: <i style=color:red;>' +
          row.username +
          '</i> ?',
        '',
        {
          dangerouslyUseHTMLString: true,
          showClose: false,
          type: 'warning'
        }
      )
        .then(async () => {
          const res = await deleteUser({
            userId: row.userId
          });
          if (res && !res.errorCode) {
            this.$message.success('Delete User Success!');
            this.tableData.splice(index, 1);
          } else {
            // 错误码处理
            this.exceptionHandle(res.errorCode);
          }
        })
        .catch(() => {});
    },
    async handleInvite(index, row) {
      this.$confirm(
        'Are you sure send activate mail to: <i style=color:red;>' +
          row.email +
          '</i> ?',
        '',
        {
          dangerouslyUseHTMLString: true,
          showClose: false,
          type: 'warning',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              const res = inviteUser({
                userId: row.userId
              }).then(res => {
                done();
                instance.confirmButtonLoading = false;
                if (res && !res.errorCode) {
                  this.$message.success('Send email successful!');
                } else {
                  // 错误码处理
                  this.exceptionHandle(res.errorCode);
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
.fillcontain .searchForm {
  margin: 5px 0px;
}
</style>
