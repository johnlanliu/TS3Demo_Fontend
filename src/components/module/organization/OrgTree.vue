<template>
  <div class="fillcontain">
    <el-tree
      ref="orgTree"
      class="orgTree"
      node-key="orgId"
      :data="orgTreeList"
      :props="defaultProps"
      :default-expand-all="true"
      :highlight-current="true"
      :expand-on-click-node="false"
      @node-click="handleNodeClick"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <!--<i style="color:red;">{{data.attribute}}</i>-->
        <span style="color:#64DBD1;font-weight:900;">{{ node.label }}</span>
        <i v-if="data.activated==0" class="new-tree">New</i>
      </span>
    </el-tree>
  </div>
</template>

<script>
import {  } from '@/api/getData';
import { mapState, mapMutations } from 'vuex';

export default {
  props: {
    orgId: Number
  },

  computed: {
    ...mapState(['loginInfo', 'orgTreeList', 'currentOrgId'])
  },

  mounted(){
    this.$nextTick(() => {
      this.$refs.orgTree.setCurrentKey(this.currentOrgId);
    });
  },

  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'orgName'
      }
    };
  },

  methods: {
    ...mapMutations(['saveCurrentOrgId']),

    handleNodeClick(data) {
      this.saveCurrentOrgId(data.orgId);
    }
  },
  watch: {
    orgTreeList() {
      this.$nextTick(() => {
        this.$refs.orgTree.setCurrentKey(this.currentOrgId);
      });
    }
  }
};
</script>

<style scoped>
.fillcontain .orgTree {
  height: 100%;
  overflow: auto;
  font-size: 14px;
}

.new-tree {
  color:red;
  font-size:10px;
}
</style>
