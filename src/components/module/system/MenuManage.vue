<template>
  <div>
    <div class="form">
      <el-input
        v-model="searchText"
        prefix-icon="el-icon-search"
        placeholder="Keyword"
        class="search-input"></el-input>
      <el-button
        type="primary"
        icon="el-icon-search">Search
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-plus"
        class="btn-right"
        :disabled="!permsAdd"
        @click="handleAddDirectory">Add Directory
      </el-button>
    </div>
    <div>
      <el-tree ref="tree"
        node-key="menuId"
        :data="tableData"
        :filter-node-method="filterNode"
        :expand-on-click-node="true"
        :auto-expand-parent="false"
        default-expand-all>
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span><i :class="data.icon" style="padding-right:10px;"></i>{{ data.menuName }}</span>
          <span>
            <div class="optionItem" style="width:160px;">
              <span style="float: right;">
                <el-button style="padding:0px;" type="text" size="mini" :disabled="!permsAdd" @click="(e) => {e.stopPropagation();handleAddSub(data)}">
                  Append
                </el-button>
                <el-button style="padding:0px;" type="text" size="mini" :disabled="!permsEdit" @click="(e) => {e.stopPropagation();handleEdit(data)}">
                  Edit
                </el-button>
                <el-button style="padding:0px;" type="text" size="mini" :disabled="!permsDel" @click="(e) => {e.stopPropagation();handleDelete(data)}">
                  Delete
                </el-button>
              </span>
            </div>
            <el-button class="optionItem" :type="btnType[data.type]" style="width:100px; padding:0px;" plain disabled>
              {{ btnText[data.type] }}
            </el-button>
            <div class="optionItem" style="width:240px;">{{data.perms}}</div>
            <div class="optionItem" style="width:140px;">{{data.url}}</div>
            <div class="optionItem" style="width:60px;">{{data.orderNum}}</div>
          </span>
        </span>
      </el-tree>
    </div>

    <!-- add/edit menu -->
    <edit-menu :form="form" v-model="visible" :editType="editType" @reload-table="refreshTree"></edit-menu>
  </div>
</template>

<script>
  import { getMenuList, deleteMenu } from '@/api/getData';
  import { exceptionUtil } from '@/utils/exceptionUtil.js';
  import { handlePerms } from '@/utils/perms.js';
  import EditMenu from './EditMenu';

  const btnType = ['primary', 'success', 'info'];
  const btnText = ['Dictionary', 'Menu', 'Button'];

  export default {
    mixins: [exceptionUtil],
    components: {
      EditMenu
    },

    data: function() {
      return {
        btnType: btnType,
        btnText: btnText,
        loading: false,
        searchText: '',
        visible: false,
        form: {},
        menuList: [],
        totalData: [],
        tableData: [],
        editType: 0,
        permsAdd: false,
        permsEdit: false,
        permsDel: false
      };
    },

    created() {
      this.fetchGetMenuList();
    },

    mounted() {
      const perms = handlePerms('sys:menu', ['add', 'edit', 'delete']);
      this.permsAdd = perms.some(v => v === 'add');
      this.permsEdit = perms.some(v => v === 'edit');
      this.permsDel = perms.some(v => v === 'delete');
    },

    watch: {
      searchText(val) {
        this.$refs.tree.filter(val);
      }
    },

    methods: {
      refreshTree(editType, data) {
        let tree = this.$refs.tree;
        switch (editType) {
        case 0:
          tree.append(data, 0);
          break;
        case 1:
          tree.append(data, data.parentId);
          break;
        case 2:
          let node = tree.getNode(data.menuId);
          data.children = node.data.children;
          node.data = data;
          break;
        }
      },
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
          } else {
            return node;
          }
        }

        // 使用根节点
        return getNode(root);
      },
      // 添加
      handleAddDirectory() {
        this.form = {type: 0, orderNum: 0, parentId: 0};
        this.editType = 0;
        this.visible = true;
      },

      // 添加
      handleAddSub(parent) {
        let type = parent.type === 0 ? 1 : 2;
        this.form = {parentId: parent.menuId, parentName: parent.menuName, orderNum: 0};
        this.editType = 1;
        this.visible = true;
      },

      // 编辑
      handleEdit(menu) {
        this.form = JSON.parse((JSON.stringify(menu)));
        delete this.form.children;
        this.editType = 2;
        this.visible = true;
      },

      // 删除
      handleDelete(row) {
        if (row.children&&row.children.length > 0) {
          this.$message.error('Cannot delete nodes with child elements!');
          return;
        }
        this.$confirm(
          'Are you sure delete menu: <i style=color:red;>' +
          row.menuName +
          '</i> ?',
          '',
          {
            dangerouslyUseHTMLString: true,
            showClose: false,
            type: 'warning'
          }
        ).then(async () => {
          const res = await deleteMenu({menuId: row.menuId});
          if (res && !res.errorCode) {
            this.$message.success('Delete menu successful!');
            this.$refs.tree.remove(row);
          } else {
            // 错误处理
            this.exceptionHandle(res.errorCode);
          }
        })
        .catch(() => {
        });
      },

      // ajax 获取菜单列表
      async fetchGetMenuList() {
        this.loading = true;
        const result = await getMenuList();
        this.loading = false;
        if (result && !result.errorCode) {
          this.tableData = this.getTree(result.list);
        }else {
          // 错误处理
          this.exceptionHandle(result.errorCode);
          return;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .el-tree {
    /*height: 100%;*/
    /*overflow: auto;*/
    .optionItem {
      display:inline-table;
      margin-left: 20px;
    }
  }
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
    margin: 8px;
  }

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

  .icon-rotate {
    transform: rotate(90deg);
  }

  .icon-transition {
    cursor: pointer;
    transition: transform .2s ease;
  }

  .hidden {
    visibility: hidden;
  }
</style>

<style>
  .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
    cursor: default;
  }
</style>
