<template>
  <div>
    <div class="form">
      <label>Type: </label>
      <el-input
        v-model="searchType"
        placeholder="Type"
        class="search-input"
        @change="handleSearch"
        style="width: 180px; margin-right: 20px"></el-input>
      <label>Name: </label>
      <el-input
        v-model="searchName"
        placeholder="Name"
        class="search-input"
        @change="handleSearch"
        style="width: 180px"></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="handleSearch">Search</el-button>
      <el-button
        type="primary"
        icon="el-icon-plus"
        class="btn-right"
        @click="handleAdd">Add Dictionary</el-button>
    </div>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      :height="tableHeight"
      stripe
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="dictId"
        label="ID"
        width="60">
      </el-table-column>
      <el-table-column
        prop="dictName"
        label="Name"
        width="160">
      </el-table-column>
      <el-table-column
        prop="dictValue"
        label="Value"
        width="160">
      </el-table-column>
      <el-table-column
        prop="type"
        label="Type"
        width="180">
      </el-table-column>
      <el-table-column
        prop="description"
        label="Description"
        width="240">
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="Remark"
        width="200">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="Create Time"
        :formatter="formatTime"
        width="200">
      </el-table-column>
      <el-table-column label="Opt">
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.row)"
            type="text"
            size="small">Edit</el-button>
          <el-button
            type="text"
            size="small"
            @click="handleDelete(scope.row, scope.$index)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="page-wrap">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next, sizes"
        :page-size="20"
        :page-sizes="[15, 20, 30, 50, 100, 500, 1000, 2000]"
        :current-page="page.currentPage"
        :total="page.count"
      ></el-pagination>
    </div>

    <!-- add/edit role -->
    <edit-dict
      v-model="visible"
      :isAdd="isAdd"
      :form="dictForm"
      @reload-table="fetchGetDictList"></edit-dict>
  </div>
</template>

<script>
import { getDictList, deleteDict, getDictById } from '@/api/getData';
import { exceptionUtil } from '@/utils/exceptionUtil';
import { timestampFormatDate } from '@/utils/time';
import EditDict from './EditDict';

export default {
  mixins: [exceptionUtil],

  components: {
    EditDict
  },

  data: function() {
    return {
      tableHeight: window.innerHeight - 134,
      searchType: '',
      searchName: '',
      visible: false,
      type: '',
      typeList: [
        {
          name: 'State',
          id: 1
        }
      ],
      tableData: [],
      // 分页
      page: {
        currentPage: 1,
        offset: 0,
        limit: 20,
        count: 0
      },
      isAdd: true,
      dictForm: {}
    };
  },

  created() {
    this.fetchGetDictList();
  },

  watch: {
    type(val) {
    }
  },

  methods: {
    // 格式化时间
    formatTime(row) {
      return timestampFormatDate(row.createTime, 'yyyy-MM-dd');
    },

    // 搜索
    handleSearch() {
      this.fetchGetDictList();
    },

    // 添加
    handleAdd() {
      this.isAdd = true;
      this.dictForm = {
        dictName: '',
        dictValue: '',
        type: '',
        remarks: '',
        description: ''
      };
      this.visible = true;
    },

    // 编辑
    handleEdit(row) {
      this.isAdd = false;
      this.dictForm = row;
      this.visible = true;
    },

    // 删除
    handleDelete(row, index) {
      this.$confirm(
        'Are you sure delete dict: <i style=color:red;>' +
        row.dictName +
        '</i> ?',
        '',
        {
          dangerouslyUseHTMLString: true,
          showClose: false,
          type: 'warning'
        }
      ).then(() => {
        this.fetchDeleteDict(row.dictId, index);
      });
    },

    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.fetchGetDictList();
    },

    handleSizeChange(val) {
      this.page.currentPage = 1;
      this.page.limit = val;
      this.fetchGetDictList();
    },

    // ajax 获取字典列表
    async fetchGetDictList() {
      const param = {
        dictName: this.searchName,
        type: this.searchType,
        pageindex: this.page.currentPage,
        pagesize: this.page.limit
      };
      const res = await getDictList(param);
      if(!res || res.errorCode) {
        this.exceptionHandle(res.errorCode);
        return;
      }
      this.tableData = res.list;
      this.page.count = res.totalRows;
    },

    // ajax 删除
    async fetchDeleteDict(dictId, index) {
      const res = await deleteDict({ dictId });
      if(!res || res.errorCode) {
        this.exceptionHandle(res.errorCode);
        return;
      }
      this.$message.success('Delete dictionary successful!');
      this.tableData.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  padding: 15px 0;

  label {
    display: inline-block;
    width: 50px;
    color: #606266;
    font-size: 14px;
  }
}

.search-input {
  width: 220px;
  margin-right: 10px;
}

.btn-right {
  float: right;
}
</style>
