<template>
  <div class="select-org-tree">
  <el-dialog
    :title="lang.selectOrg"
    :center="true"
    :visible.sync="isOpen"
    :show-close="!!curOrgId"
    :close-on-click-modal="!!curOrgId"
    :close-on-press-escape="!!curOrgId"
    :modal-append-to-body="appendToBody"
    :append-to-body="appendToBody"
    width="400px"
    custom-class="tree-select-dialog"
    v-loading="loadingTree">
    <div style="height: 400px;">
      <el-tree
        ref="orgTree"
        style="height:100%;overflow: auto;"
        node-key="orgId"
        :data="orgTreeList"
        :props="defaultProps"
        :default-expand-all="true"
        :highlight-current="true"
        :expand-on-click-node="false"
        @node-click="handleNodeClick">
        <span class="custom-tree-node" slot-scope="{ node }">
          <span style="color:#64DBD1;font-weight:900;">{{ node.label }}</span>
        </span>
      </el-tree>
    </div>
    <div v-if="!!curOrgId" style="margin-top: 10px;width: 100%;">
      <el-button
        style="margin:auto;display: block;width:200px;"
        type="primary"
        @click="isOpen=false;"
      >{{ lang.cancel }}</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
import { getStore } from '@/config/mUtils';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'SelectOrgTree',

  props: {
    appendToBody: Boolean,
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'orgName'
      },
      isOpen: false,
      // curOrgId 为父组件中的orgId, 防止出现设置自身为父节点的情况 允许为空
      curOrgId: null,
      loadingTree: true
    };
  },

  created() {
  },

  computed: {
    ...mapState([
      'lang',
      'loginInfo',
      'orgTreeList',
      'currentOrgId'
    ])
  },

  methods: {
    ...mapActions([
      'saveOrgTreeListFromServer',
      'saveOrgTreeList'
    ]),

    // curOrgId 允许为空
    showDialog(curOrgId, selectedClose) {
      if(typeof selectedClose === 'undefined'){
        selectedClose = true;
      }
      this.selectedClose = selectedClose;
      this.isOpen = true;
      this.curOrgId = curOrgId;
    },
    hiddenDialog() {
      this.isOpen = false;
    },
    handleNodeClick(item) {
      if (this.curOrgId && item.orgId === this.curOrgId) {
        this.$message.error('Can\'t set parent for self!');
        return;
      }
      this.$emit('change-parent', item);
      if(this.selectedClose) {
        this.isOpen = false;
      }
    }
  }
  // watch: {
  // }
};
</script>

<style>
  .select-org-tree .el-dialog__wrapper {
    position: absolute !important;
    /* z-index: 1999 !important; */
  }
  .select-org-tree .v-modal {
    position: absolute !important;
    /* z-index: 1998 !important; */
  }
</style>

<style scoped>
.fillcontain .orgTree {
  height: 100%;
  overflow: auto;
  font-size: 14px;
}
.fillcontain .el-dialog__body {
  padding: 10px 25px !important;
}
</style>
