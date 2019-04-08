<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="this.$route.path"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in routes">
        <template v-if="item.children">
          <el-submenu :index="item.meta.index" :key="item.meta.index">
            <!-- 一级菜单 -->
            <template slot="title">
              <i :class="item.meta.icon"></i>
              <span slot="title">{{ item.meta.title }}</span>
            </template>
            <template v-for="subItem in item.children">
              <el-submenu
                v-if="subItem.children"
                :index="subItem.meta.index"
                :key="subItem.meta.index">
                <!-- 二级菜单 -->
                <template slot="title">
                  <i :class="item.meta.icon"></i>
                  {{ subItem.meta.title }}
                </template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.children"
                  :key="i"
                  :index="threeItem.meta.index">
                  {{ threeItem.meta.title }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :index="subItem.meta.index"
                :key="subItem.meta.index"
              >{{ subItem.meta.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.meta.index" :key="item.meta.index">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{ item.meta.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {
      routes: window.trkConfig.antRouter
    };
  },
  computed: {
    ...mapState([
      'collapse'
    ]),

    onRoutes() {
      return this.$route.path.replace(/\//, '');
    }
  },

  created() {
  },
};
</script>

<style scoped>
.sidebar {
  height: 100%;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu {
  border-right: none;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
